const { initializeApp } = require('firebase/app')
const sgMail = require('@sendgrid/mail')
const { getFirestore, doc, getDoc } = require('firebase/firestore')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAm2RzBgnboJZSEI-Uj9U_9C9zh_DmBu_U',
  authDomain: 'yuema-a3.firebaseapp.com',
  projectId: 'yuema-a3',
  storageBucket: 'yuema-a3.appspot.com',
  messagingSenderId: '563325010022',
  appId: '1:563325010022:web:401f839e28f50dc4ce6da7'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

// 发送单个用户的 Booking Email
const sendBookingEmail = async (userId, bookingDetails) => {
  const userDocRef = doc(db, 'users', userId)

  try {
    const userDoc = await getDoc(userDocRef)
    console.log('Retrieved userDocRef:', userDocRef)
    if (userDoc.exists()) {
      console.log('User data:', userDoc.data())
      const userEmail = userDoc.data().email
      const userName = userDoc.data().username

      // 给用户发送确认邮件
      const userMsg = {
        to: userEmail, // 用户邮箱
        from: '429542819@qq.com', // 你的已验证邮箱
        subject: 'Booking Confirmation',
        text: `Dear ${userName},\nYour booking for the service: ${bookingDetails.service} has been successfully made.\nDate: ${bookingDetails.date}\nTime: ${bookingDetails.time}`
      }

      await sgMail.send(userMsg) // 发送给用户

      console.log('Emails sent successfully')
    } else {
      console.error('User document not found')
    }
  } catch (error) {
    console.error('Error sending emails:', error)
  }
}

const sendBulkEmails = async (recipients, emailDetails, attachment = null) => {
  const messages = []

  recipients.forEach((recipient) => {
    const userMsg = {
      to: recipient, // 使用正确的收件人 email
      from: '429542819@qq.com', // 你的已验证邮箱
      subject: emailDetails.subject,
      text: emailDetails.message,
      attachments: attachment ? [attachment] : []
    }
    messages.push(userMsg)
  })

  try {
    if (messages.length) {
      await sgMail.send(messages)
      console.log('Bulk emails sent successfully')
    } else {
      console.log('No recipients to send emails to.')
    }
  } catch (error) {
    console.error('Error sending bulk emails:', error)
  }
}
// 导出两个函数
module.exports = {
  sendBookingEmail,
  sendBulkEmails
}
