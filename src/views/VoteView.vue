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

        
        ws: null,
        vote: 'abstention',

        remainingTime: '',
        //Admin / government member
        sessionsList: [],
        newSession: "select",
        sessionMinPerm: 3,
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
    beforeDestroy() {
      clearInterval(this.countIntervalId);
      if (this.ws) {
        this.ws.close();
      }
    },
    methods: {
      async connectWebSocket() {
        this.ws = new WebSocket(`${this.$store.getters.getWebsocketURL}/api/v1/web`);

        this.ws.onopen = async () => {
          //this.message = 'Conectado al WebSocket';
        };

        this.ws.onmessage = async (event) => {
          //this.message = `Mensaje recibido: ${event.data}`;
          //console.log(event.data);
          const data = JSON.parse(event.data);
          if(data.type == 'vote') {
            this.session.forVotes = data.forVotes;
            this.session.againstVotes = data.againstVotes;
          }
          
          if(data.type == 'disconnect') {
            await this.ws.close();
            await this.fetchSession();
          }
          
        };

        this.ws.onerror = async (error) => {
          console.error('WebSocket error:', error);
        };

        this.ws.onclose = async () => {
          console.log('WebSocket cerrado');
          
        };
      },
      getRemainingTime() {
        if (!this.session) {
          return '';
        }
        const now = new Date();
        const end = new Date(this.session.endDate);
        const diff = end - now;
        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        return `${hours} horas, ${minutes} minutos, ${seconds} segundos`;
      },
      updateRemainingTime() {
        this.remainingTime = this.getRemainingTime();
      },
      async fetchSession() {
        await fetch(`${this.$store.getters.getBaseURL}/session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(await this.$store.getters.getUser.id + ':' + await this.$store.getters.getUser.token)
          },
          body: null
        }).then(response => response.json())
          .then(async data => {
            if (data.error) {
              return;
            }
            this.inSession = data.inSession;
            if(this.inSession) {
              this.countIntervalId = setInterval(this.updateRemainingTime, 1000);
            }
            this.session = data;
            console.log(this.session);
            
            if(this.$store.getters.getUser.perms >= this.sessionMinPerm) {
              await this.fetchSessionList();
            }
            await this.connectWebSocket();

            this.loading = false;
          })
      },
      async fetchSessionList() {
        await fetch(`${this.$store.getters.getBaseURL}/session/pending`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(await this.$store.getters.getUser.id + ':' + await this.$store.getters.getUser.token)
          },
          body: null
        }).then(response => response.json())
          .then(async data => {
            if (data.error) {
              return;
            }

            this.sessionList = data;
          })
      },
      async startSession() {
        await fetch(`${this.$store.getters.getBaseURL}/session/start`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(await this.$store.getters.getUser.id + ':' + await this.$store.getters.getUser.token)
          },
          body: JSON.stringify({
            user_id: this.$store.getters.getUser.id,
            session_id: this.newSession
          })
        }).then(response => response.json())
          .then(async data => {
            if (data.error) {
              return;
            }

            this.inSession = data.inSession;
            if(this.inSession) {
              this.countIntervalId = setInterval(this.updateRemainingTime, 1000);
            }
            this.session = data;
            await this.connectWebSocket();
          })
      },
      async changeVote(vote) {
        this.vote = vote;
        await this.ws.send(JSON.stringify({
          user_id: this.$store.getters.getUser.id,
          type: 'vote',
          vote: vote
        }));
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
      <div style="font-weight: 400; font-size: larger;"><b>Votando:</b> {{session.title}}</div>
      <div>Tiempo restante: {{remainingTime ?? '...'}}</div>
    </div>
    <div v-if="!inSession && $store.getters.getUser && $store.getters.getUser.perms >= sessionMinPerm" class="session_cont session_perms">
      <div>Iniciar sesion parlamentaria: </div>
      <select v-model="newSession">
        <option disabled value="select">Selecciona la sesion</option>
        <option v-for="session in sessionList" :value="session.id">{{session.title}}</option>
      </select>
      <button @click="startSession()">Iniciar sesion</button>
    </div>
    <VoteChart v-if="inSession" :total="session.seats" :favour="session.forVotes" :against="session.againstVotes"></VoteChart>
    <ParliamentChart></ParliamentChart>

    <VoteButtons @change-vote="changeVote" :vote="vote" v-if="inSession"></VoteButtons>
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

.session_perms {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}


select, input {
  /* Reset */
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  /* Personalize */
  width: 20rem;
  padding: 1rem 4rem 1rem 1rem;
  background: var(--arrow-icon) no-repeat right 0.8em center / 1.4em,
    linear-gradient(to left, var(--arrow-bg) 3em, var(--select-bg) 3em);
  background-color: var(--prussian-blue);
  color: white;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  /* Remove IE arrow */
  &::-ms-expand {
    display: none;
  }
  /* Remove focus outline */
  &:focus {
    outline: none;
  }
  /* <option> colors */
  option {
    color: inherit;
    background-color: var(--option-bg);
  }
}

button {
  padding: 1rem;
  background-color: var(--cerulean);
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: .4rem;
  transition: .4s;
  box-sizing: border-box;
  font-weight: bold;
  border: 0;
  outline: 0;
}


</style>
