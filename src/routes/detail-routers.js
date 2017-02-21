const input = require('../views/input_info.vue');
const bmi = require('../views/bmi.vue');
const routers = [{
    path: '/',
    component: input
},
{
    path: '/input_info',
    component: input
},
{
    path: '/bmi',
    component: bmi
}];

export default routers;