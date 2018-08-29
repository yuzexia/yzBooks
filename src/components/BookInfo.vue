<template>
    <div class="bookinfo">
        <div class="thumb">
            <img class="back" :src="info.image" mode="aspectFill">
            <img class="img" :src="info.image" mode="aspectFit">
            <div class="info">
                <div class="title">{{info.title}}</div>
                <div class="author">{{info.author}}</div>
            </div>
        </div>
        <div class="detail">
            <img class="avatar" :src="userinfo.image" mode="aspectFit" alt="">
            {{userinfo.name}}
            <div class="right primary-color">
                {{info.rate}}分 <Rate :value="info.rate"></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="tag" v-for="(tag, index) in info.tags" :key="index">{{tag}}</div>
        </div>
        <div class="summary">
            <p class="summ-text" v-for="(text, index) in info.summary" :key="index">
                {{text}}
            </p>
        </div>
    </div>
</template>
<script>
import Rate from '@/components/Rate'
export default {
    components: {
        Rate
    },
    props: {
        info: {
            type: [Object],
            default: {}
        }
    },
    computed: {
        userinfo () {
            return this.info.user_info || {}
        }
    }
}
</script>
<style lang="scss">
.bookinfo{
    .right{
        float:right;
    }
    .thumb{
        position: relative;
        width:750rpx;
        height:500rpx;
        overflow:hidden;
        .back{
            filter: blur(15px);
            width:100%;
        }
        .img{
            position:absolute;
            width:100%;
            height: 300rpx;
            left:0;
            top:40rpx;
        }
        .info{
            color:white;
            position: absolute;
            width:100%;
            left:0;
            top:350rpx;
            text-align: center;
            .author{
                font-size:14px;
            }
            .title{
                font-size:20px;
            }
        }
    }
    .detail{
        font-size:14px;
        padding: 5px 10px;
        .avatar{
            width:20px;
            height:20px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
    .tag{
        display:inline-block;
        margin:5px;
        padding:5px;
        border-radius: 5px;
        border:1px #EA5A49 solid;
        color:#EA5A49;
    }
    .summary{
        margin-top:10px;
        padding: 0 15px;
        p{
            text-indent: 2em;
            font-size:14px;
        }
    }
}
</style>

