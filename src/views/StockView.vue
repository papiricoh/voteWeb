<script setup>
import StockChart from '@/components/charts/StockChart.vue';

</script>

<script>
  export default {
    data() {
      return {
        
      };
    },
    computed: {

    },
  };
</script>

<template>
  <main>
    <h1 style="align-self: flex-start;">Bolsa</h1>
    <StockChart />
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

</style>
