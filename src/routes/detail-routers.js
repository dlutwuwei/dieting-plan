const input = require('../views/input-info.vue');
const bmi = require('../views/bmi.vue');
const routers = [{
    path: '/detail/input/:classid',
    component: input
},
{
    path: '/detail/bmi',
    component: bmi
}];

export default routers;