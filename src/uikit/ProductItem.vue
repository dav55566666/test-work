<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import Input from './Input.vue';
import Title from './Title.vue';
import Loader from '@/svg/Loader.vue';
import Check from '@/svg/Check.vue';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
export default defineComponent({
    components: {
        Input,
        Title,
        Loader,
        Check,
        Swiper,
        SwiperSlide
    },


    props: {
        img: {
            type: String,
            required: true
        },

        images: {
            type: Array,
            required: false
        },

        title: {
            type: String,
            required: true
        },
        activeProduct: {
            type: Boolean,
            required: true
        },
        oldPrice: {
            type: String,
            required: false
        },
        price: {
            type: String,
            required: true
        },
        inCart: {
            type: Boolean,
            required: true
        },
        buyBtnFunction: {
            type: Function,
            required: false
        },
        id: {
            type: Number,
            required: true
        }
    },

    setup() {
        const store = useStore();

        // Используем ref для хранения состояния загрузки кнопки
        const isLoadingBtn = ref(false);

        // Функция для обработки нажатия на кнопку
        const inCartBtn = (id: number) => {
            isLoadingBtn.value = true;
            setTimeout(() => {
                isLoadingBtn.value = false;
                store.commit('productInCart', id); // Пример коммита мутации в Vuex
            }, 2000);
        };

        return {
            isLoadingBtn,
            inCartBtn
        };
    }
});
</script>

<template>
    <div :class="activeProduct ? 'product-item' : 'product-item disabled'">
        <div v-if="images && images.length > 0" class="product-item__img">
            <swiper class="mySwiper">
                <swiper-slide v-for="(el, idx) in images" :key="idx">
                    <img :src="el as string" :alt="title" />
                </swiper-slide>
            </swiper>
        </div>
        <div v-else class="product-item__img" @click="buyBtnFunction ? buyBtnFunction(id) : null">
            <img :src="img" :alt="title" />
        </div>
        <div class="product-item__info">
            <Title type="h2" :title="title" @click="buyBtnFunction ? buyBtnFunction(id) : null" />
            <div v-if="activeProduct" class="product-item__bottom">
                <div class="price">
                    <span v-if="oldPrice" class="old-price">{{ oldPrice }}</span>
                    <p>{{ price }}</p>
                </div>
                <button type="button" class="button" value="0" @click="() => inCartBtn(id)">
                    <Loader v-if="isLoadingBtn" />

                    <Check v-else-if="!isLoadingBtn && inCart" />

                    <span>
                        {{ isLoadingBtn ? 'В обработке' : (inCart ? 'В корзине' : 'Купить') }}
                    </span>
                </button>
            </div>
            <p v-else class="auction-end">Продана на аукционе</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$md1: 1240px;
$md2: 1024px;
$md3: 768px;
$md4: 480px;

.product-item {
    width: 100%;
    background: #F6F3F3;
    border: 1px solid #E1E1E1;

    &.disabled {
        opacity: 0.5;
        cursor: no-drop;
    }

    .product-item__img {
        width: 100%;
        cursor: pointer;

        img {
            width: 100%;
            height: 160px;
            object-fit: cover;
        }
    }

    .product-item__info {
        width: 100%;
        padding: 20px 24px 24px;

        @media(max-width: $md1) {
            padding: 20px 12px;
        }

        .title {
            margin-bottom: 22px;
            cursor: pointer;
        }

        .auction-end {
            width: 100%;
            height: 48px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #343030;
            font-family: Merriweather;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 150%;
        }

        .product-item__bottom {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;

            @media(max-width: $md1) {
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
            }

            .price {
                min-height: 46px;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                flex-direction: column;

                .old-price {
                    color: #A0A0A0;
                    font-family: Merriweather;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 300;
                    line-height: 150%;
                    text-decoration-line: line-through;
                    display: block;
                }

                p {
                    color: #343030;
                    font-family: Merriweather;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 150%;
                }
            }

            .button {
                max-width: 118px;
                width: 100%;
                background: #403432;
                height: 48px;
                color: #FFF;
                font-family: Merriweather;
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
                line-height: 150%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: unset;
                cursor: pointer;

                svg {
                    width: 20px;
                    height: 20px;
                }

                @media(max-width: $md1) {
                    max-width: unset;
                }
            }
        }
    }
}
</style>