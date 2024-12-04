import { createStore } from 'vuex';
import { state as productsState, mutations as productsMutations, actions as productsActions, getters as productsGetters } from './slices/productsSlice/productsSlice';

export default createStore({
    modules: {
        products: {
            state: productsState,
            mutations: { 
                ...productsMutations
            },
            actions: {
                ...productsActions
            },
            getters: productsGetters
        }
    }
});