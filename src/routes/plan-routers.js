const planList = require('../views/plan-list.vue');
const planAdd = require('../views/plan-search.vue');
const planDetail = require('../views/plan-detail.vue');
const planDiet = require('../views/plan-diet.vue');
const planRecord = require('../views/plan-record.vue');
const planCheck = require('../views/plan-check.vue');
const planCalendar = require('../views/plan-calendar.vue');

const routers = [{
    path: '/',
    component: planList
},
{
    path: '/listt',
    component: planList
},
{
    path: '/check/:type', // food or sport
    component: planCheck
},
{
    path: '/record/:type', // breakfast, lunch, dinner, sport
    component: planRecord
},
{
    path: '/add/:type', // breakfast, lunch, dinner, sport
    component: planAdd
},
{
    path: '/diet/:type', // breakfast, lunch, dinner, sport
    component: planDiet
},
{
    path: '/detail/:type', // food, sport
    component: planDetail
},
{
    path: '/calendar/:type', // food, sport
    component: planCalendar
}];

export default routers;
