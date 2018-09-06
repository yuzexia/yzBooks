<template>
    <div class="detail">
        <!-- 图书id: {{bookid}} -->
        <BookInfo :info="info"></BookInfo>
        <CommentList :comments="comments"></CommentList>
        <div class="comment" v-if="showAdd">
            <textarea v-model="comment"
                      class="textarea"
                      :maxlength="100"
                      placeholder="请输入图书短评...">
            </textarea>
            <div class="location">
                地理位置：
                <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
                <span class="primary-color">{{location}}</span>
            </div>
            <div class="phone">
                手机型号：
                <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
                <span class="primary-color">{{phone}}</span>
            </div>
            <button class="comment-btn" @click="addComment">评论</button>
        </div>
        <div v-else class="footer-text">
            未登陆或者已经评论过啦
        </div>
        <button class="share-btn" open-type="share">转发给好友</button>
    </div>
</template>
<script>
import {get, post, showModal, showSuccess} from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
    data () {
        return {
            bookid: '',
            info: {},
            comment: '',
            location: '',
            phone: '',
            userinfo: {},
            comments: []
        }
    },
    computed: {
        // 判断是否显示评论模块
        // 1，未登录 2，已登录，已评论
        showAdd () {
            console.log(this.userinfo)
            if (!this.userinfo.openId) {
                return false
            }
            if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
                return false
            }
            return true
        }
    },
    components: {
        BookInfo,
        CommentList
    },
    mounted () {
        this.bookid = this.$root.$mp.query.id
        this.getDetail()
        this.getComments()
        const userinfo = wx.getStorageSync('userInfo')
        if (userinfo) {
            this.userinfo = userinfo
        }
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
        },
        // 获取手机型号
        getPhone (e) {
            if (e.target.value) {
                const system = wx.getSystemInfoSync()
                this.phone = system.model
            } else {
                this.phone = ''
            }
        },
        // 获取地理位置
        getGeo (e) {
            const ak = 'YHrsGhvKl5yY5xl8VWogCQkOtBBmct8n'
            const url = 'http://api.map.baidu.com/geocoder/v2/'
            // http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=您的ak
            // http://api.map.baidu.com/geocoder/v2/
            console.log('获取地理位置')
            if (e.target.value) {
                wx.getLocation({
                    success: (geo) => {
                        console.log(geo)
                        wx.request({
                            url,
                            data: {
                                ak,
                                location: `${geo.latitude},${geo.longitude}`,
                                output: 'json'
                            },
                            success: (res) => {
                                console.log(res)
                                if (Number(res.data.status) === 0) {
                                    this.location = res.data.result.addressComponent.city
                                } else {
                                    this.location = '未知地点'
                                }
                            }
                        })
                    }
                })
            } else {
                this.location = ''
            }
        },
        // 发表评论
        async addComment () {
            // 评论内容 手机型号 地理位置 图书id 用户openid
            const data = {
                openid: this.userinfo.openId,
                bookid: this.bookid,
                comment: this.comment,
                phone: this.phone,
                location: this.location
            }
            console.log(data)
            try {
                const response = await post('/weapp/addcomment', data)
                console.log(response)
                this.comment = ''
                this.getComments()
                showSuccess(response.data.msg, 'success')
            } catch (error) {
                showModal('失败', error.msg)
            }
        },
        // 获取评论列表
        async getComments () {
            const response = await get('/weapp/commentlist', {bookid: this.bookid})
            console.log(response)
            this.comments = response.data.list || []
        }
    }
}
</script>
<style lang="scss">
.detail{

.comment{
    margin-top:10px;
    padding:0 15rpx;
    .textarea{
        width:700rpx;
        height:200rpx;
        background: #eee;
        padding: 10rpx;
        font-size:14px;
    }
    .location,
    .phone{
        margin-top:10rpx;
    }
    .comment-btn{
        margin-top:20px;
        background:#EA5A49;
        color:#fff;
    }
}
.share-btn{
    margin-top:20px;
    background:#EA5A49;
    color:#fff;
    }
}
</style>
