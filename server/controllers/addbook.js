const https = require('https')
const debug = require('debug')('koa-weapp-demo')
// 新增图书
// 1.获取豆瓣图书信息
// GET  https://api.douban.com/v2/book/isbn/:name
// 2.入库

module.exports = async (ctx) => {
    const {isbn, openId} = ctx.request.body
    console.log('ccccccccccccccccccccccccccccc', isbn, openId)
    if (isbn && openId) {
        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        debug(url)
        const bookinfo = await getJSON(url)
        debug('typeof', typeof bookinfo)
        debug('instanceof', bookinfo instanceof Object)
        const rate = bookinfo.rating.average
        const { title, image, publisher, alt, author_intro, summary, price } = bookinfo
        const tags = bookinfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',')
        return { rate, title, author, image, publisher, alt, author_intro, summary, price, tags }
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                // debug('hello data', JSON.parse(data))
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
