<template>
    <div class="book-card">
        {{book.title}}
        {{book.isbn}}
        {{book.image}}
        {{book.content}}
    </div>
</template>

<script>
export default {
    props: ['book']
}
</script>

<style lang="scss">

</style>
