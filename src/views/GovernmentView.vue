<script setup>
import LoadingComponent from '@/components/LoadingComponent.vue';


</script>

<script>
  export default {
    data() {
      return {
        loading: true,
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          perms: 4
        },
        government: {
          president: null,
          members: []
        }
      };
    },
    methods: {
      async getGovernment() {
        await fetch(`${this.$store.getters.getBaseURL}/government`, {
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

          this.government.president = data[0];
          data.shift();
          
          this.government.members = data;
          this.loading = false;

        })
      },
    },
    async mounted() {
      this.intervalId = await setInterval(async () => {
        if (this.$store.getters.getUser) {
          clearInterval(this.intervalId);
          await this.getGovernment();
        }
      }, 400);
    },
  };
</script>

<template>
  <main v-if="!loading">
    <h1>Gobierno e Instituciones</h1>
    <div class="gov_section">
      <div>Presidente</div>
      <div>
        <div>{{ government.president.first_name }} {{ government.president.last_name }}</div>
        <div style="font-weight: 400; font-size: 1vw;">{{ government.president.username }}</div>
      </div>
      <div class="party_c">
        <div class="party_logo" :style="'background-color: ' + government.president.color + ';'">{{government.president.label}}</div>
        <div>{{ government.president.party }}</div>
      </div>
      <div class="administrate_gov" v-if="government.president.id == user.id">Administrar</div>
    </div>
    <div v-for="member in government.members" class="gov_section">
      <div>{{member.role}}</div>
      <div>
        <div>{{ member.first_name }} {{ member.last_name }}</div>
        <div style="font-weight: 400; font-size: 1vw;">{{ member.username }}</div>
      </div>
      <div class="party_c">
        <div class="party_logo" :style="'background-color: ' + member.color + ';'">{{member.label}}</div>
        <div>{{ member.party }}</div>
      </div>
      <!-- Maybe in the future -->
      <!-- <div class="administrate_gov" v-if="member.id == user.id">Administrar</div> -->
    </div>
    
  </main>
  <main v-else>
    <LoadingComponent class="l_comp"  />
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


.gov_section {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  font-weight: bold;
  font-size: 1.2vw;
  background-color: rgb(231, 231, 231);
  border-radius: .4rem;
  padding: 1rem 0 1rem 1rem;
  cursor: pointer;
  transition: .4s;
}
.gov_section:hover {
  background-color: rgb(211, 211, 211);
}

.party_logo {
  background-color: grey;
  padding: 1rem;
  height: 6vw;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.4vw;
  font-weight: bold;
  border-radius: .4rem;
}

.party_c {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.administrate_gov {
  background-color: var(--prussian-blue);
  color: white;
  padding: 1rem;
  border-radius: 0 .4rem .4rem 0;
  cursor: pointer;
  transition: .4s;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6vw;
}
.administrate_gov:hover {
  background-color: var(--cerulean);
}

.l_comp {
  align-self: center;
  margin-top: 30vh;
}

</style>
