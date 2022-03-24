export const state = () => ({
  settingModalOpen: false
})

export const mutations = {
  setSettingState (state, value) {
    state.settingModalOpen = value
  }
}
