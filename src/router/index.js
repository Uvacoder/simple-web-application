import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/pages/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
];

export default new VueRouter({
    mode: 'history',
    routes,
});