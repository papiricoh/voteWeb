
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
    <div class="loader">
        
    </div>
</template>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
    width: 60px;
    aspect-ratio: 1;
    display: flex;
}
.loader::before,
.loader::after {
    content:"";
    flex:1;
    animation: l14 1.5s -.25s infinite linear alternate both;
}
.loader::after {
    --s:-1,-1;
    animation-delay: .5s;
}
@keyframes l14 {
    0%,
    30%  {transform:scale(var(--s,1)) translate(0px)   perspective(150px) rotateY(0deg) rotateZ(180deg);
            clip-path:polygon(50% 0,100% 0,100% 100%,50% 100%,0 75%,0 25%);
            background:#fa0000;}
    37.5%{transform:scale(var(--s,1)) translate(-20px) perspective(150px) rotateX(0deg) rotateZ(120deg);
            clip-path:polygon(50% 0,100% 0,100% 100%,50% 100%,0 75%,0 25%);
            background:#FA6900;}
    50%  {transform:scale(var(--s,1)) translate(-20px) perspective(150px) rotateX(-90deg) rotateZ(100deg);
            clip-path:polygon(50% 0,100% 0,100% 100%,50% 100%,0 75%,0 25%);
            background:#FA6900;
            border-radius: 0}
    50.01%{transform:scale(var(--s,1)) translate(-20px) perspective(150px) rotateX(-90.1deg) rotateZ(90deg);
            clip-path:polygon(0 0,100% 0,100% 100%,50% 100%,0 100%,0 25%);
            background:#2FB8AC;
            border-radius: 100px 0 0 100px}
    62.5%{transform:scale(var(--s,1)) translate(-20px) perspective(150px) rotateX(-180deg) rotateZ(60deg);
            clip-path:polygon(0 0,100% 0,100% 100%,50% 100%,0 100%,0 25%);
            background:#2FB8AC;
            border-radius: 100px 0 0 100px}
    70%,
    100%{transform:scale(var(--s,1)) translate(0px)   perspective(150px) rotateX(-180deg) rotateZ(0deg);
            clip-path:polygon(0 0,100% 0,100% 100%,50% 100%,0 100%,0 25%);
            background:#2f3ab8;
            border-radius: 100px 0 0 100px;}
}

</style>