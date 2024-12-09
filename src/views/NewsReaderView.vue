<script setup>

</script>

<script>
  export default {
    data() {
      return {
        
        readingNew: {title: '', subtitle: '', date: '', author: '', type: '', content: ''},

      };
    },
    props: {
      id: String
    },
    async mounted() {
      this.intervalId = await setInterval(async () => {
        if (this.$store.getters.getUser) {
          clearInterval(this.intervalId);
          await this.fetchLaw();
        }
      }, 20);
    },
    methods: {
      async fetchLaw() {
        await fetch(`${this.$store.getters.getBaseURL}/news/${this.id}`, {
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
            this.readingNew = data;
            this.loading = false;

          })
      }
    },
  };
</script>

<template>
  <main>
    <div class="law_reader_b">
      <div class="law_reader">
        <div class="law_r_header">
          <div class="lr_title">{{readingNew.title}}</div>
          <div @click="$router.push('/news')" class="exit_button">Volver</div>
        </div>
        <div>Escrito por: <b>{{readingNew.author}}</b></div>
        <div>{{readingNew.subtitle}}</div>
        <hr>
        <div style="white-space: pre-wrap;">{{readingNew.content}}</div>
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
  font-family: Escrow Condensed, Times New Roman, serif;
  font-stretch: normal;
  letter-spacing: -.25px;
  font-size: 1.2rem;
  color: #333;
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
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
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
  background-color: var(--cerulean);
  border-radius: .4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: .6rem 1.4rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--white);
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
