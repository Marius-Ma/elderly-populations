import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import router from './router'
import store from '@/store/store'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css' // Core CSS
import 'primeicons/primeicons.css' // Icons CSS
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import Dropdown from 'primevue/dropdown'

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
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

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
app.use(PrimeVue)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Button', Button)
app.component('Dropdown', Dropdown)
app.mount('#app')
export { db }
