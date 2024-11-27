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
        //New Law
        newLawtitle: '',
        newLawDesc: '',
        newLawArticles: [
          {
            id: 1,
            title: '',
            content: ''
          }
        ]
      };
    },
    methods: {
    },
  };
</script>

<template>
  <main>
    <div class="new_law_view">
      <div class="law_r_header">
        <h1>Redactar una nueva ley</h1>
        <div @click="$router.push('/laws')" class="exit_button">Volver</div>
      </div>
      <div class="nl_section">
        <label for="law_title">Titulo</label>
        <input v-model="newLawtitle" type="text" id="law_title" maxlength="50" placeholder="Titulo de la ley">
      </div>
      <div class="nl_section">
        <label for="law_desc">Descripcion</label>
        <textarea v-model="newLawDesc" name="law_desc" id="" maxlength="200" placeholder="Descripcion breve de la ley"></textarea>
      </div>
      <div v-for="article in newLawArticles" class="nl_section">
        <label>Nuevo articulo</label>
        <input type="text" v-model="article.title" :placeholder="'Articulo ' + article.id + ': Articulo muy importante'">
        <textarea name="law_desc" v-model="article.content" id="" rows="8" maxlength="200" placeholder="Contenido de articulo"></textarea>
      </div>
      <div class="nl_footer_buttons">
        <button @click="newLawArticles.push({ id: newLawArticles.length + 1, title: '', content: '' })">Nuevo articulo</button>
        <button>Proponer ley</button>
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
.law_r_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.exit_button {
  height: 2rem;
  background-color: var(--cerulean);
  border-radius: .4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: .4rem 1.2rem;
  font-weight: bold;
  color: white;
}
.new_law_view {
  background-color: white;
  width: 70vw;
  min-height: 70vh;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: .4rem;
  overflow-y: scroll;
}

.nl_section {
  display: flex;
  gap: .6rem;
  flex-direction: column;
}
.nl_section > label {
  font-weight: bold;
  font-size: 1.2rem;
}
.nl_section > input {
  padding: .6rem;
  border-radius: .4rem;
  border: 1px solid var(--prussian-blue);
  font-size: 1.2rem;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  resize: none;
  padding: .6rem;
  border-radius: .4rem;
  border: 1px solid var(--prussian-blue);
  font-size: 1.2rem;
  width: 100%;
  box-sizing: border-box;
}
.nl_footer_buttons {
  display: flex;
  gap: .6rem;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-around;
}
.nl_footer_buttons > button {
  padding: .6rem;
  border-radius: .4rem;
  border: none;
  background-color: var(--prussian-blue);
  color: var(--white);
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: .4s;
  width: 100%;
}
.nl_footer_buttons > button:hover {
  background-color: var(--cerulean);
}
.nl_footer_buttons > button:active {
  background-color: var(--prussian-blue);
}
.nl_footer_buttons > button:nth-child(1) {
  background-color: transparent;
  color: var(--prussian-blue);
  border: 3px solid var(--prussian-blue);
}
</style>
