<style lang="scss" scoped>
    .input-weight{
    background:#f7f7f7;
        .hd{
            position:relative;
            height:60px;
            text-align:center;
            font-size:18px;
            color:#333;
            line-height:60px;
            span{
                vertical-align:middle;
                height: 20px;
                width: 20px;
                display: inline-block;
                border-bottom: 2px solid #999;
                border-right: 2px solid #999;
                transform: rotate(-45deg) scale(0.5);
                -webkit-transform: rotate(-45deg) scale(0.5);
            }
            .lt-btn{
                margin-right:10px;
                transform: rotate(135deg) scale(0.5);
                -webkit-transform: rotate(135deg) scale(0.5);
            }
            .rt-btn{
                margin-left:10px;
            }
        }
        .hd:before{
            content: " ";
            position: absolute;
            background-color: #e6e6e6;
            bottom: -0.2rem;
            left: 0;
            right: 0;
            width: 100%;
            height: 1px;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
        .bd{
            .bd-hd{
                padding-top:10px;
            }
            .bd-hd,li{
                display: box;
                display: -webkit-box;
                -webkit-box-align: center;
                box-align: center;
                text-align: center;
                -webkit-box-pack: justify;
                box-pack: justify;
                font-size:15px;
                color:#333;
                span{
                    width:100px;
                    box-flex: 1;
                    -webkit-box-flex: 1;
                    display: block;
                    text-align:center;
                }
            }
            li{
                position:relative;
                span{
                   height:55px;
                   padding-top: 12px;
                   line-height: 1.2;
                }
                .gray{
                    color:#999;
                }
                em{
                    display:block;
                    font-style: normal;
                    font-size:12px;
                    color:#47a304;
                }
                .curr{
                    background:#f2901e;
                    border-radius:9999px;
                   em{
                       color:#fff;
                   }
                }
            }
            li:before{
                content: " ";
                position: absolute;
                background-color: #e6e6e6;
                bottom: -0.2rem;
                left: 0;
                right: 0;
                width: 100%;
                height: 1px;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }
        }

    }
</style>
<template>
    <div>
        <div class="input-weight">
            <mt-header title="鸣鹿健康">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
                <mt-button icon="more" slot="right"></mt-button>
            </mt-header>
            <div class="hd"><span class="lt-btn"></span>2017年2月<span class="rt-btn"></span></div>
            <div class="bd">
                <div class="bd-hd">
                    <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                </div>
                <ul @click="onPopup">
                    <li>
                        <span class="gray">29</span><span class="gray">30</span><span class="gray">31</span><span>1</span><span>2</span><span>3</span><span>4</span>
                    </li>
                    <li>
                        <span>5</span><span>6</span><span>7</span><span>8 <em>56.3</em></span><span>9<em>54.9</em></span><span class="curr">10<em>55.1</em></span><span>11</span>
                    </li>
                    <li>
                        <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
                    </li>
                    <li>
                        <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                    </li>
                    <li>
                        <span>26</span><span>27</span><span>28</span><span class="gray">1</span><span class="gray">2</span><span class="gray">3</span><span class="gray">4</span>
                    </li>
                </ul>
            </div>
        </div>
        <mt-popup class="select-popup1" v-model="popupVisible" popup-transition="popup-fade">
            <InputWeightPop v-on:popClose="popClose" :data="selected"></InputWeightPop>
        </mt-popup>
    </div>
</template>
<script>
    import InputWeightPop from '../components/index/inputWeightPop.vue';//录入体重日历弹窗

    export default {
        data() {
            return {
                popupVisible: false
            }
        },
        methods:{
            onPopup: function(e) {
                this.popupVisible = true;
            },
            popClose: function() {
                this.popupVisible = false;
            },
        },
        components: {
            InputWeightPop,
        },
        mounted(){
        },
    }

</script>
