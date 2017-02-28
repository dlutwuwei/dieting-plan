<style lang="scss" scoped>
    .isHide{
        display:none;
    }
    .mask{
        position:fixed;
        width:100%;
        height:100%;
        left:0px;
        top:0px;
        right:0px;
        bottom:0px;
        background:#333;
        filter:alpha(opacity=80);
        opacity:0.8;
        z-index:10000;
    }
    .input-weight-pop{
        position:absolute;
        left:50%;
        top:180px;
        width:288px;
        margin-left:-144px;
        z-index:10002;
        text-align:center;
        .cen{
            background:#fff;
            border-radius:4px 4px 0px 0px;
        }
        .hd{
            height:57px;
            line-height:57px;
            border-bottom:1px solid #dfdfdf;
        }
        .bd{
            padding:45px 0;
            .weight{
                position:relative;
                color:#47a304;
                input{
                    width:100px;
                    height:45px;
                    border:none;
                    border-bottom:1px solid #47a304;
                    font-size:36px;
                    color:#47a304;
                }
                span{
                    position:absolute;
                    top: 0px;
                    font-size: 5px;
                    margin-left: 10px;
                }
            }
            .calipers{
                position:relative;
                width:288px;
                height:88px;
                margin-top:38px;
                background: url(../../assets/images/jianfei/ruler.png) no-repeat;
                background-size: 288px auto;
                em{
                    position:absolute;
                    left:150px;
                    top:0px;
                    display:block;
                    width:3px;
                    height:46px;
                    background:#47a304;
                    border-radius:2px;
                }
                span{
                   position:absolute;
                    top:58px;
                    font-size:18px;
                    color:#333;
                }
                .one{
                    left:37px;
                }
                .two{
                     left:142px;
                 }
                .three{
                    left:247px;
                }
            }
        }
        .bot{
            height:50px;
            background:#47a304;
            line-height:50px;
            color:#fff;
            span{
                display:inline-block;
                wdith:50%;
            }
        }
    }

</style>
<template>
    <mt-popup v-model="popupVisible">
        <div class="input-weight-pop">
            <div class="cen">
                <div class="hd">今天</div>
                <div class="bd">
                    <div class="weight"><input type="number" @keyup="getNum" value="55.5" id="ruler-input"/> <span>kg</span></div>
                    <div class="calipers"><em id="ruler-em"></em><span class="one">-</span><span class="two">-</span><span class="three">-</span></div>
                </div>
                <div class="bot"><span>取消</span><span>保存</span></div>
            </div>
        </div>
    </mt-popup>
</template>
<script>

    export default {
        data(){
            return {
                popupVisible: false,
            }
        },

        methods:{
            popView: function(){
                this.popupVisible = !this.popupVisible;
            },
            getNum: function(event) {
                let rulerNum = event.target.value;
                let rulerEm = document.getElementById('ruler-em');
                let rumberOne = document.querySelector('.one');
                let rumberTwo = document.querySelector('.two');
                let rumberThree = document.querySelector('.three');
                let samllNum = rulerNum-parseInt(rulerNum);

                if(rulerNum == '' || rulerNum <= 0){
                    rumberOne.innerHTML = 0;
                    rumberTwo.innerHTML = 1;
                    rumberThree.innerHTML = 2;
                    rulerEm.style.left = '150px';
                } else {
                    rumberOne.innerHTML = parseInt(rulerNum) - 1;
                    rumberTwo.innerHTML = parseInt(rulerNum);
                    rumberThree.innerHTML = parseInt(rulerNum) + 1;
                    rulerEm.style.left = (rulerNum-parseInt(rulerNum))*102 + 150 + 'px';
                }
            }
        },
        mounted(){

        }
    }

</script>
