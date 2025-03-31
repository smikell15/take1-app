import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// GET all auditions for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    // @ts-ignore
    const userId = req.user.id
  
    const auditions = await prisma.audition.findMany({
      where: { userId },
      include: {
        pieces: {
          include: {
            piece: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })
  
    res.json(auditions)
  })

// POST /api/auditions
router.post('/', authenticateToken, async (req, res) => {
    // @ts-ignore
    const userId = req.user.id
    const { show, role, date, notes, callback, outcome, tags, pieceIds } = req.body
  
    if (!show || !role || !date) {
      res.status(400).json({ error: 'Show, role, and date are required' })
      return
    }
  
    try {
      const audition = await prisma.audition.create({
        data: {
          show,
          role,
          date: new Date(date),
          notes,
          callback,
          outcome,
          tags,
          userId,
          pieces: {
            create: pieceIds?.map((id: number) => ({
              piece: { connect: { id } },
            })),
          },
        },
        include: {
          pieces: {
            include: {
              piece: true, // include full piece info
            },
          },
        },
      })
  
      res.status(201).json(audition)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to create audition' })
    }
  })

// DELETE an audition
router.delete('/:id', authenticateToken, async (req, res) => {
    const id = parseInt(req.params.id)
    // @ts-ignore
    const userId = req.user.id
  
    const audition = await prisma.audition.findUnique({ where: { id } })
    if (!audition || audition.userId !== userId) {
      res.status(404).json({ error: 'Audition not found or not yours' })
      return
    }
  
    await prisma.auditionPiece.deleteMany({ where: { auditionId: id } })
    await prisma.audition.delete({ where: { id } })
  
    res.status(204).send()
  })

export default router
