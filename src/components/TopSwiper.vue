<template>
    <div class="swiper">
        <swiper :indicator-dots="true"
                indicator-color="#EA5149"
                :autoplay="true"
                :interval="6000"
                :duration="1000"
                :circular="true"
                >
            <div v-for="(top, imgIndex) in imageUrls" :key="imgIndex">
                <swiper-item>
                    <img @click="bookDetail(img)" class="slide-image" v-for="img in top" :key="img.id" :src="img.image" mode="aspectFit" alt="">
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>

<script>
export default {
    props: {
        tops: {
            type: Array,
            default: []
        }
    },
    computed: {
        imageUrls () {
            return [this.tops.slice(0, 3), this.tops.slice(3, 6), this.tops.slice(6)]
        }
    },
    methods: {
        bookDetail (item) {
            wx.navigateTo({
                url: `/pages/detail/main?id=${item.id}`
            })
        }
    }
}
</script>

<style lang="scss">
.swiper{
    margin: 5px 0;
    .slide-image{
        width:33%;
        height:250rpx;
    }
}
</style>

