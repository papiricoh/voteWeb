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
      <div class="tloader"></div>
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

/* HTML: <div class="loader"></div> */
.tloader {
  width: fit-content;
  font-size: 40px;
  font-family: monospace;
  font-weight: bold;
  text-transform: uppercase;
  color: #ffffff00;
  -webkit-text-stroke: 1px #ffffff;
  --g:conic-gradient(#ffffff 0 0) no-repeat text;
  background:var(--g) 0,var(--g) 1ch,var(--g) 2ch,var(--g) 3ch,var(--g) 4ch,var(--g) 5ch,var(--g) 6ch,var(--g) 7ch,var(--g) 8ch,var(--g) 9ch,var(--g) 10ch,var(--g) 11ch,var(--g) 12ch,var(--g) 13ch,var(--g) 14ch;
  animation: 
    l17-0 2s linear infinite alternate,
    l17-1 4s linear infinite;
}
.tloader:before {
  content: "Sesion En Curso";
}
@keyframes l17-0 {
  0%   {background-size: 1ch 0   }
  100% {background-size: 1ch 100%}
}
@keyframes l17-1 {
  0%,50%    {background-position-y: 100%, 0}
  50.01%,to {background-position-y: 0, 100%}
}

</style>
