const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid, comment, openid, location, phone} = ctx.request.body
    console.log(bookid, comment, openid, location, phone)
}