<template>
    <div class="progress-bar">
        <progress :percent="percent" color="#EA5A49" active="true"/>
        <p>{{year}}年已经过去了{{days}}天，{{percent}}%</p>
    </div>
</template>
<script>
export default {
    methods: {
        // 判断是否为闰年
        isLeapYear () {
            const year = new Date().getFullYear()
            if (year % 400 === 0) { // 世纪闰年 能被400整除
                return true
            } else if (year % 4 === 0 && year % 100 !== 0) { // 普通闰年能被4整除，但是不能被100 整除
                return true
            } else {
                return false
            }
        },
        // 一年有多少天
        getDayOfYear () {
            return this.isLeapYear ? 366 : 365
        }
    },
    computed: {
        year () {
            return new Date().getFullYear()
        },
        days () {
            let start = new Date()
            // 将开始日期设置为今年的1月1日
            start.setMonth(0)
            start.setDate(1)
            let offset = new Date().getTime() - start.getTime()
            return parseInt(offset / 1000 / 60 / 60 / 24) + 1
        },
        percent () {
            return (this.days * 100 / this.getDayOfYear()).toFixed(1)
        }
    }
}
</script>
<style lang="scss">
.progress-bar{
    width: 100%;
    margin-top:10px;
    margin-bottom:40px;
    text-align:center;
    progress{
        margin-bottom:10px;
    }
}
</style>
