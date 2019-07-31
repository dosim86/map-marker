import Vue from 'vue'
import Vuex from 'vuex';

import categoryService from '../services/category-service';
import markerService from '../services/marker-service';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        categories: null,
        markers: null,
    },
    actions: {
        fetchCategories ({ state }) {
            return categoryService
                .getAllCategories()
                .then(resp => {
                    state.categories = resp.data.data;
                });
        },
        fetchMarkers ({ state }) {
            return markerService
                .getAllMarkers()
                .then(resp => {
                    state.markers = resp.data.data;
                });
        },
        addMarker ({ state }, newMarker) {
            return markerService
                .addMarker(newMarker)
                .then(resp => {
                    const newMarker = resp.data.data;
                    state.markers.push(newMarker);

                    return newMarker;
                });
        },
    },
    getters: {
        categories: state => {
            return state.categories;
        },
        markers: state => {
            return state.markers;
        },
        getCategoryName: state => id => {
            const match = state.categories.find(item => +item.id === +id);
            return match ? match.name : 'неизвестно'
        }
    }
});

export default store;
