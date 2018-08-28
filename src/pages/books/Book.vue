<template>
    <div class="books">
        <Card v-for="book in books" :key="book.id" :book="book"></Card>
        <p class="footer-text" v-if="!more">
            没有更多数据了...
        </p>
    </div>
</template>

<script>
import {get} from '@/util'
import Card from '@/components/Card'
export default {
    components: {
        Card
    },
    data () {
        return {
            books: [],
            page: 0,
            more: true
        }
    },
    // computed: {},
    mounted () {
        this.getList(true)
    },
    onPullDownRefresh () {
        this.getList(true)
    },
    onReachBottom () {
        console.log('我触底了。。。')
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
        }
    }
}
</script>

<style>

</style>
