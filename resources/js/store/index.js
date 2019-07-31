import Vue from 'vue'
import Vuex from 'vuex';

import categoryService from '../services/category-service';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        categories: null
    },
    mutations: {
    },
    actions: {
        fetchCategories ({ state }) {
            categoryService
                .getAllCategories()
                .then(resp => {
                    state.categories = resp.data.data;
                });
        }
    },
    getters: {
        categories: state => {
            return state.categories;
        }
    }
});

export default store;
