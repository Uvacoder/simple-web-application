<script>

    export default {
        name: 'Navigation',
        data: function() {
            return {
                active: false
            };
        },
    };
</script>

<template>
    <transition name="slide-down">
        <!-- <headroom> -->
            <div class="banner">
                <nav>
                    <transition name="entry-very-slow">
                        <router-link v-show="active" class="capitalised" to="/">Home</router-link>
                    </transition>
                    <transition name="slide-down">
                        <div id="burger-menu">
                            <input v-model="active" type="checkbox" />
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </transition>
                </nav>
            </div>
        <!-- </headroom> -->
    </transition>
</template>

<style scoped>
    /* Animation */
    .slide-down-enter, .slide-down-leave-to {
        opacity: 0;
        transform: translateY(-60px);
    }
    .slide-down-enter-active, .slide-down-leave-active {
        transition: all 0.8s ease-out;
    }
    .slide-down-enter #burger-menu span, .slide-down-leave-to #burger-menu span {
        background: black;
    }
    .slide-down-enter-active #burger-menu span, .slide-down-leave-active #burger-menu span {
        transition: all 1.5s;
    }
    .slide-down-enter.banner, .slide-down-leave-to.banner {
        opacity: 1;
    }
    .slide-down-enter-active.banner, .slide-down-leave-active.banner {
        transition: all 1.5s;
    }
    .entry-very-slow-enter-active {
        transition: all 0.6s;
    }
    .entry-slow-enter-active {
        transition: all 0.5s;
    }
    .entry-medium-enter-active {
        transition: all 0.4s;
    }
    .entry-fast-enter-active {
        transition: all 0.3s;
    }
    .entry-very-slow-leave-active,
    .entry-slow-leave-active,
    .entry-medium-leave-active,
    .entry-fast-leave-active {
        transition: all 0.3s;
    }
    .entry-very-slow-enter, .entry-very-slow-leave-to,
    .entry-slow-enter, .entry-slow-leave-to,
    .entry-medium-enter, .entry-medium-leave-to,
    .entry-fast-enter, .entry-fast-leave-to {
        opacity: 0;
    }
    .entry-very-slow-enter, .entry-very-slow-leave-to {
        transform: translateX(80px);
    }
    .entry-slow-enter, .entry-slow-leave-to {
        transform: translateX(64px);
    }
    .entry-medium-enter, .entry-medium-leave-to {
        transform: translateX(48px);
    }
    .entry-fast-enter, .entry-fast-leave-to {
        transform: translateX(32px);
    }

    .banner {
        width: 100vw;
        height: 116px;
        background: #FBFCF9;
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
        z-index: 2;
    }

    /* Navigation */
    nav {
        position: absolute;
        top: 24px;
        right: 0;
        padding: 24px 64px;
        margin: 0 40px;
        text-align: right;
        line-height: 1.3;
        z-index: 2;
        transition: all 0.2s;
    }
    nav > a {
        color: black;
        display: inline-block;
        margin: 0 12px;
        text-decoration: none;  
        position: relative;      
    }
    @media only screen and (max-width: 600px) {
        nav {
            padding: 48px 0 0 0;
            margin: 0;
            text-align: center;
            background: #FBFCF9;
            height: 100vh;
        }
        nav > a {
            margin: 0;
            padding: 24px 64px;
            width: 100%;
        }
    }

    /* Burger Menu */
    #burger-menu {
        display: inline-block;
        position: absolute;
        top: 22px;
        right: 0px;
        
        z-index: 1;
        
        -webkit-user-select: none;
        user-select: none;
    }

    #burger-menu a {
        text-decoration: none;
        color: #232323;
        
        transition: color 0.3s ease;
    }

    #burger-menu a:hover {
        color: tomato;
    }


    #burger-menu input {
        display: block;
        width: 40px;
        height: 32px;
        position: absolute;
        top: -7px;
        left: -5px;
        
        cursor: pointer;
        
        opacity: 0; /* hide this */
        z-index: 2; /* and place it over the hamburger-menu */
        
        -webkit-touch-callout: none;
    }

    /*
    * Just a quick hamburger-menu
    */
    #burger-menu span {
        display: block;
        width: 33px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;
        
        background: #cdcdcd;
        border-radius: 3px;
        
        z-index: 1;
        
        transform-origin: 4px 0px;
        
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    opacity 0.55s ease;
    }

    #burger-menu span:first-child {
        transform-origin: 0% 0%;
    }

    #burger-menu span:nth-last-child(2) {
        transform-origin: 0% 100%;
    }

    /* 
    * Transform all the slices of hamburger-menu
    * into a crossmark.
    */
    #burger-menu input:checked ~ span {
        opacity: 1;
        transform: rotate(45deg) translate(-8px, -16px);
        background: #232323;
    }

    /*
    * But let's hide the middle one.
    */
    #burger-menu input:checked ~ span:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
    }

    /*
    * Ohyeah and the last one should go the other direction
    */
    #burger-menu input:checked ~ span:nth-last-child(2) {
        transform: rotate(-45deg) translate(-3px, 12px);
    }

    @media only screen and (max-width: 600px) {
        #burger-menu {
            right: 24px;
        }
    }
</style>
