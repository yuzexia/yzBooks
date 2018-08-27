<template>
    <div class="rate">
        <span>☆☆☆☆☆</span>
        <div class="solid-rate" :style="style">★★★★★</div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [Number, String],
            default: '0'
        }
    },
    computed: {
        style () {
            // return `width: ${this.value / 2}em`   // 此处我用em有问题
            return `width: ${this.value * 10}%`
        }
    }
}
</script>

<style lang="scss">
.rate{
    display:inline-block;
    position: relative;
    .solid-rate{
        position:absolute;
        display:inline-block;
        top:0;
        left:0;
        width: 0;
        overflow:hidden;
    }
}
</style>
