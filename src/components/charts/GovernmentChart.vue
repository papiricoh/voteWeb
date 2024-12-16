<template>
    <div>
      <highcharts :options="chartOptions" ref="governmentChart"></highcharts>
    </div>
</template>
  
<script>
  import Highcharts from 'highcharts';
  import HighchartsVue from 'highcharts-vue';
  import ItemSeries from 'highcharts/modules/item-series';

  // ItemSeries(Highcharts);

  export default {
    name: 'GovernmentChart',
    async mounted() {
      this.intervalId = await setInterval(async () => {
        if (this.$store.getters.getUser) {
          clearInterval(this.intervalId);

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
            text: 'Equipo de Gobierno',
          },
          series: [
            {
              name: 'Escaños',
              keys: ['name', 'y', 'color', 'label'],
              data: [
                ['Presidente', 1, '#000000', "Pablo Rico"],
                ['Vicepresidente', 1, '#000000', "VP"],
                ['Ministro de Economía', 1, '#000000', "ME"],
                ['Ministro de Sanidad', 1, '#000000', "MS"],
                ['Ministro de Educación', 1, '#000000', "ME"],
                ['Ministro de Defensa', 1, '#000000', "ME"],
                ['Ministro de Interior', 1, '#000000', "ME"],
              ],
              dataLabels: {
                enabled: true,
                format: '{point.label}',
              },

              center: ['50%', '50%'],
              size: '100%',
              startAngle: -180,
              endAngle: 180,
            },
          ],
          tooltip: {
            pointFormat: '<b>{point.label}:</b> {point.y}',
          },
        },
      };
    },
    methods: {

    }
  };
</script>
  
<style scoped>
  /* Personaliza el estilo si es necesario */
</style>
  