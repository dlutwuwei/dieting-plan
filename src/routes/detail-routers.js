
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routers = [{
    path: '/about',
    component: require('../views/about.vue')
},
{ path: '/foo', component: Foo },
{ path: '/bar', component: Bar }
];

export default routers;