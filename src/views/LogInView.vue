<script setup>
import Cookies from 'js-cookie';

</script>

<script>
  export default {
    data() {
      return {
        loginMode: true,

        //Login
        usename: '',
        password: '',

        //Register
        registerUsername: '',
        registerPassword: '',
        email: '',
        first_name: '',
        last_name: '',

      };
    },
    methods: {
      async logIn() {
        const postData = {
          username: this.usename,
          password: this.password
        };
        await fetch(`${this.$store.getters.getBaseURL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }).then(response => response.json())
          .then(data => {
            console.log(data);
            if(data.error){
              this.$router.push('/login');
              return;
            }
            this.$store.dispatch('setUserAction', data);
            this.user = this.$store.getters.getUser;

            Cookies.set('authUser', data.username, { expires: 100, path: '' });
            Cookies.set('authToken', data.token, { expires: 100, path: '' });
            this.$router.push('/');
          })
          .catch((error) => {
            console.error('Error:', error);
            this.$router.push('/login');
          });
      },
      async register() {
        const postData = {
          username: this.registerUsername,
          email: this.email,
          password: this.registerPassword,
          first_name: this.first_name,
          last_name: this.last_name
        };
        await fetch(`${this.$store.getters.getBaseURL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }).then(response => response.json())
          .then(data => {
            this.loginMode = true;
          })
          .catch((error) => {
            console.error('Error:', error);
            this.$router.push('/login');
          });
      }
    },
  };
</script>

<template>
  <main>
    <div v-if="loginMode" class="login_c">
      <div class="login_header">
        <div class="login_title">VoteWeb</div>
        <input v-model="usename" type="text" placeholder="Usuario">
        <input v-model="password" type="password" placeholder="Contraseña">
        <button @click="logIn()">LogIn</button>
      </div>
      <button class="register_button" @click="loginMode = false">Registrarse</button>

    </div>
    <div v-else class="login_c">
      <div class="login_header">
        <div class="login_title">VoteWeb</div>
        <input v-model="registerUsername" type="text" placeholder="Usuario">
        <input v-model="email" type="email" placeholder="pepe@myuax.com">
        <input v-model="first_name" type="text" placeholder="Nombre">
        <input v-model="last_name" type="text" placeholder="Apellidos">
        <input v-model="registerPassword" type="password" placeholder="Contraseña">
        <button @click="register">Registrarse</button>
      </div>
      <button class="register_button" @click="loginMode = true">Acceder</button>

    </div>

  </main>
</template>

<style scoped>
main {
  position: fixed;
  top: 0;
  z-index: 1;
  left: 0;
  background-color: var(--rich-black);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0vw !important;
}

.login_c {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  background-color: var(--prussian-blue);
  border-radius: 1rem;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .2);
  width: 30vw;
  min-height: 50vh;

}

.login_header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input {
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  background: #e8e8e8;
  box-shadow: inset 20px 20px 60px #c5c5c5, 
  inset -20px -20px 60px #ffffff;
  transition: 0.3s;
  font-size: 1.05rem;
}

input:focus {
  outline-color: #e8e8e8;
  background: #e8e8e8;
  box-shadow: inset 20px 20px 60px #c5c5c5, 
  inset -20px -20px 60px #ffffff;
  transition: 0.3s;
}

button {
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--white);
  color: var(--rich-black);
  box-shadow: inset 20px 20px 60px #c5c5c5, 
  inset -20px -20px 60px #ffffff;
  cursor: pointer;
  transition: .4s;
  width: 80%;
  align-self: center;
}
button:hover {
  transform: scale(1.05);
}
button:active {
  transform: scale(.95);
}

.login_title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: var(--white);
  margin-bottom: 2rem;
}

.register_button {
  width: 30%;
  margin-top: 8rem;
}

</style>
