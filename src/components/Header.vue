<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import Form from "@/uikit/Form.vue";
import Input from "@/uikit/Input.vue";
import Navigation from "@/uikit/Navigation.vue";
import { useStore } from 'vuex';
import { ProductState } from '@/store/slices/productsSlice/productsSlice';


const store = useStore()

export default defineComponent({
    components: { Navigation, Form, Input },

    setup() {
        const store = useStore<ProductState>();
        
        const body = ref({
            search: ''
        });

        const isMobile = ref(true);

        const searchSuccess = async (res: { search: string }) => {
           store.commit('setSearchQuery', res.search)
        };

        const searchError = (res: any) => {
            console.error(res);
        };

        const change = (e: Event) => {
            const { name, value } = e.target as HTMLInputElement;
            body.value = {
                ...body.value,
                [name]: value
            };
        };

        const toggleMenu = () => {
            isMobile.value = !isMobile.value;
        };

        const updateIsMobile = () => {
            isMobile.value = window.innerWidth > 768;
        };

        onMounted(() => {
            updateIsMobile();
            window.addEventListener('resize', updateIsMobile);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateIsMobile);
        });

        return {
            body,
            isMobile,
            searchSuccess,
            searchError,
            change,
            toggleMenu
        };
    },

    // methods: {

    //     searchSuccess(res: { search: string }) {
    //         console.log(store);
            
    //     },

    //     searchError(res: any) {
    //         console.log(res);
    //     },

    //     change(e: Event) {
    //         const { name, value } = e.target as HTMLInputElement;
    //         this.body = {
    //             ...this.body,
    //             [name]: value
    //         };

    //     },

    //     toggleMenu() {
    //         this.isMobile = !this.isMobile;
    //     },

    //     updateIsMobile() {
    //         this.isMobile = window.innerWidth > 768;
    //     }
    // },
});
</script>

<template>
    <header class="header">
        <div class="header__container container">
            <Navigation :active="isMobile" />
            <div class="header__search">
                <Form :isActiveRequest="false" :body="body" :success="searchSuccess" :error="searchError">
                    <Input :type="'text'" inputId="search" name="search" placeholder="Поиск по названию картины"
                        :value="body.search" :change="change" />
                    <Input :type="'submit'" inputId="send" name="send" value="Найти" />
                </Form>
            </div>
            <button class="butger-btn" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>
</template>

<style lang="scss">
$md1: 1240px;
$md2: 1024px;
$md3: 768px;
$md4: 480px;

.header {
    width: 100%;
    padding: 24px 20px;
    border-bottom: 1px solid #E1E1E1;
    position: relative;

    @media(max-width: $md3) {
        padding: 16px 20px;
    }

    .menu {
        @media(max-width: $md3) {
            position: absolute;
            left: 0;
            top: 82px;
            background: #F6F3F3;
            width: 100%;
            max-width: unset;
            height: calc(100vh - 82px);
            z-index: 10;
            padding: 20px 0;
            overflow: hidden;
            transition: all 0.5s;
        }

    }

    .menu ul {
        @media(max-width: $md3) {
            min-width: calc(100vv - 40px);
            padding: 0 40px;
            flex-direction: column;
            gap: 10px;

        }
    }

    .header__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        .header__search {
            width: 100%;
            max-width: 416px;

            @media(max-width: $md2) {
                max-width: 320px;
            }

            form {
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
                width: 100%;

                .input-text {
                    max-width: 294px;
                }

                .input-btn {
                    max-width: 122px;

                    @media(max-width: $md4) {
                        display: none;
                    }
                }
            }
        }
    }
}

.butger-btn {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;

    @media (max-width: $md3) {
        display: flex;
    }

    span {
        display: block;
        width: 30px;
        height: 3px;
        background-color: #333;
    }
}
</style>