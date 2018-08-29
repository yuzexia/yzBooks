<template>
    <div class="detail">
        图书id: {{bookid}}
    </div>
</template>
<script>
import {get} from '@/util'
export default {
    data () {
        return {
            bookid: ''
        }
    },
    mounted () {
        this.bookid = this.$root.$mp.query.id
        console.log(this.bookid)
        this.getDetail()
    },
    methods: {
        async getDetail () {
            const info = await get('/weapp/bookdetail', {id: this.bookid})
            console.log(info)
        }
    }
}
</script>
<style>

</style>
