import { useRouter } from 'vue-router'

const router = useRouter()

// hardcode admin
const adminUser = {
  username: 'Delvin',
  email: 'admin@example.com',
  password: 'AdminPass123!',
  role: 'admin'
}

// store the users to localStorage for now
export const registerUser = (newUser, setError) => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  // Check if the username is already taken
  const usernameTaken =
    users.some((user) => user.username === newUser.username) ||
    newUser.username === adminUser.username
  if (usernameTaken) {
    setError('Username is already taken!')
    return false
  }

  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('loggedInUser', JSON.stringify(newUser))

  return true
}

export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || []

  const user = users.find((u) => u.username === username && u.password === password)

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    if (user.role === 'admin') {
      router.push('/admin-dashboard')
    } else {
      router.push('/user-dashboard')
    }
  } else if (username === adminUser.username && password === adminUser.password) {
    localStorage.setItem('loggedInUser', JSON.stringify(adminUser))
    router.push('/admin-dashboard')
  } else {
    alert('Invalid credentials')
  }
}

export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem('loggedInUser'))
}

export const isAdmin = () => {
  const user = getLoggedInUser()
  return user && user.role === 'admin'
}

export const isUserLoggedIn = () => {
  return !!getLoggedInUser()
}
