<template>
    <view class="content">
        <calendar :selected="selected" @getdate="getdate" />
    </view>
</template>

<script>
    import calendar from '../../../components/mehaotian-calendar/mehaotian-calendar.vue'
    export default {
        components: {
            calendar
        },
        data() {
            return {
                selected: [{
                    date: '2018-12-26'
                }, {
                    date: '2018-12-27'
                }, {
                    date: '2018-12-28'
                }, {
                    date: '2019-1-29'
                }]
            }
        },
        methods: { 
            getdate(e) {
                console.log(JSON.stringify(e))
            }
        }
    }
</script>

<sytle></sytle>