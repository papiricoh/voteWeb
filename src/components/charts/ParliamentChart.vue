<template>
    <div>
      <highcharts :options="chartOptions" ref="parliamentChart"></highcharts>
    </div>
</template>
  
<script>
  import Highcharts from 'highcharts';
  import HighchartsVue from 'highcharts-vue';
  import ItemSeries from 'highcharts/modules/item-series';

  ItemSeries(Highcharts);

  export default {
    name: 'ParliamentChart',
    async mounted() {
      this.intervalId = await setInterval(async () => {
        if (this.$store.getters.getUser) {
          clearInterval(this.intervalId);
          await this.fetchParties();
        }
      }, 40);
    },
    data() {
      return {
        chartOptions: {
          chart: {
            type: 'item',
          },
          title: {
            text: 'Distribución Parlamentaria',
          },
          series: [
            {
              name: 'Escaños',
              keys: ['name', 'y', 'color', 'label'],
              data: [
              ],
              dataLabels: {
                enabled: true,
                format: '{point.label}',
              },

              center: ['50%', '88%'],
              size: '170%',
              startAngle: -90,
              endAngle: 90,
            },
          ],
          tooltip: {
            pointFormat: '<b>{point.label}:</b> {point.y} escaños',
          },
        },
      };
    },
    methods: {
      async fetchParties() {
        await fetch(`${this.$store.getters.getBaseURL}/parties`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(await this.$store.getters.getUser.id + ':' + await this.$store.getters.getUser.token)
          },
          body: null
        }).then(response => response.json()).then(data => {
          if (data.error) {
            
            return;
          }
          var newParties = [];
          for (let party of data) {
            if(party.members > 0) {
              newParties.push([party.name, party.members, party.color, party.label]);
            }
          }
          this.chartOptions.series[0].data = newParties;
          //this.loading = false;

        })
      }
    },
  };
</script>
  
<style scoped>
  /* Personaliza el estilo si es necesario */
</style>
  