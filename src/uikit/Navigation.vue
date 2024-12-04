<script lang="ts">
export default {
    props: {
        active: {
            type: Boolean,
            required: false
        }
    },

    data() {
        return {
            navigationData: [
                {
                    id: 1,
                    text: 'Каталог',
                    link: '/'
                },
                {
                    id: 2,
                    text: 'Доставка',
                    link: '/'
                },
                {
                    id: 3,
                    text: 'Оплата',
                    link: '/'
                },
                {
                    id: 4,
                    text: 'Контакты',
                    link: '/'
                },
                {
                    id: 5,
                    text: 'О  компании',
                    link: '/'
                }
            ]
        }
    }
}

</script>

<template>
    <div class="menu" :style="{ width: typeof active === 'boolean' ? (active ? '100%' : '0') : '0' }">
        <ul>
            <li v-for="el in navigationData" :key="el.id">
                <a :href="el.link">{{ el.text }}</a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" >
.menu {
    width: 100%;
    max-width: 546px;

    ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

        li {
            a {
                color: #343030;
                font-family: Merriweather;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 150%;
            }
        }
    }
}
</style>
