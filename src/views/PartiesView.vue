<script setup>
import IdeologyMeter from '@/components/IdeologyMeter.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
</script>

<script>
  export default {
    data() {
      return {
        loading: true,
        user: {
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          perms: 4
        },
        // own_party: {
        //   id: 1,
        //   name: 'Vox',
        //   label: 'VOX',
        //   description: 'Descripcion del partido 1',
        //   members: 12,
        //   leader: 'Santiago Abascal',
        //   foundation: '2021-01-01',
        //   color: 'green'
        // },
        own_party: null,
        parties: [
          {
            id: 2,
            name: 'Partido socialista obrero español',
            label: 'PSOE',
            description: 'Descripcion del partido 1',
            members: 12,
            leader: 'Pedro Sanchez',
            foundation: '2021-01-01',
            color: '#FA0109'
          },
          {
            id: 3,
            name: 'Junta General de los Trabajadores de Jerez',
            label: 'JGTADJ',
            description: 'Descripcion del partido 1',
            members: 12,
            leader: 'Soralla baena',
            foundation: '2021-01-01',
            color: '#829109'
          },
          {
            id: 4,
            name: 'Partido Popular',
            label: 'PP',
            description: 'Descripcion del partido 1',
            members: 12,
            leader: 'Nuñez Feijoo',
            foundation: '2021-01-01',
            color: 'darkblue'
          },
        ]
      };
    },
    async mounted() {
      this.intervalId = await setInterval(async () => {
        if (this.$store.getters.getUser) {
          clearInterval(this.intervalId);
          await this.fetchParties();
        }
      }, 400);
    },
    methods: {
      async fetchParties() {
        await fetch(`${this.$store.getters.getBaseURL}/parties`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(await this.$store.getters.getUser.id + ':' + await this.$store.getters.getUser.token)
          },
          body: null
        }).then(response => response.json()).then(data => {
          if (data.error) {
            
            return;
          }
          var newParties = [];
          for (let party of data) {
            if (party.id === this.$store.getters.getUser.party.id && party.label !== 'IND') {
              this.own_party = party;
            }else {
              newParties.push(party);
            }
          }
          this.parties = newParties;
          this.loading = false;

        })
      },
      async leaveParty() {
        await fetch(`${this.$store.getters.getBaseURL}/parties/leave`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(await this.$store.getters.getUser.id + ':' + await this.$store.getters.getUser.token)
          },
          body: JSON.stringify({
            user_id: this.$store.getters.getUser.id
          })
        }).then(async response => response.json()).then(async data => {
          if (data.error) {
            
            return;
          }
          this.loading = true;
          await this.fetchParties();

        })
      },
    },
    
  };
</script>

<template>
  <main>
    <h1>Partidos</h1>
    <LoadingComponent class="loading" v-if="loading"></LoadingComponent>
    <div v-else class="parties_list">
      <div v-if="own_party" class="party_item party_item_own" :style="'outline-color:' + own_party.color + ';'">
        <div class="party_logo" :style="'background-color: ' + own_party.color + ';'">{{own_party.label}}</div>
        <div class="party_name">
          <div>{{own_party.name}}</div>
          <IdeologyMeter v-model="own_party.ideology"></IdeologyMeter>
        </div>
        <div>{{own_party.members}} miembros</div>
        <div>Presidente: {{own_party.leader}}</div>
        <div class="afiliate_button leave_button" @click="leaveParty()">Abandonar</div>
      </div>
      <div v-else class="new_party" @click="$router.push('/parties/new')">Crear un nuevo partido</div>
      <div v-if="!parties">No hay mas partidos</div>
      <div v-else v-for="party in parties" class="party_item">
        <div class="party_logo" :style="'background-color: ' + party.color + ';'">{{party.label}}</div>
        <div class="party_name">
          <div>{{party.name}}</div>
          <IdeologyMeter v-model="party.ideology"></IdeologyMeter>
        </div>
        <div>{{party.members}} miembros</div>
        <div>Presidente: {{party.leader}}</div>
        <div v-if="party.label !== 'IND'" class="afiliate_button">Solicitar afiliacion</div>
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
  align-items: stretch;
  margin-left: 16vw;
}

.parties_list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.party_item {
  display: grid;
  gap: 1rem;
  grid-template-columns: 10vw 2fr 1fr 2fr 1fr;
  align-items: center;
  transition: .4s;
  cursor: pointer;
  border-radius: .4rem;
  background-color: #f0f0f0;
}

.party_item:hover {
  background-color: #cecece;
}
.party_logo {
  background-color: grey;
  padding: 1rem;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.35vw;
  font-weight: bold;
  border-radius: .4rem;
}
.party_name {
  font-size: 1.5vw;
  font-weight: bold;
}
.loading {
  align-self: center;
  
}

.afiliate_button {
  background-color: var(--prussian-blue);
  color: white;
  font-weight: bold;
  padding: .5rem;
  border-radius: 0 .4rem .4rem 0; 
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .8rem;
  transition: .4s;
}

.afiliate_button:hover {
  background-color: var(--cerulean);
}

.new_party {
  background-color: var(--prussian-blue);
  color: white;
  font-weight: bold;
  padding: .5rem;
  border-radius: .4rem; 
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .8rem;
  transition: .4s;
  cursor: pointer;
}
.new_party:hover {
  background-color: var(--cerulean);
}
.new_party:active {
  background-color: var(--cerulean);
  transform: scale(.98);
}

.party_item_own {
  outline: 2px solid grey;
}
.leave_button {
  background-color: rgb(140, 0, 0);
}
.leave_button:hover {
  background-color: rgb(120, 0, 0);
}
.leave_button:active {
  background-color: rgb(100, 0, 0);
  transform: scale(1.02);
}

</style>
