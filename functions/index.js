/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp()

exports.getBookings = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const bookingsRef = admin.firestore().collection('bookings')
    try {
      const snapshot = await bookingsRef.get()
      const bookings = []
      snapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() })
      })
      res.status(200).json(bookings)
    } catch (error) {
      res.status(500).send(error)
    }
  })
})

exports.getUsers = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const usersRef = admin.firestore().collection('users')
    try {
      const snapshot = await usersRef.where('role', '==', 'user').get()
      const users = []
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
      })
      res.status(200).json(users)
    } catch (error) {
      res.status(500).send(error)
    }
  })
})

exports.deleteUser = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const userId = req.body.userId
    try {
      // 删除 Firestore 中的用户数据
      await admin.firestore().collection('users').doc(userId).delete()

      // 删除 Authentication 中的用户
      await admin.auth().deleteUser(userId)

      res.status(200).send('User deleted successfully from Firestore and Authentication')
    } catch (error) {
      console.error('Error deleting user:', error)
      res.status(500).send(error)
    }
  })
})
