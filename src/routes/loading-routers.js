const laoding = require('../views/loading.vue');
const laodingInfo = require('../views/loading-info.vue');
const routers = [{
    path: '/',
    component: laoding
},
{
    path: '/laoding',
    component: laoding
},
{
    path: '/laodingInfo',
    component: laodingInfo
}];

export default routers;
