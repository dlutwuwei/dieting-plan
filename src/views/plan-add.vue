<template>
    <div class="food-add">
        <mt-header title="添加食物">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div>
            <div class="search-bar">
                <input type="text">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
        }
    };
</script>