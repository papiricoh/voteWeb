<script setup>
import IdeologyMeter from '@/components/IdeologyMeter.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { ColorPicker } from "vue3-colorpicker";
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
        party_name: '',
        party_label: '',
        ideology: 0,
        pureColor: '#000001',
      };
    },
    computed: {
      canCreate() {
        return this.party_name.length > 0 && this.party_label.length > 0 && this.pureColor != '#000001';
      }
    },
    mounted() {
      

    },
    methods: {
      async createParty() {
        await fetch(`${this.$store.getters.getBaseURL}/parties/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(await this.$store.getters.getUser.id + ':' + await this.$store.getters.getUser.token)
          },
          body: JSON.stringify({
            name: this.party_name,
            label: this.party_label,
            ideology: this.ideology,
            color: this.pureColor,
            user_id: this.$store.getters.getUser.id,
            logo: ''
          })
        }).then(response => response.json()).then(data => {
          if (data.error) {
            
            return;
          }
          this.$router.push('/parties');
        
        })
      }
    },
  };
</script>

<template>
  <main>
    <h1>Nuevo Partido</h1>
    <div style="display: flex; justify-content: space-between;">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <label for="name">Nombre</label>
        <input v-model="party_name" type="text" id="name" placeholder="Nombre del partido" maxlength="80"/>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <label for="label">Siglas</label>
        <input v-model="party_label" type="text" id="label" placeholder="PAR" maxlength="6"/>
      </div>
    </div>
    <label for="ideology">Ideología</label>
    <IdeologyMeter :isDisabled="false" v-model="ideology"/>
    <label>Color</label>
    <div class="color_container">
      <color-picker isWidget v-model:pureColor="pureColor" v-model:gradientColor="gradientColor"/>
      <div class="party_logo" :style="'background-color: ' + pureColor + ';'">{{party_label}}</div>
    </div>
    <button v-if="canCreate" class="new_party" @click="createParty()">Crear Partido</button>
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

label {
  font-size: 1.25rem;
  font-weight: bold;
}

select, input {
  /* Reset */
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  /* Personalize */
  width: 20rem;
  padding: 1rem 4rem 1rem 1rem;
  background: var(--arrow-icon) no-repeat right 0.8em center / 1.4em,
    linear-gradient(to left, var(--arrow-bg) 3em, var(--select-bg) 3em);
  background-color: var(--prussian-blue);
  color: white;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  /* Remove IE arrow */
  &::-ms-expand {
    display: none;
  }
  /* Remove focus outline */
  &:focus {
    outline: none;
  }
  /* <option> colors */
  option {
    color: inherit;
    background-color: var(--option-bg);
  }
}

input {
  background: linear-gradient(to left, var(--arrow-bg) 3em, var(--select-bg) 3em, 60%);
  background-color: var(--prussian-blue);
  cursor: text;
}

.color_container {
  display: flex;
  gap: 1rem;
  width: 100%;
}
.party_logo {
  background-color: grey;
  padding: 1rem;
  width: 20vh;
  height: 20vh;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.35vw;
  font-weight: bold;
  border-radius: .4rem;
  transition: 1s;
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
</style>
