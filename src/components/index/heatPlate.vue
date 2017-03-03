/* 热量盘 */
<style lang="scss" scoped>
    .heat-plate{
        margin-top:15px;
        .hd{
            height: 45px;
            padding-left:20px;
            line-height: 45px;
            font-size: 18px;
            color: #333;
            background-color: #fff;
            text-align:left;
            border-bottom:1px solid #dfdfdf;
        }
        .bd{
            background:#fff;
            text-align:center;
            .date{
                height:40px;
                line-height:40px;
                span{
                    color:#333;
                }
                .yellow{
                    color:#f2901e;
                }
            }
            .bd-bot{
                display:none;
                padding:0 27px 15px;
                background:#f2901e;
                .info{
                    padding:13px 0 0 10px;
                    h5{
                        font-weight:100;
                        color:#fff;
                    }
                    p{
                        display:block;
                        margin-top:13px;
                        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAAC4CAYAAABQMybHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCOTJCMDI3OUYzNkMxMUU2QUI0Q0QxRUU3QkE0MzEyMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCOTJCMDI3QUYzNkMxMUU2QUI0Q0QxRUU3QkE0MzEyMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI5MkIwMjc3RjM2QzExRTZBQjRDRDFFRTdCQTQzMTIzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI5MkIwMjc4RjM2QzExRTZBQjRDRDFFRTdCQTQzMTIzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VauiTwAAFU9JREFUeNrsnftv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) no-repeat;
                        width:92px;
                        height:92px;
                        background-size:100% auto;
                        line-height:92px;

                    }
                }
                .evaluate{
                    margin-top:15px;
                    font-size:12px;
                    color:#fff;
                }
            }
        }
    }
</style>
<template>
    <div class="heat-plate">
        <div class="hd">热量盘</div>
        <div class="bd">
            <div class="date ncf-box">
                <span class="item" v-for="(item, index) in heatPlate" v-on:click="dateTab" :data-index="index">{{item.date | handleTime}}</span>
            </div>
            <router-link to="/record">
                <div class="bd-bot" v-for="item in heatPlate">
                    <div class="info ncf-box">
                        <div class="item">
                            <h5>摄入</h5>
                            <p>{{item.left}}</p>
                        </div>
                        <div class="item">
                            <h5>还可以吃/千卡</h5>
                            <p>{{item.obtain}}</p>
                        </div>
                        <div class="item">
                            <h5>运动</h5>
                            <p>{{item.consume}}</p>
                        </div>
                    </div>
                    <div class="evaluate">{{item.metrology}}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script type="text/javascript">


    module.exports = {
        data(){
            return {

            }
        },
        filters: {
            handleTime(date) {
                /**
                 *   对Date的扩展，将 Date 转化为指定格式的String
                 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
                 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
                 *   例子：
                 *   (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
                 *   (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
                 */
                const fmtDate = (date, fmt) => { // author: meizz
                    var o = {
                        'M+': date.getMonth() + 1, // 月份
                        'd+': date.getDate(), // 日
                        'h+': date.getHours(), // 小时
                        'm+': date.getMinutes(), // 分
                        's+': date.getSeconds(), // 秒
                        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                        'S': date.getMilliseconds() // 毫秒
                    };
                    if (/(y+)/.test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
                    }
                    for (var k in o) {
                        if (new RegExp('(' + k + ')').test(fmt)) {
                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                        }
                    }
                    return fmt;
                };

                let nowDate = fmtDate(new Date(), 'yyyy-M-d');

                if(nowDate == date){
                    return "今天"
                }else{
                    return date.substring(5);
                }
            }
        },
        props: {
            heatPlate: Array //这样可以指定传入的类型，如果类型不对，会警告
        },

        methods:{
            handleHeatPlateTime: ()=>{
                let dateTime = document.querySelectorAll('.date span');
                let bdBot = document.querySelectorAll('.bd-bot');

                for(var i = 0; i < dateTime.length;i++){
                    dateTime[2].className = 'item yellow';
                    bdBot[2].style.display = 'block';
                    if(dateTime[i].innerHTML == '今天'){
                        dateTime[2].className = 'item';
                        bdBot[2].style.display = 'none';
                        dateTime[i].className = 'item yellow';
                        bdBot[i].style.display = 'block';
                    }
                }
            },
            dateTab: (evt)=>{
                let dateTime = document.querySelectorAll('.date span');
                let bdBot = document.querySelectorAll('.bd-bot');
                let dateSpanIndex = evt.target.getAttribute('data-index');
                for(var i = 0; i < dateTime.length;i++){
                    dateTime[i].className = 'item';
                    bdBot[i].style.display = 'none';
                }
                evt.target.className = 'item yellow';
                bdBot[dateSpanIndex].style.display='block';
            }
        },
        mounted(){
            this.handleHeatPlateTime();
        }
    }
</script>
