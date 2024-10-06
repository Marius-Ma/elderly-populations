import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import router from './router'
import store from '@/store/store'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
initializeApp(firebaseConfig)

const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.commit('setUser', user)
  } else {
    store.commit('clearUser')
  }
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
