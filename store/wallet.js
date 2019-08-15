export const state = () => ({
  list: []
})

export const mutations = {
  setList(s, p) {
    s.list = p
  }
}

export const actions = {
  async getList({ commit }) {
    await this.$axios
      .get(`/wallets`)
      .then((res) => {
        commit('setList', res.data)
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  }
}

export const getters = {
  list: (s) => {
    return s.list
  }
}
