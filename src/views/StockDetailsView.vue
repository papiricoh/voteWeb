<script setup>
import PieChart from '@/components/charts/PieChart.vue';
import StockChart from '@/components/charts/StockChart.vue';

</script>

<script>
  export default {
    data() {
      return {
        wallet: {
          avariable: 1200,
          value: 1232000,
        },
        company: {
          label: 'APPL',
          name: 'Apple',
          value: 100.32,
          marketCap: 1000000,
          variation: 0.102,
          color: 'black'
        }
      };
    },
    props: {
      id: String
    },
    methods: {
      getPositiveStyle(value) {
        if(value > 0) {
          return "color: green";
        }else {
          return "color: red";
        }
      },
      formatCurrency(value) {
        if (typeof value !== 'number') {
          return value;
        }else if(value >= 1000000000000) {
          return (value / 1000000000000).toFixed(2).toLocaleString() + ' T';
        }else if(value >= 1000000000) {
          return (value / 1000000000).toFixed(2).toLocaleString() + ' B';
        }else if(value >= 1000000) {
          return (value / 1000000).toFixed(2).toLocaleString() + ' M';
        }else if(value >= 1000) {
          return (value / 1000).toFixed(2).toLocaleString() + ' k';
        }
        return value.toFixed(2).toLocaleString();
      }
    },
    computed: {

    },
  };
</script>

<template>
  <main>
    <h1 style="align-self: flex-start;">{{id}}</h1>
    <div class="stock_main">
      <div class="stock_chart">
        <StockChart />

      </div>
      <div class="stock_data">
        <div style="font-size: 1.4rem; font-weight: bold;">{{company.label}} - {{company.name}}</div>
        <div>ds</div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-left: 16vw;
}

.stock_main {
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 2fr;
  gap: 1rem;
}

.stock_data, .stock_chart {

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.15);
  border-radius: .4rem;
  width: 100%;
  box-sizing: border-box;
}

</style>
