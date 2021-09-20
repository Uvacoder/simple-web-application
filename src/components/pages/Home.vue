<script>

import Navigation from './../structure/Navigation.vue';
import Footer     from './../structure/Footer.vue';

export default {
    name: 'Home',
    data: function() {
        return {

        };
    },
    components: {
        Navigation,
        Footer
    },
}
</script>

<template>
    <div class="fill-screen">
        <Navigation />
        <div class="content">
            <p>Hello World!</p>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 120px;
    }
</style>