const prefer = require('../views/prefer.vue');
const routers = [{
    path: '/prefer/prefer',
    component: prefer
},
{
    path: '/prefer/:type',
    component: prefer,
    props: true
}];

export default routers;