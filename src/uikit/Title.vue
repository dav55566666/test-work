<script lang="ts">
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <h1 v-if="type === 'h1'" class="title">{{ title }}</h1>
    <h2 v-else-if="type === 'h2'" class="title">{{ title }}</h2>
    <h3 v-else-if="type === 'h3'" class="title">{{ title }}</h3>
    <h4 v-else-if="type === 'h4'" class="title">{{ title }}</h4>
    <h5 v-else-if="type === 'h5'" class="title">{{ title }}</h5>
    <h6 v-else-if="type === 'h6'" class="title">{{ title }}</h6>
</template>

<style lang="scss" scoped>
$md1: 1240px;
$md2: 1024px;
$md3: 768px;
$md4: 480px;
.title {
    color: #555;
    font-family: Merriweather;
    font-style: normal;
    line-height: 150%;
}

h1 {
    font-size: 24px;
    font-weight: 700;
    @media(max-width: $md3) {
        font-size: 22px;
    }
}

h2 {
    font-size: 18px;
    font-weight: 400;
    @media(max-width: $md3) {
        font-size: 16px;
    }
}

h3,h4,h5,h6 {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    @media(max-width: $md3) {
        font-size: 14px;
    }
}

h5 {
    font-weight: 400;
}

h6 {
    font-weight: 300;
}
</style>
