<template>
    <div class="wrapper">
        <Header />
        <main class="page">
            <HomPage />
        </main>
        <Footer />
    </div>
</template>

<script lang="ts">
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import HomPage from './components/HomPage.vue';

export default {
    components: {
        Header,
        Footer,
        HomPage
    },
    data() {
        return {
            mybe: 'Some title'
        };
    }
};
</script>

<style scoped></style>