import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  currentUser: {}
})

export const mutations = {
  setToken(s, p) {
    s.token = p
  },
  setCurrentUser(s, p) {
    s.currentUser = p
  },
  resetToken(s) {
    s.token = null
  },
  resetCurrentUser(s) {
    s.currentUser = {}
  }
}

export const actions = {
  initAuth(vc, req) {
    let token
    let expiry

    if (req) {
      if (!req.headers.cookie) {
        return
      }

      const tokenCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('token='))
      const expiryCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('expiry='))

      if (!tokenCookie) {
        return
      }

      token = tokenCookie.split('=')[1]
      expiry = expiryCookie.split('=')[1]
    } else {
      token = localStorage.getItem('token')
      expiry = localStorage.getItem('expiry')
    }

    if (new Date().getTime() > Number.parseInt(expiry) || !token) {
      // vc.dispatch('auth/logout')
      return
    }

    vc.commit('setToken', token)
  },
  async login({ commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.post('/auth/login', params)

      commit('setToken', data.token)

      const expiry = jwtDecode(data.token).exp

      localStorage.setItem('token', data.token)
      localStorage.setItem(
        'expiry',
        new Date().getTime() + Number.parseInt(expiry) * 1000
      )
      Cookie.set('token', data.token)
      Cookie.set(
        'expiry',
        new Date().getTime() + Number.parseInt(expiry) * 1000
      )

      commit('setCurrentUser', data)

      return { error: false }
    } catch (err) {
      return { error: true }
    }
  },
  async setCurrentUser({ commit }) {
    await this.$axios
      .get('/users/current')
      .then((res) => {
        commit('setCurrentUser', res.data)
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  },
  logout({ commit }) {
    // const { data } = await this.$axios.post('/logout')
    // if (data.success) {}
    commit('resetToken')
    commit('resetCurrentUser')
    Cookie.remove('token')
    Cookie.remove('expiry')

    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('expiry')
    }
  }
}

export const getters = {
  token: (s) => {
    return s.token
  },
  currentUser: (s) => {
    return s.currentUser
  }
}
