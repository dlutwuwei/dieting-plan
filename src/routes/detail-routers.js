
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routers = [{
    path: '/input_info',
    component: require('../views/input_info.vue')
},
{ path: '/foo', component: Foo },
{ path: '/bar', component: Bar }
];

export default routers;