<template>
    <div class="books">
        <TopSwiper :tops="tops"></TopSwiper>
        <Card v-for="book in books" :key="book.id" :book="book"></Card>
        <p class="footer-text" v-if="!more">
            没有更多数据了...
        </p>
    </div>
</template>

<script>
import {get} from '@/util'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default {
    components: {
        Card,
        TopSwiper
    },
    data () {
        return {
            books: [],
            page: 0,
            more: true,
            tops: []
        }
    },
    // computed: {},
    mounted () {
        this.getList(true)
        this.getTop()
    },
    onPullDownRefresh () {
        this.getList(true)
        this.getTop()
    },
    onReachBottom () {
        if (!this.more) {
            return false
        }
        this.page = this.page + 1
        this.getList()
    },
    methods: {
        async getList (init) {
            if (init) {
                this.page = 0
                this.more = true
            }
            wx.showNavigationBarLoading()
            const books = await get('/weapp/booklist', {page: this.page})
            console.log(books)
            if (books.data.list.length < 10 && this.page > 0) {
                this.more = false
            }
            if (init) {
                this.books = books.data.list
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh()
            } else {
                this.books = this.books.concat(books.data.list)
            }
        },
        // 获取访问量排行榜
        async getTop () {
            const tops = await get('/weapp/top')
            this.tops = tops.data.list
            console.log(this.tops)
        }
    }
}
</script>

<style>

</style>
