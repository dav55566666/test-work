<template>
    <form @submit="onSubmit">
        <slot></slot>
    </form>
</template>

<script lang="ts">
import { formValidation } from '@/utils/functions';
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        isActiveRequest: {
            type: Boolean,
            required: true
        },
        body: {
            type: Object,
            required: true
        },
        requestLink: {
            type: String,
            required: false,
            validator(value, props) {
                if (props.isActiveRequest && !value) {
                    return false;
                }
                return true;
            }
        },
        requiredFields: {
            type: Object,
            required: false
        },
        success: {
            type: Function,
            required: true
        },
        error: {
            type: Function,
            required: true
        }
    },
    
    methods: {
        async onSubmit(e: Event) {
            e.preventDefault();
            if(this.requiredFields) {
                const {formIsValid, requiredFields} = (await formValidation({body: this.body, requiredFields: this.requiredFields}));
                if (formIsValid) {
                    if (this.isActiveRequest) {
                        axios
                            .post(this.requestLink!, this.body)
                            .then(res => {
                                this.success({
                                    res,
                                    requiredFields
                                })
                            })
                            .catch(res => {
                                this.error({
                                    res,
                                    requiredFields
                                })
                            });
                    } else {
                        this.success();
                    }
                }else {
                    this.error({
                        requiredFields 
                    });
                }
            }else {
                this.success(this.body)
            }
        }
    }
});
</script>

<style lang="scss" scoped>
</style>