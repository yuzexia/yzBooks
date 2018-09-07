const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {page, size = 10, openid} = ctx.request.query
    console.log(openid)
    const mysqlSelect = mysql('books')
                                    .select('books.*', 'csessioninfo.user_info')
                                    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
                                    .orderBy('books.id', 'desc')
    let books
    if (openid) {
        books = await mysqlSelect.where('openid', openid)
    } else {
        // 全部图书，分页
        books = await mysqlSelect.limit(size).offset(Number(page) * 10)
    }
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
