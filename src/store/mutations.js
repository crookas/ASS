export default {
  setUser (state, user) {
    if (state.debug) console.log('store.setUser triggered with ', user)
    state.user = user
  },
  clearUser (state) {
    if (state.debug) console.log('store.clearUser triggered')
    state.user = []
  },
  setMarvalData (state, data) {
    if (state.debug) console.log('store.setMarvalData triggered')
    state.marval_data = data
  },
  setCIData (state, data) {
    if (state.debug) console.log('store.setCIData triggered')
    state.hardware_data = data
  }
}