<template>
    <div class="detail">
        <!-- 图书id: {{bookid}} -->
        <BookInfo :info="info"></BookInfo>
    </div>
</template>
<script>
import {get} from '@/util'
import BookInfo from '@/components/BookInfo'
export default {
    data () {
        return {
            bookid: '',
            info: {}
        }
    },
    components: {
        BookInfo
    },
    mounted () {
        this.bookid = this.$root.$mp.query.id
        this.getDetail()
    },
    // 转发微信小程序
    onShareAppMessage: function () {
        return {
            title: `${this.info.title}`,
            path: `/pages/detail/main?id=${this.bookid}`
        }
    },
    methods: {
        async getDetail () {
            const detail = await get('/weapp/bookdetail', {id: this.bookid})
            this.info = detail.data
            wx.setNavigationBarTitle({
                title: this.info.title
            })
        }
    }
}
</script>
<style>

</style>
