<script setup>
import ParliamentChart from '@/components/charts/ParliamentChart.vue';
import VoteChart from '@/components/charts/VoteChart.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import VoteButtons from '@/components/VoteButtons.vue';
</script>

<script>
  export default {
    data() {
      return {
        loading: true,
        inSession: false,
        session: null,
      };
    },
    computed: {

    },
    async mounted() {
      this.intervalId = await setInterval(async () => {
        if (this.$store.getters.getUser) {
          clearInterval(this.intervalId);
          await this.fetchSession();
        }
      }, 400);
    },
    methods: {
      async fetchSession() {
        await fetch(`${this.$store.getters.getBaseURL}/session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(await this.$store.getters.getUser.id + ':' + await this.$store.getters.getUser.token)
          },
          body: null
        }).then(response => response.json())
          .then(data => {
            if (data.error) {
              return;
            }
            this.inSession = data.inSession;
            this.session = data;
            this.loading = false;
          })
      }
    },
  };
</script>

<template>
  <main>
    <h1 style="align-self: flex-start;">Parlamento</h1>
    <LoadingComponent v-if="loading" />
    <div v-else-if="!inSession" class="propose_session" @click="$router.push('/vote/new')">Proponer Sesion</div>
    <div v-if="inSession" class="session_cont">
      <div class="loader"></div>
      <div style="font-size: x-large;">Sesion en curso</div>
      <div>Votando: </div>
      <div>Detalles: </div>
    </div>
    <VoteChart v-if="inSession" :total="50" :favour="30" :against="10"></VoteChart>
    <ParliamentChart></ParliamentChart>

    <VoteButtons v-if="inSession"></VoteButtons>
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

.session_cont {
  padding: 1rem;
  background-color: var(--prussian-blue);
  color: white;
  border-radius: .4rem;
  transition: .4s;
  width: 100%;
  box-sizing: border-box;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  margin-bottom: 2rem;
}

.loader {
  position: absolute;
  right: 3%;
  width: 45px;
  aspect-ratio: 1;
  --c:no-repeat linear-gradient(#ffffff 0 0);
  background: 
    var(--c) 0    0,
    var(--c) 0    100%, 
    var(--c) 50%  50%,   
    var(--c) 100% 0, 
    var(--c) 100% 100%;
  animation: l13 1s infinite alternate;
}

@keyframes l13 {
 0%,10%   {background-size:20% 100%}
 50%      {background-size:20%  20%}
 90%,100% {background-size:100% 20%}
}

</style>
