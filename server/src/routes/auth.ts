import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()
const prisma = new PrismaClient()

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' })
        return
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        res.status(401).json({ error: 'User not found' })
        return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(401).json({ error: 'Invalid credentials' })
        return
    }

    const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET!, {
        expiresIn: '1d'
    })

    res.json({ token, user: { id: user.id, email: user.email } })
})

export default router