const shareList = require('../views/share-list.vue');
const shareEditor = require('../views/share-editor.vue');
const shareDetail = require('../views/share-detail.vue');
const routers = [{
    path: '/',
    component: shareList
},
{
    path: '/list',
    component: shareList
},
{
    path: '/edit',
    component: shareEditor
},
{
    path: '/detail',
    component: shareDetail
}];

export default routers;
