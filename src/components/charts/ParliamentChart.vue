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
    data() {
      return {
        chartOptions: {
          chart: {
            type: 'item',
          },
          title: {
            text: 'Distribución Parlamentaria',
          },
          subtitle: {
            text: 'Gráfico de distribución de escaños en un parlamento',
          },
          series: [
            {
              name: 'Escaños',
              keys: ['name', 'y', 'color', 'label'],
              data: [
                ['Partido A', 100, '#FF0000', 'A'],
                ['Partido B', 80, '#0000FF', 'B'],
                ['Partido C', 60, '#00FF00', 'C'],
                ['Partido D', 40, '#FFFF00', 'D'],
                ['Partido E', 20, '#FF00FF', 'E'],
              ],
              dataLabels: {
                enabled: true,
                format: '{point.label}',
              },

              center: ['50%', '88%'],
              size: '170%',
              startAngle: -100,
              endAngle: 100,
            },
          ],
          tooltip: {
            pointFormat: '<b>{point.name}:</b> {point.y} escaños',
          },
        },
      };
    },
  };
</script>
  
<style scoped>
  /* Personaliza el estilo si es necesario */
</style>
  