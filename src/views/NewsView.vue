<script setup>

import LoadingComponent from '@/components/LoadingComponent.vue';
</script>

<script>
  export default {
    data() {
      return {
        loading: true,
        news: [],
        


      };
    },

    async mounted() {
      this.intervalId = await setInterval(async () => {
        if (this.$store.getters.getUser) {
          clearInterval(this.intervalId);
          await this.fetchNews();
        }
      }, 1000);
    },
    methods: {
      async fetchNews() {
        await fetch(`${this.$store.getters.getBaseURL}/news`, {
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
          this.news = data;
          for (let anew of this.news) {
            anew.date = new Date(anew.date).toLocaleDateString();
          }
          this.loading = false;

        })
      }
    },
  };
</script>

<template>
  <main>
    <div style="align-self: center; font-weight: 1000; font-size: 2.6rem;">THE UAX STREET JOURNAL</div>
    <div class="news_header">
      <div>The Street Journal™</div>
      <div @click="$router.push('/news/new')" class="news_new_new">Nueva Noticia</div>
    </div>

    <LoadingComponent v-if="loading" style="align-self: center; margin-top: 6rem;"></LoadingComponent>
    <div v-else class="news_list">
      <div v-for="anew in news" class="news_item">
        <div v-if="anew.type == 'new'" class="news_alert n_alert_new">Nuevo</div>
        <div v-else-if="anew.type == 'urgent'" class="news_alert n_alert_urgent">Importante</div>
        <div v-else-if="anew.type == 'session'" class="news_alert n_alert_session">Pleno</div>
        <div v-else-if="anew.type == 'party'" class="news_alert n_alert_party">Partido</div>
        <div v-else-if="anew.type == 'admin'" class="news_alert n_alert_admin">Admin (OOC)</div>
        <div class="news_item_header">
          <h2>{{ anew.title }}</h2>
          <p>{{ anew.subtitle }}</p>
        </div>
        <p>{{ anew.author }} - {{ anew.date }}</p>
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
  font-family: Escrow Condensed, Times New Roman, serif;
  font-stretch: normal;
  letter-spacing: -.25px;
  color: #333;
}
.news_list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(26vh, 1fr));
  flex-wrap: wrap;
  align-items: stretch;
  gap: 1rem;
}

.news_item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #e6e6e6;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  align-items: start;
  justify-content: space-between;
  transition: .4s;
  cursor: pointer;
}

.news_item:hover {
  transform: scale3d(1.02, 1.02, 1) rotate3d(0, 0, 1, .5deg);
}

.news_item:active {
  transform: rotate3d(0, 0, -1, .5deg);
}

.news_alert {
  position: absolute;
  background-color: red;
  padding: .4rem 1rem;
  transform: translateX(-16px) translateY(-16px);
  border-radius: 0.5rem 0;
  font-weight: bold;
  color: white;
}
.n_alert_new {
  background-color: rgb(8, 101, 0);
}
.n_alert_urgent {
  background-color: rgb(198, 171, 0);
}

.n_alert_session {
  background-color: rgb(0, 64, 120);
}

.n_alert_party {
  background-color: grey;
}

.news_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.news_new_new {
  color: #333;
  cursor: pointer;
}
.news_new_new:hover {
  color: black;
  text-decoration: underline;
  cursor: pointer;
}

.news_new_new:active {
  color: #333;
}

.n_alert_admin {
  background-color: black;
}

</style>
