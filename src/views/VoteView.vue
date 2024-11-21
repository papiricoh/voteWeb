<script setup>
import ParliamentChart from '@/components/charts/ParliamentChart.vue';
import VoteChart from '@/components/charts/VoteChart.vue';
import VoteButtons from '@/components/VoteButtons.vue';
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
    <VoteChart :total="50" :favour="30" :against="10"></VoteChart>

    <VoteButtons></VoteButtons>
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
