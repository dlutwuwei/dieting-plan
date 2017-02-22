const prefer = require('../views/prefer.vue');
const routers = [{
    path: '/',
    component: prefer
},
{
    path: '/:type',
    component: prefer,
    props: true
}];

export default routers;