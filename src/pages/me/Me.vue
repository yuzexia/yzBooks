<template>
    <div class="container">
        <button class="login-button" open-type="getUserInfo" v-if="!userInfo.avatarUrl" @getuserinfo="onGotUserInfo">点击登陆</button>
        <!-- {{userInfo.nickName}}
        {{userInfo.avatarUrl}}
        {{userInfo.openId}} -->
        <div class="userinfo" v-if="userInfo.avatarUrl">
            <img :src="userInfo.avatarUrl" alt="">
            <p>{{userInfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>

        <button class="btn" @click="scanBook" v-if="userInfo.avatarUrl">添加图书</button>
        {{userInfo.avatarUrl}}
        {{userInfo.openId}}
        <!-- {{resBookObj}} -->
    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import { showSuccess, post, showModal } from '@/util'
import YearProgress from '@/components/YearProgress'
export default {
    data () {
        return {
            userInfo: {
                /* nickName: '未登录',
                avatarUrl: '../../../static/img/defaultAvatar.png', */
                openId: ''
            }
        }
    },
    components: {
        YearProgress
    },
    created () {
        this.userInfo = wx.getStorageSync('userInfo')
    },
    methods: {
        onGotUserInfo: function (e) {
            console.log(e)
            if (e.mp.detail.userInfo) {
                qcloud.setLoginUrl(config.loginUrl)
                qcloud.login({
                    success: (userInfo) => {
                        console.log(userInfo)
                        qcloud.request({
                            url: config.userUrl,
                            login: true,
                            success: (userRes) => {
                                console.log(userRes)
                                this.userInfo = userRes.data.data
                                wx.setStorageSync('userInfo', userRes.data.data)
                            }
                        })
                    }
                })
                showSuccess('登陆成功', 'success')
            } else {
                showSuccess('登陆失败', 'none')
            }
        },
        // 扫描图书
        scanBook () {
            wx.scanCode({
                success: (res) => {
                    console.log(res)
                    this.resBookObj = res.result
                    this.addBook(res.result)
                }
            })
        },
        async addBook (isbn) {
            const res = await post('/weapp/addbook', {
                isbn,
                openid: this.userInfo.openId
            })
            console.log(res)
            if (Number(res.code) === 0 && res.data.title) {
                showModal('添加成功', `${res.data.title}添加成功`)
            } else {
                showModal('添加失败', res.data.msg)
            }
        }
    }
}
</script>

<style lang="scss">
.container{
    padding: 0 30px;
    text-align:center;
    .login-button{
        display:inline-block;
        width:50%;
        margin:30px 0;
    }
    .userinfo{
        margin-top:100rpx;
        text-align:center;
        img{
            width:150rpx;
            height:150rpx;
            margin:20px;
            border-radius:50%;
            border: 1px solid #c0c3c9;
        }
    }
    .btn{
        margin:20rpx 0;
        padding-left:15px;
        padding-right:15px;
        color:#fff;
        background:#EA5A49;
        width:100%;
        height:40px;
        line-height:40px;
        font-size:16px;
        border-radius:2px;
        &:active{
            background: #FA5A49;
        }
    }
}
</style>
