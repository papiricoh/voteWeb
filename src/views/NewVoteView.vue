<script setup>

</script>

<script>
  export default {
    data() {
      return {
          sessionType: "select",

          //Laws
          selectedLaw: "select",

          //Rules
          selectedRule: "select",
          ruleValue: null,



          exampleLaws: [
            {
              id: 1,
              name: "Ley de la gravedad",
            }
          ]
      };
    },
    methods: {
      isNumber(value) {
        return !isNaN(value);
      }
    },
    computed: {
      canPropose() {
        if (this.sessionType == "select") return false;
        if (this.sessionType == "law") {
          if (this.selectedLaw == "select") return false;
          return true;
        }
        if (this.sessionType == "ruleChange") {
          if (this.selectedRule == "select") return false;
          if (this.ruleValue == null || this.ruleValue == 0 || !this.isNumber(this.ruleValue)) return false;
          return true;
        }
        if (this.sessionType == "control") return true;
        return false;
      }
    },
  };
</script>

<template>
  <main>
    <h1 style="align-self: flex-start;">Proponer sesion</h1>
    <div class="session_section">
      <label>Tipo de sesion:</label>
      <select v-model="sessionType">
        <option disabled value="select">Selecciona el tipo</option>
        <option value="control">Sesion de control (Sin voto)</option>
        <option value="law">Propuesta de ley</option>
        <option value="ruleChange">Cambio de reglas constitucionales</option>
        <option disabled value="impeachment">Mocion de censura</option>
        <option disabled value="addMember">Investidura de cargo politico</option>
        <option disabled value="fireMember">Cesion de cargo politico</option>
        <option disabled value="addJudge">Nombramiento de juez</option>
        <option disabled value="fireJudge">Cesion de juez</option>
      </select>
    </div>
    <div v-if="sessionType == 'law'" class="session_section">
      <label>Ley a votar:</label>
      <select v-model="selectedLaw">
        <option disabled value="select">Selecciona la ley</option>
        <option v-for="law in exampleLaws" :value="law.id">{{law.name}}</option>
      </select>
    </div>
    <div v-if="sessionType == 'ruleChange'" class="session_section">
      <label>Regla a cambiar:</label>
      <select v-model="selectedRule">
        <option disabled value="select">Selecciona la regla</option>
        <option value="points">Puntos ganados a la semana</option>
      </select>
      <input v-model="ruleValue" type="text" placeholder="Valor numerico (10?)">
    </div>
    
    
    <div v-if="canPropose" class="propose_session" @click="$router.push('/vote')">Proponer Sesion</div>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 16vw;
}
.propose_session {
  padding: 1rem;
  background-color: var(--prussian-blue);
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: .4rem;
  transition: .4s;
  width: 100%;
  box-sizing: border-box;
  font-weight: bold;
}

.propose_session:hover {
  background-color: var(--cerulean);
}
.session_section {
  display: grid;
  gap: 1rem;
  align-items: center;
}
.session_section > label {
  font-size: 1.25rem;
  font-weight: bold;
}

/* <select> styles */
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

</style>
