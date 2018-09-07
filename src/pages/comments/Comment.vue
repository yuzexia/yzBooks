<template>
    <div class="comments">
        <CommentList type="user" v-if="userinfo.openId" :comments="comments"></CommentList>
        <div v-if="userinfo.openId">
            <div class="page-title">我的图书</div>
            <Card v-for="book in books" :key="book.id" :book="book"></Card>
        </div>
        <div class="footer-text" v-if="!books.length">暂时还没有添加过书，快去添加几本吧...</div>
    </div>
</template>

<script>
import {get} from '@/util'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
export default {
    data () {
        return {
            comments: [],
            userinfo: {},
            books: []
        }
    },
    components: {
        CommentList,
        Card
    },
    methods: {
        init () {
            wx.showNavigationBarLoading()
            // 获取个人评论列表
            this.getComments()
            // 获取个人图书列表
            this.getBooks()
            wx.hideNavigationBarLoading()
        },
        // 获取个人发布的图书与评论过的图书
        async getComments () {
            const comments = await get('/weapp/commentlist', {
                openid: this.userinfo.openId
            })
            console.log(comments)
            this.comments = comments.data.list
        },
        // 获取个人图书列表
        async getBooks () {
            const books = await get('/weapp/booklist', {
                openid: this.userinfo.openId
            })
            this.books = books.data.list
            console.log(this.books)
        }
    },
    // 下拉刷新
    onPullDownRefresh () {
        this.init()
        wx.stopPullDownRefresh()
    },
    // 页面显示就触发，mounted只会触发一次
    onShow () {
        if (!this.userinfo.openId) {
            this.userinfo = wx.getStorageSync('userInfo')
        }
        this.init()
    }
}
</script>

<style lang="scss">
.comments{
    .page-title{
        padding-left: 20px;
        background:#eee;
        line-height: 40px;
        font-size:14px;
    }
}

</style>
