<script>
// import qcloud from 'wafer2-client-sdk'
import {get} from './util'
// import config from './config'
export default{
    async created () {
        // 设置登录地址
        // qcloud.setLoginUrl(config.loginUrl)
        // qcloud.login({
        //     success: function (userInfo) {
        //         console.log('登录成功', userInfo)
        //     },
        //     fail: function (err) {
        //         console.log('登录失败', err)
        //     }
        // })
        const res = await get('/weapp/demo')
        console.log('123', res)
        /* wx.request({
            url: config.host + '/weapp/demo',
            success: function(res) {
                console.log(res)
            }
        }) */
    }
}
</script>

<style>

</style>
<style lang="scss">
.primary-color{
    color:#EA5149;
}
.footer-text{
    padding:20px 0;
    text-align:center;
    font-size:12px;
}
</style>

