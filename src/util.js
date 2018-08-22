// 工具函数库

import config from './config'

export function get (url) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.host + url,
            success: function (res) {
                console.log('util', res)
                if (Number(res.data.code) === 0) {
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }
        })
    })
}
