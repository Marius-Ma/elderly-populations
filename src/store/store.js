import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: null // 存储 Firebase 用户对象
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    }
  },
  getters: {
    isUserLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user?.email === 'admin@example.com', // 调整管理员检查
    getUser: (state) => state.user
  }
})

export default store
