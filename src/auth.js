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
    return user
  } else if (username === adminUser.username && password === adminUser.password) {
    localStorage.setItem('loggedInUser', JSON.stringify(adminUser))
    return adminUser
  } else {
    alert('Invalid credentials')
    return null
  }
}

export const logoutUser = () => {
  localStorage.removeItem('loggedInUser')
  return true
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
