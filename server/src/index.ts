import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Take 1 backend is running!')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
