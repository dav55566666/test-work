<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import ProductItem from '@/uikit/ProductItem.vue';
import Title from '@/uikit/Title.vue';
import ProductModal from './ProductModal.vue';

interface ProductItemType {
    id: number;
    title: string;
    price: string;
    oldPrice?: string;
    img: string;
    activeProduct: boolean;
    inCart: boolean;
    details: string
}

export default defineComponent({
    components: {
        Title,
        ProductItem,
        ProductModal
    },

    setup() {
        const store = useStore();
        
        const currentProduct = ref<ProductItemType | null>(null);

        const products = computed(() => store.getters['filteredProducts'] as ProductItemType[]);

        const toggleModal = ref<{ toggle: boolean, productData: ProductItemType | null }>({
            toggle: false,
            productData: null
        });

        const buyBtnFunction = (id: number) => {
            const product = products.value.find((el) => el.id === id) || null;
            currentProduct.value = product;
            toggleModal.value = { toggle: true, productData: product };  
            console.log('mib');
            
        };
        
        const handleClose = () => {
            toggleModal.value = { toggle: false, productData: null };  
        }

        return {
            products,
            currentProduct,
            buyBtnFunction,
            toggleModal,
            handleClose
        };
    }
});
</script>

<template>
    <section class="products">
        <div class="products__container container">
            <Title type="h1" title="Картины эпохи Возрождения" />
            <div class="products__grid">
                <ProductItem 
                    v-for="el in products" 
                    :key="el.id" 
                    :id="el.id" 
                    :img="el.img" 
                    :title="el.title"
                    :activeProduct="el.activeProduct" 
                    :oldPrice="el.oldPrice" 
                    :price="el.price" 
                    :inCart="el.inCart"
                    :buyBtnFunction="buyBtnFunction"
                    :product="el" 
                />
            </div>
        </div>
    </section>
    
    <ProductModal v-if="toggleModal.toggle && toggleModal.productData" :closeModal="handleClose" :productData="toggleModal.productData" />
</template>

<style lang="scss" scoped>
$md1: 1240px;
$md2: 1024px;
$md3: 768px;
$md4: 480px;

.products {
    width: 100%;
    padding: 46px 20px;
    height: 100%;

    .products__container {
        .title {
            margin-bottom: 40px;
        }

        .products__grid {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 32px;

            @media(max-width: $md1) {
                grid-gap: 16px;
            }

            @media(max-width: $md2) {
                grid-template-columns: repeat(3, 1fr);
            }

            @media(max-width: $md3) {
                grid-template-columns: repeat(2, 1fr);
            }

            @media(max-width: $md4) {
                grid-template-columns: repeat(1, 1fr);
            }
        }
    }
}
</style>