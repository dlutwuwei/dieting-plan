<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <dl class="about-info">

            <dt>关于项目</dt>
            <dd>采用vue.js重写的webapp。</dd>
        
            <dt>源码地址</dt>
            
            <dd>
                <a href="https://github.com/dlutwuwei/Vue-cnodejs">
                    https://github.com/dlutwuwei/Vue-cnodejs</a>
            </dd>
            
            <dt>意见反馈</dt>
            <dd>
                <a href="https://github.com/dlutwuwei/Vue-cnodejs/issues">
                    发表意见或者提需求</a>
            </dd>
            
            <dt>当前版本</dt>
            <dd>V2.0</dd>

        </dl>
    </div>
</template>
<script>
    export default {
        components: {
        }
    };
</script>