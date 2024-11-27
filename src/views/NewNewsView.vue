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
          perms: 10
        },
        isJournalist: true,
        isPartyLeader: false,
        isGovernmentMenber: false,

        selectedAuthor: 'selected'
        
      };
    },
    methods: {
      
    },
    computed: {
      canSubmit() {
        if (this.selectedAuthor == 'selected') return false;
        return true;
      }
    }
  };
</script>

<template>
  <main>
    <h1>Nueva Noticia</h1>
    <label for="title">Titulo</label>
    <input type="text" id="title" name="title" placeholder="Titulo de la noticia">
    <label for="subtitle">Subtitulo</label>
    <input type="text" id="subtitle" name="subtitle" placeholder="Subtitulo de la noticia">
    <label for="content">Contenido</label>
    <textarea id="content" name="content" placeholder="Contenido de la noticia"></textarea>
    <div class="nn_author">
      <label for="author">Publicar como:</label>
      <select v-model="selectedAuthor" id="author" name="author">
        <option disabled value="selected">Seleciona autor</option>
        <option :disabled="isJournalist" value="me">Yo (Como Periodista)</option>
        <option :disabled="isPartyLeader" value="partyLeader">Lider de partido (Comunicado de partido)</option>
        <option :disabled="isGovernmentMenber" value="governmentMenber">Miembro de Gobierno (Nota de prensa)</option>
        <option v-if="user.perms >= 10" value="admin">Comunicado de Administrador (OOC)</option>
      </select>
    </div>
    <button v-if="canSubmit" type="submit">Publicar</button>
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
