import express from 'express'
import { PrismaClient } from '@prisma/client'
//TODO: import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// GET all pieces for user
router.get('/', async (req, res) => {
    // @ts-ignore
    const userId = 1
    const pieces = await prisma.piece.findMany({
        where: { userId }
    })

    res.json(pieces)
})

// POST a new piece
router.post('/', async (req, res) => {
    const { title, type, style, voicePart, character, show, notes } = req.body
    // @ts-ignore
    const userId = 1

    if (!title || !type) {
        res.status(400).json({ error: 'Title and type are required' })
        return
    }

    const piece = await prisma.piece.create({
        data: {
            title,
            type,
            style,
            voicePart,
            character,
            show,
            notes,
            userId
        }
    })

    res.status(201).json(piece)
})

// DELETE a piece
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); // Convert id to a number
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid piece ID' });
        return;
    }
    // @ts-ignore
    const userId = 1

    const piece = await prisma.piece.findUnique({
        where: { id }
    })

    if (!piece || piece.userId !== userId) {
        res.status(404).json({ error: 'Piece not found' })
        return
    }

    await prisma.piece.delete({
        where: { id }
    })

    res.status(204).send()
})

// PATCH /api/pieces/:id/mark-used
router.patch('/:id/mark-used', async (req, res) => {
    const pieceId = parseInt(req.params.id)
    // @ts-ignore
    const userId = 1
  
    const piece = await prisma.piece.findUnique({ where: { id: pieceId } })
  
    if (!piece || piece.userId !== userId) {
      res.status(403).json({ error: 'Access denied or piece not found' })
      return
    }
  
    const updatedPiece = await prisma.piece.update({
      where: { id: pieceId },
      data: {
        lastUsed: new Date(),
      },
    })
  
    res.json(updatedPiece)
  })

export default router