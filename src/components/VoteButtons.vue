
<script>
    export default {
        data() {
            return {
                
            };
        },
        computed: {

        },
    };
</script>

<template>
    <div class="vote_container">
        <div class="vote_button vote_for">A Favor</div>
        <div class="vote_button vote_none">Abstencion</div>
        <div class="vote_button vote_against">En Contra</div>
    </div>
</template>

<style scoped>
.vote_container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    gap: .6rem;
    border: 1px solid black;
    border-radius: .8rem .8rem 0 0;
    padding: 1.2rem;
    border-bottom: 0;
    position: fixed;
    bottom: 0;
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