export const state = () => ({
  isPortAuto: true,
  portNumber: 8080,
  isOBSMode: false
})

export const mutations = {
  setIsAutoPort (state, value) {
    state.isPortAuto = value
  },
  setPortNumber (state, value) {
    state.portNumber = Number(value)
  },
  setIsOBSMode (state, value) {
    state.isOBSMode = value
  }
}
