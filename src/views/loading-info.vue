<template>
    <div class="laoding-info">
        <mt-header>
            <router-link to="/" slot="left">
                <mt-button icon="back">思维必减肥详情介绍</mt-button>
            </router-link>
        </mt-header>
        <div class="loading-info">
            <p>鸣鹿减肥法采用德国Cell-Wellbeing公司的量子体质检
                测技术，运用位于德国汉堡的庞大数据库平台系统，由
                数十位国际营养及健康学专家研究建立的数学模型进行
                精准运算，完成对每位客户的个体健康及营养元素的实
                时检测。Cell-Wellbeing已获得美国FDA、欧盟CE以及
                中国CQC三项权威认证，能够精确检测出人体9大类、
                200多项营养素含量是否超标或缺失,其中包括各类维生
                素、矿物质、必需脂肪酸等。同时，还可以检测出针对
                个人体质的食物限制，减少限制食物给身体带来的额外
                压力，给出针对性个性化的优化生活健康减肥解决方案</p>
            <p>热量摄入与消耗比例失衡以及人体代谢机能紊乱是造成
                肥胖的主导因素。维持人体基本营养元素均衡，确保其
                正常消化和吸收是恢复和优化人体代谢系统功能的必要
                手段。依据人体营养元素实时状况以及各类食材的营养
                元素含量，通过大数据数学模型精准运算并给出精确的
                能量物质比值、食物种类和摄入量，进而达到必需营养
                元素摄入充足和加快新陈代谢速率的目的，是国际健康
                体重管理领域的最新科研成果！</p>
            <p>鸣鹿减肥法以世界卫生组织（WHO）膳食推荐原则为基
                础，根据德国Cell-Wellbeing量子检测报告给出的用户
                实时身体营养素含量状况，制定专业科学的食方数学模
                型，精准计算出用户每天所需摄入的蛋白质、脂肪、碳
                水化合物、膳食纤
                维和微量元素等营养物质的比值和含量，针对性提高用户身
                体新陈代谢机能，结合运算并达到最佳燃脂比率。让您在</p>
        </div>
    </div>
</template>
<script>
    import { getQuery } from '../libs/utils';

    export default {
        data() {
            return {
                shareDetailInfo: {},
                author: {},
            }
        },
        created() {
            this.cid = getQuery('cid');
        },
        methods: {
            goback: function () {
                history.back();
            },
            getShareDetail: function(){
                this.$http.get(`/share/datails?cid=${this.cid}`).then(res => {
                    this.shareDetailInfo = res.body.massages[0];
                this.author = res.body.massages[0].author;
                console.log(this.author)
            },() => {
                MessageBox('注意', '请求失败');
            });
        }
        },
        mounted(){
            this.getShareDetail();
        }
    }
</script>
<style lang="scss">
    .laoding-info{
        padding:15px;
        p{
            padding-top:15px;
            font-size:14px;
            color:#333;
            line-height:1.5;
            imh{
                width:100%;
                height:auto;
            }
        }
    }
</style>
