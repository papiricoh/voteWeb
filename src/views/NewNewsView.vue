<script setup>


</script>

<script>
  export default {
    data() {
      return {
        isJournalist: true,
        nameJournalist: 'Periodista Anonimo',
        isPartyLeader: false,
        nameParty: 'Partido Independiente',
        isGovernmentMenber: false,
        nameGovernment: 'Gobierno de la Nacion',

        newTitle: '',
        newSubtitle: '',
        newContent: '',
        selectedAuthor: 'selected'
        

      };
    },
    async mounted() {
      
    },
    methods: {
      async getSelectedAuthor() {
        if (this.selectedAuthor == 'me') return this.nameJournalist;
        if (this.selectedAuthor == 'partyLeader') return this.nameParty;
        if (this.selectedAuthor == 'governmentMenber') return this.nameGovernment;
        if (this.selectedAuthor == 'admin') return 'Admin';
      },
      async fetchParties() {
        const postBody = {
          title: this.newTitle,
          subtitle: this.newSubtitle,
          content: this.newContent,
          author: await this.getSelectedAuthor(),
          type: 'normal'
        }
        await fetch(`${this.$store.getters.getBaseURL}/news/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(await this.$store.getters.getUser.id + ':' + await this.$store.getters.getUser.token)
          },
          body: JSON.stringify(postBody)
        }).then(response => response.json()).then(data => {
          if (data.error) {
            
            return;
          }

          this.$router.push('/news');
        })
      }
    },
    computed: {
      canSubmit() {
        if (this.selectedAuthor == 'selected') return false;
        return true;
      },
    }
  };
</script>

<template>
  <main>
    <h1>Nueva Noticia</h1>
    <label for="title">Titulo</label>
    <input v-model="newTitle" type="text" id="title" name="title" placeholder="Titulo de la noticia" maxlength="50">
    <label for="subtitle">Subtitulo</label>
    <input v-model="newSubtitle" type="text" id="subtitle" name="subtitle" placeholder="Subtitulo de la noticia" maxlength="120">
    <label for="content">Contenido</label>
    <textarea v-model="newContent" id="content" name="content" placeholder="Contenido de la noticia"></textarea>
    <div class="nn_author">
      <label for="author">Publicar como:</label>
      <select v-model="selectedAuthor" id="author" name="author">
        <option disabled value="selected">Seleciona autor</option>
        <option :disabled="!isJournalist" value="me">Yo (Como Periodista)</option>
        <option :disabled="!isPartyLeader" value="partyLeader">Lider de partido (Comunicado de partido)</option>
        <option :disabled="!isGovernmentMenber" value="governmentMenber">Miembro de Gobierno (Nota de prensa)</option>
        <option v-if="$store.getters.getUser && $store.getters.getUser.perms >= 10" value="admin">Comunicado de Administrador (OOC)</option>
      </select>
    </div>
    <button v-if="canSubmit" type="submit" @click="fetchParties()">Publicar</button>
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

label {
  font-weight: bold;
  font-size: 1.4rem;
}

input, textarea {
  padding: .6rem;
  font-size: 1.2rem;
  border: 1px solid #333;
  border-radius: .4rem;
  font-family: Escrow Condensed, Times New Roman, serif;
  resize: vertical;
}

button {
  padding: .6rem;
  font-size: 1.2rem;
  border: 1px solid #333;
  border-radius: .4rem;
  background-color: var(--prussian-blue);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: .4s;
}

button:hover {
  background-color: var(--cerulean);
}

.nn_author {
  display: flex;
  gap: 1rem;
  align-items: center;
}

select {
  /* Reset */
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  /* Personalize */
  width: 24rem;
  padding: 1rem 4rem 1rem 1rem;
  background: var(--arrow-icon) no-repeat right 0.8em center / 1.4em,
    linear-gradient(to left, var(--arrow-bg) 3em, var(--select-bg) 3em);
  background-color: var(--prussian-blue);
  color: white;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-weight: bold;
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

</style>
