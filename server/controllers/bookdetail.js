const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const { id } = ctx.request.query
    const info = await mysql('books').select('*').where('id', id).increment('count', 1)
    console.log(info)
    // ctx.state.data = {
    //     info
    // }
}
