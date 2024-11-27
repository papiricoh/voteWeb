<script setup>
import IdeologyMeter from '@/components/IdeologyMeter.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
</script>

<script>
  export default {
    data() {
      return {
        loading: false,
        user: {
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          perms: 4
        },
        

        // New Party
        ideology: 0,
      };
    },
    methods: {
      
    },
  };
</script>

<template>
  <main>
    <h1>Nuevo Partido</h1>
    <IdeologyMeter :isDisabled="false" v-model="ideology"/>
    <div>{{ideology}}</div>
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
