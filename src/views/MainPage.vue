<template lang="">

    <!-- Masthead-->
    <header class="masthead" id="page-top">
        <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
            <div class="d-flex justify-content-center">
                <div class="text-center">

                    <h1 class="mx-auto my-0 text-uppercase">slabfmly</h1>
                    <h2 class="text-white-50 mx-auto mt-2 mb-5">Магазин скейтбордов и горнолыжного снаряжения в Узбекистане</h2>
                    <!-- <router-link to="/catalog"><a class="btn btn-primary" >Взглянуть на товар</a></router-link> -->
                </div>
            </div>
        </div>
    </header>
    <!-- About-->
    <section class="about-section text-center" id="about">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-lg-8">
                    <h2 class="text-white mb-4">Присоединяйся к нам!</h2>
                    <p class="text-white-50">
                        В основе наших принципов лежит равенство и сплоченность.<br>Приходи к нам в любое время и мы будем рады тебе. <br>Здесь мы живем в единстве и согласии.
                    </p>
                </div>
            </div>
            <img class="img-fluid" src="@/assets/img/SlabFMLY.png" alt="SLAB" width="600px"/>
        </div>
    </section>
    <!-- Projects-->
    <section class="projects-section bg-light" id="projects">
        <div class="container px-4 px-lg-5">
            <!-- Featured Project Row-->
            <div class="row gx-0 mb-4 mb-lg-5 align-items-center">
                <div class="col-xl-8 col-lg-7"><img class="img-fluid mb-3 mb-lg-0" src="@/assets/img/freedom-02.webp" alt="freedom"  style="{height: 300px}"/></div>
                <div class="col-xl-4 col-lg-5">
                    <div class="featured-text text-center text-lg-left">
                        <h4>Свобода</h4>
                        <p class="text-black-50 mb-0">Будь свободным!</p>
                    </div>
                </div>
            </div>
            <!-- Project One Row-->
            <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
                <div class="col-lg-6"><img class="img-fluid" src="@/assets/img/skateboard-01.webp" alt="skateboarding" /></div>
                <div class="col-lg-6">
                    <div class="bg-black text-center h-100 project">
                        <div class="d-flex h-100">
                            <div class="project-text w-100 my-auto text-center text-lg-left">
                                <h4 class="text-white">Летом</h4>
                                <p class="mb-0 text-white-50">Скейтборды, лонгборды, круизеры, пластборды ну все к ним!</p>
                                <hr class="d-none d-lg-block mb-0 ms-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Project Two Row-->
            <div class="row gx-0 justify-content-center">
                <div class="col-lg-6"><img class="img-fluid" src="@/assets/img/snowboard-02.webp" alt="snowboarding" /></div>
                <div class="col-lg-6 order-lg-first">
                    <div class="bg-black text-center h-100 project">
                        <div class="d-flex h-100">
                            <div class="project-text w-100 my-auto text-center text-lg-right">
                                <h4 class="text-white">Зимой</h4>
                                <p class="mb-0 text-white-50">Горные лыжи, сноубороды и все что нужно зимой в горах!</p>
                                <hr class="d-none d-lg-block mb-0 me-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Project Third Row-->
            <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
                <div class="col-lg-6"><img class="img-fluid" src="@/assets/img/camping.webp" alt="skateboarding" /></div>
                <div class="col-lg-6">
                    <div class="bg-black text-center h-100 project">
                        <div class="d-flex h-100">
                            <div class="project-text w-100 my-auto text-center text-lg-left">
                                <h4 class="text-white">Снаряжение в горы</h4>
                                <p class="mb-0 text-white-50">Рюкзаки, палатки, трекинговые палочки и все что нужно для похода в горы!</p>
                                <hr class="d-none d-lg-block mb-0 ms-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Signup-->
    

</template>
<script>
import { KinesisContainer, KinesisElement } from 'vue-kinesis'


export default {

}
</script>
<style src="@/css/styles.css"></style>