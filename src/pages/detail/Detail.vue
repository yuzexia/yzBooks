<template>
    <div class="detail">
        <!-- 图书id: {{bookid}} -->
        <BookInfo :info="info"></BookInfo>

        <div class="comment">
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
            <button class="">评论</button>
        </div>
    </div>
</template>
<script>
import {get} from '@/util'
import BookInfo from '@/components/BookInfo'
export default {
    data () {
        return {
            bookid: '',
            info: {},
            comment: '',
            location: '',
            phone: ''
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
        }
    }
}
</script>
<style lang="scss">
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
}
</style>
