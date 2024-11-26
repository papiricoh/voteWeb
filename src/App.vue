<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">

      <nav>
        <div class="nav_section">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/news">Noticias</RouterLink>
          <RouterLink to="/vote">Votacion</RouterLink>
          <RouterLink to="/laws">Leyes</RouterLink>
          <RouterLink to="/government">Gobierno</RouterLink>

        </div>
        
      </nav>
    </div>
  </header>

  <RouterView />
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
</style>
