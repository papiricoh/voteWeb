<script setup>
import IdeologyMeter from '@/components/IdeologyMeter.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
</script>

<script>
  export default {
    data() {
      return {
        loading: false,
        
        mails: [
          {
            id: 1,
            subject: 'Subject 1',
            sender: 'John Doe',
            content: 'Content 1, dhwaihdiwahfihawihfiawhfawgiofg\nawoiugfoawgifgawigfioawigfgae\nuhfuagjfgasgfljgasjfgljsagfljasg\njfgajsgfjagsjfglajsgfjg',
            date: '2021-10-10',
            state: 'unread',
          },
        ],

        currentMail: null,
      };
    },
    async mounted() {
      this.intervalId = await setInterval(async () => {
        if (this.$store.getters.getUser) {
          clearInterval(this.intervalId);
          // await this.fetchParties();
        }
      }, 20);
    },
    methods: {
      async fetchParties() {
        await fetch(`${this.$store.getters.getBaseURL}/parties`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(await this.$store.getters.getUser.id + ':' + await this.$store.getters.getUser.token)
          },
          body: null
        }).then(response => response.json()).then(async data => {
          if (data.error) {
            
            return;
          }
          await this.fetchUser();
          var newParties = [];
          for (let party of data) {
            if (party.id === this.$store.getters.getUser.party.id && party.label !== 'IND') {
              this.own_party = party;
            }else {
              newParties.push(party);
            }
          }
          this.parties = newParties;
          this.loading = false;

        })
      },
      
      
    },
    
  };
</script>

<template>
  <main>
    <LoadingComponent class="loading" v-if="loading"></LoadingComponent>
    <div v-else class="mail_container">
      <div class="mail_list">
        <div class="search_bar_c">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          <input class="search_bar" placeholder="Buscar correo"></input>
        </div>
        <hr>
        <div v-for="mail in mails" class="mail_resume" :style="mail.state == 'read' ? 'color: rgba(0,0,0, 0.65)' : ''" @click="currentMail = mail">
          <div class="mail_subject">{{mail.subject}}</div>
          <div>{{mail.sender}}</div>
          <div class="mail_resume_footer">
            <div>{{mail.date}}</div>
            <div v-if="mail.state == 'read'"><font-awesome-icon :icon="['fas', 'envelope-open']" size="xl"/></div>
            <div v-else><font-awesome-icon :icon="['fas', 'envelope']" size="xl"/></div>
          </div>
        </div>
      </div>
      <div class="mail_content">      
        <div v-if="currentMail">
          <div class="mail_content_subject">{{currentMail.subject}}</div>
          <div>{{currentMail.content}}</div>
        </div>
        <div v-else class="mail_content_empty">
          <div>Selecciona un correo</div>
          <font-awesome-icon :icon="['fas', 'envelope-open']" size="xl"/>

        </div>

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
}

.mail_container {
  display: grid;
  grid-template-columns: 1fr 4fr;
}

.mail_list {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: scroll;
  height: 96vh;
}

.search_bar_c {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
}

.search_bar {
  border: none;
  background-color: transparent;
  width: 90%;
  border-bottom: var(--picton-blue);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(128, 128, 128, 0.461);
}

.search_bar:focus-visible {
  outline: none;
  border-bottom: 1px solid var(--rich-black);
}

hr {
  margin: 0;
}

.mail_resume {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(128, 128, 128, 0.461);
  cursor: pointer;
  transition: .4s;
}

.mail_resume:hover {
  background-color: rgba(128, 128, 128, 0.1);
}

.mail_resume:active {
  background-color: rgba(128, 128, 128, 0);
}

.mail_container:last-child {
  border-bottom: none;
}

.mail_resume_footer {
  display: flex;
  justify-content: space-between;
}

.mail_subject {
  font-weight: bold;
  text-transform: uppercase;
}
.mail_content {
  box-sizing: border-box;
  padding: 0 .6rem;
  overflow-y: scroll;
  height: 96vh;
}

.mail_content_empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: bolder;
  height: 90vh;
}

.mail_content_subject {
  font-weight: bold;
  text-transform: uppercase;
}

</style>
