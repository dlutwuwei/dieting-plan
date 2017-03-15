const input = require('../views/input-info.vue');
const bmi = require('../views/bmi.vue');
const routers = [{
    path: '/input',
    component: input
},
{
    path: '/bmi',
    component: bmi
}];

export default routers;