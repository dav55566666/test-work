<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        closeModal: {
            type: Function,
            required: true
        },
        maxWidth: {
            type: String,
            required: true
        }
    },
    methods: {
        closeModalHandler(event: MouseEvent) {
            this.closeModal(event);
        }
    }
});
</script>

<template>
    <div class="modal">
        <div class="modal__container" :style="{ maxWidth: maxWidth }">
            <button class="close-modal" @click="closeModalHandler">
                <span></span>
                <span></span>
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    .modal__container {
        position: relative;
        background-color: #FFF;
        border: 2px solid #403432;
        border-radius: 4px;
        padding: 40px 20px 20px;

        .close-modal {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 20px;
            height: 20px;
            background: none;
            border: none;
            cursor: pointer;
            span {
                display: block;
                width: 100%;
                height: 2px;
                background-color: #403432;
                position: relative;
                &:first-child {
                    transform: rotate(45deg);
                }

                &:last-child {
                    transform: rotate(-45deg);
                    top: -2px;
                }
            }
        }
    }
}
</style>