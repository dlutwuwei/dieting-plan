const shareList = require('../views/share-list.vue');
const shareEditor = require('../views/share-editor.vue');
const shareDetail = require('../views/share-detail.vue');
const routers = [{
    path: '/',
    component: shareList
},
{
    path: '/share/list',
    component: shareList
},
{
    path: '/share/edit',
    component: shareEditor
},
{
    path: '/share/detail/:id',
    component: shareDetail
}];

export default routers;
