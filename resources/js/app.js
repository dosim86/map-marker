import Vue from 'vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

import './bootstrap';
import App from './components/App'
import store from './store'

new Vue({
    el: '#app',
    store,
    components: { App },
});
