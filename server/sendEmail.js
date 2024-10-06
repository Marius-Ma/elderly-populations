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

const sendBookingEmail = async (userId, bookingDetails) => {
  const userDocRef = doc(db, 'users', userId) // 获取用户文档

  try {
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
      const userEmail = userDoc.data().email
      const userName = userDoc.data().username

      // 给用户发送确认邮件
      const userMsg = {
        to: userEmail, // 用户邮箱
        from: 'ymaa0106@student.monash.edu', // 你的已验证邮箱
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

module.exports = sendBookingEmail
