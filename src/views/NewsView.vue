<script setup>

</script>

<script>
  export default {
    data() {
      return {
        user: {
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          perms: 4
        },
        news: [
          {
            title: 'Noticia 1',
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
            date: '2021-10-10',
            author: 'John Doe',
            alert: 'new'
          },
          {
            title: 'Noticia 1',
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
            date: '2021-10-10',
            author: 'John Doe',
            alert: 'urgent'
          },
          {
            title: 'Noticia 2',
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
            date: '2021-10-10',
            author: 'John Doe',
            alert: null
          },
          {
            title: 'Noticia 2',
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
            date: '2021-10-10',
            author: 'John Doe',
            alert: null
          },
          {
            title: 'Noticia 2',
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
            date: '2021-10-10',
            author: 'John Doe',
            alert: null
          }
        ],
      };
    },
    methods: {
      
    },
  };
</script>

<template>
  <main>
    <div class="news_list">
      <div v-for="anew in news" class="news_item">
        <div v-if="anew.alert == 'new'" class="news_alert n_alert_new">Nuevo</div>
        <div v-else-if="anew.alert == 'urgent'" class="news_alert n_alert_urgent">Importante</div>
        <div class="news_header">
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
  max-width: 26vh;
}

.news_item:hover {
  background-color: #c2c2c2;
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

</style>
