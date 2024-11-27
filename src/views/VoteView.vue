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
    <h1 style="align-self: flex-start;">Parlamento</h1>
    <div class="propose_session" @click="$router.push('/vote/new')">Proponer Sesion</div>
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
.propose_session {
  padding: 1rem;
  background-color: var(--prussian-blue);
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: .4rem;
  transition: .4s;
  width: 100%;
  box-sizing: border-box;
  font-weight: bold;
}

.propose_session:hover {
  background-color: var(--cerulean);
}

</style>
