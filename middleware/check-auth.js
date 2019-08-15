export default function(c) {
  c.store.dispatch('auth/initAuth', c.req)
}
