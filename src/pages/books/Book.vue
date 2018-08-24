<template>
    <div class="books">
        <div v-for="book in books" :key="book.isbn">{{book.title}}</div>
    </div>
</template>

<script>
import {get} from '@/util'
export default {
    data () {
        return {
            books: []
        }
    },
    // computed: {},
    mounted () {
        this.getList()
    },
    methods: {
        async getList () {
            const books = await get('/weapp/booklist')
            this.books = books.data.list
            console.log(books)
        }
    }
}
</script>

<style>

</style>
