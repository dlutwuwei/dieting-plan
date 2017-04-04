const laoding = require('../views/loading.vue');
const laodingInfo = require('../views/loading-info.vue');
const routers = [{
    path: '/',
    component: laoding
},
{
    path: '/loading/loading',
    component: laoding
},
{
    path: '/loadingInfo',
    component: laodingInfo
}];

export default routers;
