const list = require('../views/share-list.vue');
const editor = require('../views/share-editor.vue');
const routers = [{
    path: '/',
    component: list
},
{
    path: '/share/list',
    component: list
},
{
    path: '/share/edit',
    component: editor
}];

export default routers;