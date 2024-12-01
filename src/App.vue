<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Cookies from 'js-cookie';
</script>


<script>
  export default {
    
    async created() {
      console.log('App created');
      const postData = {
        username: Cookies.get('authUser'),
        token: Cookies.get('authToken')
      };
      await fetch(`${this.$store.getters.getBaseURL}/login/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }).then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            this.$router.push('/login');
            return;
          }
          this.$store.dispatch('setUserAction', data);

        })

      
    },
    data() {
      return {
        loading: false,
        
      };
    },
    computed: {
      
    },
    


  };
</script>


<template>
  <header>
    <div class="wrapper">

      <nav>
        <div class="nav_section">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/mail">Buzon</RouterLink>
          <RouterLink to="/news">Noticias</RouterLink>
          <RouterLink to="/vote">Votacion</RouterLink>
          <RouterLink to="/laws">Leyes</RouterLink>
          <RouterLink to="/parties">Partidos</RouterLink>
          <RouterLink to="/courts">Tribunales</RouterLink>
          <RouterLink to="/government">Gobierno</RouterLink>

        </div>
        
      </nav>
    </div>
  </header>

  <RouterView />
  <div v-if="$store.getters.getUser" class="user_container">
    <div class="user_name">
      <div>{{$store.getters.getUser.first_name}} {{$store.getters.getUser.last_name}}</div>
      <div>{{$store.getters.getUser.username}}</div>
    </div>
    <div class="user_details">
      <div>{{$store.getters.getUser.party.label}}</div>
    </div>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  background-color: var(--rich-black);
  position: fixed;
  width: 16vw;
}

.nav_section {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
}

.nav_section > a {
  padding: 1rem;
  background-color: var(--prussian-blue);
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: .4s;
}

.nav_section > a:hover {
  background-color: var(--cerulean);
}

.user_container {
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--prussian-blue);
  color: white;
  padding: .5rem;
  border-radius: .4rem;
  margin: .4rem;
  cursor: pointer;
  transition: .4s;
  display: flex;
  gap: .6rem;
}
.user_name {
  font-weight: bold;
  display: flex;
  flex-direction: column;
}
.user_name > div:last-child {
  font-size: .8rem;
  font-weight: 400;
}
.user_details {
  display: flex;
  flex-direction: column;
}
</style>
