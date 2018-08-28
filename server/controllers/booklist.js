const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {page, size = 10} = ctx.request.query
    const books = await mysql('books')
                                    .select('books.*', 'csessioninfo.user_info')
                                    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
                                    .limit(size)
                                    .offset(Number(page) * 10)
                                    .orderBy('books.id', 'desc')
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
