
<script>
    export default {
        data() {
            return {
                
            };
        },
        props: {
            vote: {
                type: String,
                default: "abstention",
            },
        },
        methods: {
            changeVote(vote) {
                this.$emit("change-vote", vote);
            },
        },
        computed: {
            getFormattedVote() {
                if (this.vote == "abstention") {
                    return "Abstencion";
                } else if (this.vote == "for") {
                    return "A Favor";
                } else if (this.vote == "against") {
                    return "En Contra";
                }
            },

        },
    };
</script>

<template>
    <div class="vote_container_c">
        <div class="your_vote">Tu voto: {{getFormattedVote}}</div>
        <div class="vote_container">
            <div class="vote_button vote_for" @click="changeVote('for')">A Favor</div>
            <div class="vote_button vote_none" @click="changeVote('abstention')">Abstencion</div>
            <div class="vote_button vote_against" @click="changeVote('against')">En Contra</div>
        </div>
    </div>
</template>

<style scoped>
.vote_container_c {
    position: fixed;
    border: 1px solid black;
    border-radius: .8rem .8rem 0 0;
    border-bottom: 0;
    bottom: 0;
    left:  40vw;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: .6rem;
}

.vote_container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    gap: .6rem;
}

.your_vote {
    padding: 1rem;
    width: 100%;
    background-color: var(--prussian-blue);
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    border-radius: .6rem;
}

.vote_button {
    padding: 1.2rem;
    background-color: var(--prussian-blue);
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    color: white;
    font-weight: bold;
    transition: .4s;
    border-radius: .8rem;
}

.vote_button:hover {
    background-color: var(--cerulean);
}
.vote_button:active {
    background-color: black;
}

.vote_for {
    background-color: green;
}

.vote_against {
    background-color: darkred;
}

</style>