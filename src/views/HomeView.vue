<script setup>
import ParliamentChart from '@/components/charts/ParliamentChart.vue';
import VoteChart from '@/components/charts/VoteChart.vue';
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
    <div>Parliament</div>
    <ParliamentChart></ParliamentChart>
    <VoteChart :total="50" :favour="20" :against="10"></VoteChart>
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
}
</style>
