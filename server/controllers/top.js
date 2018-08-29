const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const top = await mysql('books').select('id', 'count', 'image', 'title')
                                    .orderBy('count', 'desc')
                                    .limit(9)

    ctx.state.data = {
        list: top
    }
}
