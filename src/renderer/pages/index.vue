<template lang="pug">
  v-app
    v-app-bar(app dense elevation="1" )
      v-app-bar-title Mi4Neos
      v-spacer
      v-btn.mr-2(outlined small) {{serverHost}}
      v-btn(@click="setSettingState(true)" small outlined)
        v-icon mdi-cog
    v-main(app)
      v-container
        v-card
          v-card-title
            | MiBand
            v-spacer
            v-select.mr-1(dense outlined hide-details placeholder="Select MiBand")
            v-btn(elevation="0" color="green accent-2" )
              v-icon mdi-connection
          //v-card-subtitle
          //  v-row(justify="end" )
          //    a Add Device
          v-card-text
            v-row
              v-col(cols="12")
                v-card(elevation="0" color="grey lighten-2" max-height="200px" )
                  v-card-text
                    line-chart(:chart-data="testData" :options="testOptions" style="height:180px")
                    div(style="position: absolute; top:20px; right:30px")
                      div.text-h1.text-right 86
                        span.text-h5 bpm
                      div.text-body-2.text-right min
                        span.text-body-1 55 bpm
                      div.mb-auto.text-body-2.text-right max
                        span.text-body-1 114 bpm
              // v-card( elevation="0" color="grey lighten-2" height="200px" style="position:relative")
                v-card-text

            // bar-chart
      setting-modal
</template>

<script>
import { mapMutations } from 'vuex'
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
import SettingModal from '@/components/SettingModal'

export default {
  name: 'IndexPage',
  components: {
    SettingModal,
    BarChart,
    LineChart
  },
  methods: {
    ...mapMutations('modal', ['setSettingState'])
  },
  data () {
    return {
      serverHost: 'wss://localhost:8080',
      testData: {
        labels: [...Array(7)],
        datasets: [
          {
            backgroundColor: '#f87979',
            data: [80, 85, 86, 88, 90, 92, 86],
            fill: false
          }
        ]
      },
      testOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false
        },
        tooltip: {
          enabled: false
        },
        legend: {
          display: false
        },
        gridLines: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
            ticks: {
              min: 0,
              max: 160,
              stepSize: 10
            }
          }]
        }
      }
    }
  }
}
</script>

<style>
.e-nuxt-container {
  min-height: calc(100vh - 50px);
  background: linear-gradient(to right, #ece9e6, #ffffff);
  font-family: Helvetica, sans-serif;
}

.e-nuxt-content {
  display: flex;
  justify-content: space-around;
  padding-top: 100px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.e-nuxt-logo {
  width: 400px;
}

.e-nuxt-system-info {
  padding: 20px;
  border-top: 1px solid #397c6d;
  border-bottom: 1px solid #397c6d;
}

.e-nuxt-links {
  padding: 100px 0;
  display: flex;
  justify-content: center;
}

.e-nuxt-button {
  color: #364758;
  padding: 5px 20px;
  border: 1px solid #397c6d;
  margin: 0 20px;
  border-radius: 15px;
  font-size: 1rem;
}

.e-nuxt-button:hover {
  cursor: pointer;
  color: white;
  background-color: #397c6d;
}
</style>
