<script lang="ts">
import LocateIcon from '@/svg/LocateIcon.vue';
import PhoneIcon from '@/svg/PhoneIcon.vue';
import Navigation from '@/uikit/Navigation.vue';

export default {

    components: {
        Navigation,
        PhoneIcon,
        LocateIcon
    }

}
</script>

<template>
    <footer class="footer">
        <div class="footer__container container">
            <Navigation :active="true" />
            <div class="footer__contacts">
                <a href="tel:+78125555555">
                    <PhoneIcon />
                    +7 (812) 555-55-55
                </a>
                <a
                    href="https://yandex.com/maps/2/saint-petersburg/house/ulitsa_yefimova_3s/Z0kYdQVgSE0HQFtjfXVzdH1mYQ==/?ll=30.320180%2C59.925155&z=16">
                    <LocateIcon />
                    г. Санкт-Петербург, ул. Ефимова, 3
                </a>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" >
$md1: 1240px;
$md2: 1024px;
$md3: 768px;
$md4: 480px;
.footer {
    background: #ECEAEA;
    width: 100%;
    padding: 38px 20px;
    @media(max-width: $md3) {
        padding: 16px 20px;
    }
    .footer__container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        @media(max-width: $md2) {
            flex-direction: column;
        }
        .menu ul {
            @media(max-width: $md2) {
                flex-wrap: wrap;
                justify-content: center;
            }
        }
        .footer__contacts {
            width: 100%;
            max-width: 496px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            @media(max-width: $md2) {
                flex-wrap: wrap;
                justify-content: center;
            }
            a {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 8px;
                color: #555;
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
