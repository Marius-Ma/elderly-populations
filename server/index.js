require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer') // 用于处理文件上传
const { sendBookingEmail, sendBulkEmails } = require('./sendEmail')

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: 'https://elderly-populations.pages.dev',
    methods: ['GET', 'POST']
  })
)

app.use(express.json())

// 设置 multer 用于文件上传
const upload = multer({ storage: multer.memoryStorage() })

// 定义发送 Booking Email 的路由
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

app.post('/send-bulk-email', upload.single('attachment'), async (req, res) => {
  const { recipients, subject, message } = req.body
  let attachment = null

  try {
    console.log('Raw recipients:', recipients) // 打印原始的 recipients

    // 尝试解析 recipients
    const parsedRecipients = JSON.parse(recipients)

    if (!Array.isArray(parsedRecipients)) {
      return res.status(400).send('Recipients should be an array')
    }

    // 处理附件
    if (req.file) {
      attachment = {
        content: req.file.buffer.toString('base64'),
        filename: req.file.originalname,
        type: req.file.mimetype,
        disposition: 'attachment'
      }
    }

    const emailDetails = {
      subject,
      message
    }

    await sendBulkEmails(parsedRecipients, emailDetails, attachment)
    res.status(200).send('Bulk emails sent successfully')
  } catch (error) {
    console.error('Error sending bulk emails:', error)
    res.status(500).send('Failed to send bulk emails')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
