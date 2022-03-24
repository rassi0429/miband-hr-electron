<template lang="pug">
  v-dialog(:value="settingModalOpen" persistent v-on:click:outside="setSettingState(false)" )
    v-card
      v-card-title settings
      v-card-text
        v-row
          v-col(cols="4")
            div.text-body-1.pl-2 port
          v-col(cols="8")
            v-row(align="center" )
              v-checkbox.ma-0.mr-2(:input-value="isPortAuto" hide-details label="Auto"
                @change="(e) => setIsAutoPort(!!e)" )
              v-text-field(outlined hide-details dense :value="portNumber" :disabled="isPortAuto"
                @change="(e) => setPortNumber(e)" type="number")
        v-row
          v-col(cols="4")
            div.text-body-1.pl-2 OBS integration
          v-col(cols="8")
            v-row(align="center" )
              v-checkbox.ma-0.mr-2(hide-details label="Use" :input-value="isOBSMode" @change="(e) => setIsOBSMode(!!e)")
      v-card-actions
        p.text-body-1.pl-2 Version 1.2.0 :
          a(href="https://github.com/rassi0429/miband-hr-electron") GitHub
        v-spacer
        v-btn.primary(elevation="0" @click="setSettingState(false)") close
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'SettingModal',
  computed: {
    ...mapState('modal', ['settingModalOpen']),
    ...mapState('settings', ['isPortAuto', 'portNumber', 'isOBSMode'])
  },
  methods: {
    ...mapMutations('modal', ['setSettingState']),
    ...mapMutations('settings', ['setIsAutoPort', 'setPortNumber', 'setIsOBSMode'])
  }
}
</script>

<style scoped>

</style>
