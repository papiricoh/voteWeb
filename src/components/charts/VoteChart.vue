
<script>
    export default {
        data() {
            return {
                
            };
        },
        props: {
            total: {
                type: Number,
                required: true,
            },
            favour: {
                type: Number,
                required: true,
            },
            against: {
                type: Number,
                required: true,
            },
        },
        watch: {
            
        },
        computed: {
            favourPercentage() {
                return (this.favour / this.total) * 100;
            },
            againstPercentage() {
                return (this.against / this.total) * 100;
            },
            favourSimplePercentage() {
                return (this.favour / (this.favour + this.against)) * 100;
            },
            againstSimplePercentage() {
                return (this.against / (this.favour + this.against)) * 100;
            }
        },
    };
</script>

<template>
    <div class="v_cont">
        <div class="vote_container">
            <div class="favour_votes" :style="'width: ' + favourPercentage + '%;'"></div>
            <div class="against_votes" :style="'width: ' + againstPercentage + '%;'"></div>
        </div>
        <div class="vote_container">
            <div class="favour_votes" :style="'width: ' + favourSimplePercentage + '%;'"></div>
            <div class="against_votes" :style="'width: ' + againstSimplePercentage + '%;'"></div>
        </div>
        <div class="vote_data_c">
            <span>{{ favour }}</span>

            <span>{{ against }}</span>
        </div>
    </div>
</template>

<style scoped>
.v_cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .6rem;
    width: 100%;
}

.vote_container {
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    background-color: rgba(128, 128, 128, 0.302);
    height: 1.4rem;
    width: 80%;
    color: var(--white);
}

.favour_votes {
    background-color: green;
    height: 100%;
    width: 50%;
    transition: .4s;
}
.against_votes {
    background-color: darkred;
    height: 100%;
    width: 50%;
    transition: .4s;
}
.vote_data_c {
    display: flex;
    justify-content: space-between;
    width: 80%;
    font-size: .8rem;
    font-weight: bold;
}

.vote_data_c span:first-child {
    color: green;
}

.vote_data_c span:last-child {
    color: darkred;
}
</style>