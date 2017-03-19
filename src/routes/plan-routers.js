const planList = require('../views/plan-list.vue');
const planAdd = require('../views/plan-search.vue');
const planDetail = require('../views/plan-detail.vue');
const planDiet = require('../views/plan-diet.vue');

const routers = [{
    path: '/',
    component: planList
},
{
    path: '/listt',
    component: planList
},
{
    path: '/add/:type',
    component: planAdd
},
{
    path: '/diet/:type',
    component: planDiet
},
{
    path: '/detail/:type',
    component: planDetail
}];

export default routers;