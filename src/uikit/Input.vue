<script lang="ts">
import { DefineComponent, defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        type: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: false,
        },
        inputId: {
            type: String,
            required: false,
        },
        value: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        placeholder: {
            type: String,
            required: false,
        },
        change: {
            type: Function,
            required: false,
        },
        click: {
            type: Function,
            required: false,
        },
        blur: {
            type: Function,
            required: false,
        },
        error: {
            type: Boolean,
            required: false,
        },
        Icon: {
            type: Object as PropType<DefineComponent>,  
            required: false
        }
    },
});
</script>

<template>
    <label v-if="type === 'text'" :for="inputId" class="input-text">
        <span v-if="title" class="input-title">{{ title }}</span>
        <input type="text" :name="name" :id="inputId" :value="value" :placeholder="placeholder"
            :style="{ borderColor: error ? 'red' : '#E1E1E1' }" @input="(e: Event) => change && change(e)"
            @blur="blur && blur" @focus="click && click" />
    </label>

    <label v-else-if="type === 'submit'" :for="inputId" class="input-btn">
        <input type="submit" :name="name" :id="inputId" :value="value" @click="click && click" />
    </label>
</template>

<style lang="scss" scoped>
.input-text {
    display: block;
    width: 100%;

    input {
        width: 100%;
        padding: 0 16px;
        height: 48px;
        border: 1px solid #E1E1E1;
        font-family: Merriweather;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        background: #F6F3F3;
        line-height: 150%;

        &::placeholder {
            color: #9F9F9F;
        }
    }
}

.input-btn {
    width: 100%;
    display: block;

    input {
        width: 100%;
        background: #403432;
        height: 48px;
        color: #FFF;
        font-family: Merriweather;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%;
        display: block;
        border: unset;
        cursor: pointer;
    }
}
</style>