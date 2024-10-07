import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: null,
    fontSize: 16
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    },

    increaseFontSize(state) {
      state.fontSize += 2
    },
    decreaseFontSize(state) {
      if (state.fontSize > 10) {
        state.fontSize -= 2
      }
    }
  },
  getters: {
    isUserLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user?.email.endsWith('@student.monash.edu'),
    getUser: (state) => state.user,

    currentFontSize: (state) => `${state.fontSize}px`
  }
})

export default store
