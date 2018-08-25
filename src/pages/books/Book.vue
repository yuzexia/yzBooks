<template>
    <div class="books">
        <Card v-for="book in books" :key="book.isbn" :book="book"></Card>
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
