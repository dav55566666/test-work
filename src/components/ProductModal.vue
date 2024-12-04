<script lang="ts">
import Modal from '@/uikit/Modal.vue';
import ProductItem from '@/uikit/ProductItem.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        Modal,
        ProductItem
    },
    props: {
        closeModal: {
            type: Function,
            required: true
        },
        productData: {
            type: Object,
            required: true
        }
    }
})
</script>

<template>
    <Modal :closeModal="closeModal" maxWidth="400px">
        <div class="product-modal">
            <ProductItem :id="productData.id" :img="productData.img" :title="productData.title"
                :activeProduct="productData.activeProduct" :oldPrice="productData.oldPrice" :price="productData.price"
                :inCart="productData.inCart" :product="productData" :images="productData.images" />

            <p class="product-description"> {{ productData.description }}</p>
        </div>
    </Modal>
</template>

<style lang="scss" scoped>
.product-description {
    color: #343030;
    font-family: Merriweather;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin-top: 20px;
}
</style>
