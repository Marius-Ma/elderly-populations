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

export const loginUser = (username, password, setError) => {
  // 检查是否是硬编码的 admin 用户
  if (username === adminUser.username) {
    if (password === adminUser.password) {
      localStorage.setItem('loggedInUser', JSON.stringify(adminUser))
      return adminUser
    } else {
      setError('Incorrect password.')
      return null
    }
  }

  // 检查普通用户
  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find((u) => u.username === username)

  if (!user) {
    setError('Username does not exist.')
    return null
  } else if (user.password !== password) {
    setError('Incorrect password.')
    return null
  } else {
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    return user
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
