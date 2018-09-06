<template>
    <div class="comment-list">
        <div class="comment-title" v-if="comments.length">
            评论
        </div>
        <div class="comment-context" v-for="item in comments" :key="item.id">
            <div class="user">
                <div class="inline">
                    <img :src="item.image" alt="item.title" class="avatar" mode="aspectFit">
                    {{item.title}}
                </div>
                <div class="right">
                    {{item.location || '未知地点'}}
                    <span>--</span>
                    {{item.phone || '未知型号'}}
                </div>
            </div>
            <div class="content">
                {{item.comment}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        comments: {
            type: [Array],
            default: []
        }
    }
}
</script>
<style lang="scss">
.comment-list{
    background:#eee;
    font-size:14px;
    .comment-title{
        padding-left: 20px;
        background:#eee;
        line-height: 40px;
        font-size:14px;
    }
    .comment-context{
        background:#fff;
        margin-bottom:10px;
        padding: 5px 20px;
        .content{
            margin:10px 0;
        }
        .inline{
            display:inline;
        }
        .user{
            .avatar{
                display:inline-block;
                width:20px;
                height:20px;
                border-radius: 50%;
            }
            .right{
                float:right;
            }
        }
    }
}
</style>
