<style lang="scss" scoped>
    .input-weight-pop{
        width:288px;
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
                background:url(data:image/png;base64,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0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAPZSURBVHja7NlBbqpQFIDhA4pMMQ6QrbEft+H2dFAjUyTRjtqkTdO8AVDu4/tGNjanesvBP23Wtu3rdDoFAMBabCMimqb58cnb7RYREYfDYbQfmMrMsef2fR9d10VERFVVUZblIt97Cmc51cy321tkka3yek9hZt/3cb/fIyJiv9+PskNrvR9NNfd6vUZExPF4dD9a4GtM5XNorpnb37758XiMXlypzBx7btd18Xw+Px/Xdb3I957CWU41c3gMq73eU5jZdV28Xq9Rd2it96Op5n78ftyPlvkaU/kcmmtmHszi46L7/hiwQ2CH5ieAAAABBAAggAAABBAAgAACABBAAAACCABAAAEACCAAAAEEACCAAAAEEACAAAIAEEAAAAIIAEAAAQACCABAAAEACCAAAAEEACCAAAAEEACAAAIAEEAAAAIIAEAAAQAIIAAAAQQAIIAAAAQQAIAAAgAEEACAAAIAEEAAAAIIAEAAAQAIIAAAAQQAIIAAAGa2/e3J3W43+g9MZeaUc5f8GlM6y7FnFrsisshWeb2ntJfuR8udm2XZas8ylXvxmvfo+8ysbdvX+XyWghO7XC5fvm6axqGAHQI79Ef8CwwAEEAAAAIIAEAAAQAIIAAAAQQAIIAAAAQQAIAAAgAQQAAAAggAQAABAAggAAABBAAggAAABBAAIIAAAAQQAIAAAgAQQAAAAggAQAABAAggAAABBAAggAAABBAAgAACABBAAAACCABAAAEACCAAQAABAAggAAABBAAggPj3g87zHx8DdgjskAD6b1VVFXmex2aziaqqHAjYIbBDf2jrkphHWZZR17WDADsEdmgB/AUIABBAAAACCABAAAEACCAAgLQCaBgGpwAArCuAiqJwCgDAugLIEQAAAggAQAABAAggAAABBAAggAAABBAAgAACABBAAAACCABAAAEACCAAAAEEACCAAAAEEACAAAIABBAAgAACABBAAAACCABAAAEACCAAAAEEACCAAAAEEACAAAIAEEAAAAIIAEAAAQAIIAAAAQQACCAAAAEEACCAAAAEEACAAAIAEEAAAAIIAEAAAQAIIAAAAQQAIIAAAAQQAIAAAgAQQAAAAggAEEAAAAIIAEAAAQAIIAAAAQQAIIAAAAQQAIAAAgAQQAAAAggAQAABAAggAAABBAAggAAABBAAIIAAAAQQAIAAAgAQQAAAAggAQAABAAggAAABBAAggAAABBAAgAACABBAAAACCABAAAEACCAAQAABAAggAAABBAAggAAABBAAgAACABBAAAACCABAAAEACCAAgEm8AwAA//8DAKwc7DBVCQVjAAAAAElFTkSuQmCC) no-repeat;
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
                width:50%;
                text-align: center;
            }
        }
    }

</style>
<template>
  <div class="">
      <div class="input-weight-pop">
          <div class="cen">
              <div class="hd">今天</div>
              <div class="bd">
                  <div class="weight"><input type="number" @keyup="getNum" value="55.5" id="ruler-input"/> <span>kg</span></div>
                  <div class="calipers"><em id="ruler-em"></em><span class="one">-</span><span class="two">-</span><span class="three">-</span></div>
              </div>
              <div class="bot"><span @click="cancel">取消</span><span @click="cancel">保存</span></div>
          </div>
      </div>
  </div>
</template>
<script>

    export default {
        data(){
            return {
                popupVisible: false,
            }
        },
        props: ['popClose'],
        methods:{
            cancel: function () {
                this.$emit('popClose');
            },
            save: function () {
                this.$emit('popClose');
            },
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
