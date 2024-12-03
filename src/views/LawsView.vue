<script setup>
import LoadingComponent from '@/components/LoadingComponent.vue';


</script>

<script>
  export default {
    data() {
      return {
        loading: true,
        laws: [],

      };
    },
    async mounted() {
      this.intervalId = await setInterval(async () => {
        if (this.$store.getters.getUser) {
          clearInterval(this.intervalId);
          await this.fetchLaws();
        }
      }, 400);
    },
    methods: {
      async fetchLaws() {
        await fetch(`${this.$store.getters.getBaseURL}/laws`, {
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
            this.laws = data;
            this.loading = false;

          })
      }
    },
  };
</script>

<template>
  <main>
    <h1 style="align-self: flex-start;">Leyes</h1>
    <div @click="$router.push('/laws/new')" class="new_law">Nueva Ley</div>
    <div v-if="laws.length == 0">No hay leyes</div>
    <LoadingComponent v-if="loading" />
    <div v-else class="law_list_c">
      <div v-for="law in laws" class="law_item_c">
        <div class="law_item_title_c">
          <div class="law_item_t">{{law.title}}</div>
          <div class="law_item_d">{{law.description}}</div>
        </div>
        <div class="law_item_date_c">{{law.date}}</div>
        <div class="law_item_button_c">
          <button @click="$router.push(`/laws/${law.id}`)">Leer</button>
          <div v-if="law.status == 'signed'" class="law_status l_s_signed">
            <div>Firmada</div>
          </div>
          <div v-else-if="law.status == 'pending'" class="law_status l_s_pending">
            <div>Pendiente</div>
          </div>
          <div v-else-if="law.status == 'aproved'" class="law_status l_s_aproved">
            <div>Aprobada</div>
          </div>
          <div v-else class="law_status l_s_regected">
            <div>Rechazada</div>
          </div>
          <button v-if="$store.getters.getUser.perms > 3 && law.status == 'aproved'">Firmar</button>
        </div>
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
  align-items: center;
  margin-left: 16vw;
}

.law_list_c {
  display: grid;
  grid-template-rows: repeat(auto-fill,  1fr);
  gap: .6rem;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
}
.law_item_c {
  display: grid;
  gap: 1rem;
  box-sizing: border-box;
  align-items: center;
  grid-template-columns: 4fr 1fr 2fr; 
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .2);
  color: var(--rich-black);
  width: 100%;
  border-radius: 1rem;
  transition: .4s;
}
.law_item_title_c {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.law_item_t {
  font-size: 1.3rem;
  font-weight: bold;
}
.law_item_d {
  font-size: .7rem;
}
.law_item_button_c {
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
}
.law_item_button_c > button {
  border: none;
  background-color: var(--prussian-blue);
  color: var(--white);
  min-width: 5rem;
  height: 100%;
  transition: .4s;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}
.law_item_button_c > button:hover {
  background-color: var(--cerulean);
}
.law_item_button_c > button:active {
  background-color: var(--prussian-blue);
}
.law_item_button_c > button:nth-child(1) {
  border-radius: 0 1rem 1rem 0;
}


.law_status {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-weight: bold;
  color: var(--white);
  width: 4.5rem;
}
.l_s_signed {
  background-color: green;
}
.l_s_pending {
  background-color: rgb(199, 149, 0);
}
.l_s_regected {
  background-color: rgb(199, 0, 0);
}
.l_s_aproved {
  background-color: rgb(0, 91, 130);
}
.law_reader_b {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.law_reader {
  background-color: white;
  width: 70vw;
  min-height: 30rem;
  padding: 1.4rem;
  box-sizing: border-box;
}
.law_r_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.exit_button {
  width: 2rem;
  height: 2rem;
  background-color: var(--cerulean);
  border-radius: .4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: .2rem;
  font-weight: bold;
  font-size: 1.8rem;
}
.lr_title {
  font-size: 1.5rem;
  font-weight: bold;
}
.lr_article_title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
}
.lr_footer {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sign {
  font-family: "Mrs Saint Delafield", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 3rem;
  transform: translateY(2.3rem);
}
.law_item_date_c {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.new_law {
  background-color: var(--prussian-blue);
  color: var(--white);
  padding: 1rem;
  border-radius: .4rem;
  cursor: pointer;
  transition: .4s;
  width: 10rem;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  font-weight: bold;
}

.new_law:hover {
  background-color: var(--cerulean);
}
</style>
