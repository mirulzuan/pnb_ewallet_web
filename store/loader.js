export const state = () => ({
  isLoading: false
})

export const mutations = {
  setIsLoading(s, p) {
    s.isLoading = p
  }
}

export const actions = {
  setIsLoading({ commit }, val) {
    commit('setIsLoading', val)
  }
}

export const getters = {
  isLoading: (s) => {
    return s.isLoading
  }
}
