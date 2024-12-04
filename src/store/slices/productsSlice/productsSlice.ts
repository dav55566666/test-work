import { MutationTree, ActionTree, GetterTree } from 'vuex';
import birthOfVenus from '@/assets/images/painting-63186_1280 1.png';
import lastSupper from '@/assets/images/ae973f6678e037cd297053384aa7dca0 1.png';
import creationOfAdam from '@/assets/images/image-19 1.png';
import anatomyLesson from '@/assets/images/painting-63186_1280 1.png';

export interface ProductItemType {
    id: number;
    title: string;
    price: string;
    oldPrice?: string;
    img: string;
    activeProduct: boolean;
    inCart: boolean;
    images: Array<string>;
    description: string;
}

export interface ProductState {
    products: ProductItemType[];
    searchQuery: string;
}

export const state: ProductState = {
    products: JSON.parse(localStorage.getItem('products') || '[]').length
        ? JSON.parse(localStorage.getItem('products') || '[]')
        : [
            {
                id: 1,
                img: birthOfVenus,
                title: '«Рождение Венеры» Сандро Боттичелли',
                activeProduct: true,
                oldPrice: '2 000 000 $',
                price: '1 000 000 $',
                inCart: false,
                images: [birthOfVenus, lastSupper, creationOfAdam],
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy'
            },
            {
                id: 2,
                img: lastSupper,
                title: '«Тайная вечеря»  Леонардо да Винчи',
                activeProduct: true,
                price: '3 000 000 $',
                inCart: false,
                images: [lastSupper, anatomyLesson, creationOfAdam],
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy'
            },
            {
                id: 3,
                img: creationOfAdam,
                title: '«Сотворение Адама» Микеланджело',
                activeProduct: true,
                oldPrice: '6 000 000 $',
                price: '5 000 000 $',
                inCart: false,
                images: [creationOfAdam, lastSupper, anatomyLesson],
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy'
            },
            {
                id: 4,
                img: anatomyLesson,
                title: '«Урок анатомии»  Рембрандт',
                activeProduct: true,
                price: '5 000 000 $',
                inCart: false,
                images: [anatomyLesson, lastSupper, creationOfAdam],
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy'
            }
        ],
    searchQuery: '',
};

export const mutations: MutationTree<ProductState> = {
    setSearchQuery(state, searchQuery: string) {
        state.searchQuery = searchQuery;
    },

    productInCart(state, id: number) {
        state.products = state.products.map(el => ({
            ...el,
            inCart: id === el.id || el.inCart
        }));

        localStorage.setItem('products', JSON.stringify(state.products));
    },
};

export const actions: ActionTree<ProductState, any> = {};

export const getters: GetterTree<ProductState, any> = {
    getProducts: (state) => state.products,
    filteredProducts: (state) => {
        return state.products.filter(product =>
            product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
    },
};