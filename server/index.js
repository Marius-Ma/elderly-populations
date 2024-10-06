require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sendBookingEmail = require('./sendEmail')

// 打印确认是否加载成功
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY)

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// 定义路由，处理发送邮件请求
app.post('/send-email', async (req, res) => {
  const { userId, bookingDetails } = req.body

  try {
    await sendBookingEmail(userId, bookingDetails)
    res.status(200).send('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).send('Failed to send email')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
