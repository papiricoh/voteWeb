<script setup>
import IdeologyMeter from '@/components/IdeologyMeter.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
</script>

<script>
  export default {
    data() {
      return {
        loading: false,
        
      };
    },
    async mounted() {
      this.intervalId = await setInterval(async () => {
        if (this.$store.getters.getUser) {
          clearInterval(this.intervalId);
          // await this.fetchParties();
        }
      }, 20);
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
        }).then(response => response.json()).then(async data => {
          if (data.error) {
            
            return;
          }
          await this.fetchUser();
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
      
      
    },
    
  };
</script>

<template>
  <main>
    <h1>Correo</h1>
    <LoadingComponent class="loading" v-if="loading"></LoadingComponent>
    <div v-else class="mail_container">
      
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

.mail_container {
  display: grid;
  grid-template-columns: 1fr 4fr;
}



</style>
