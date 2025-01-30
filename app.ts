import express from 'express'
import 'dotenv/config'
import connectDB from './db/connect'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Menu management app is running...')
})

const PORT = process.env.PORT || 5000
const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI as string)
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

export default app
