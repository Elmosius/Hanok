<script setup lang="ts"></script>

<template>
  <section class="min-h-screen relative overflow-hidden py-25 lg:pt-48">
    <div class="h-full w-full px-15 md:px-30 container mx-auto relative">
      <div
        class="h-full w-full flex flex-col gap-y-2 text-accent font-medium relative"
      >
        <p class="md:text-xl lg:hidden">Traditional Harmony</p>
        <h2
          class="font-semibold text-5xl wrap-break-word md:text-7xl md:mt-5 lg:text-9xl"
        >
          Architecture
        </h2>
        <p class="font-light mt-3 md:text-xl lg:hidden">
          Every curve and detail of Hanok is designed to live in balance with
          nature — the sky, the seasons, and the land.
        </p>
      </div>

      <div
        class="h-full w-full pt-10 flex flex-col gap-y-10 text-accent md:pt-15 lg:pt-25"
      >
        <!-- img 1 -->
        <div class="container-img-architecture lg:flex-row lg:gap-x-10">
          <div class="w-full lg:w-7/12 xl:w-full h-full">
            <img
              class="img-architecture lg:w-100 lg:h-135 xl:w-140 xl:h-185"
              src="/images/architectures/1.jpg"
              alt="architecture1"
            />
            <div class="lg:flex lg:flex-row lg:pt-5 xl:w-140 wrap-break-word">
              <h3 class="title-architecture lg:flex-4">The Hanok Gate</h3>
              <p class="desc-architecture lg:flex-12">
                A sturdy wooden gate, framed by stone walls and curved tiles,
                welcoming guests with timeless warmth.
              </p>
            </div>
          </div>

          <div class="hidden lg:block w-1/2 h-full lg:mt-10 font-medium">
            <p class="md:text-xl lg:text-lg">Traditional Harmony</p>
            <p class="font-light mt-8 md:text-xl">
              Every curve and detail of Hanok is designed to live in balance
              with nature — the sky, the seasons, and the land.
            </p>
          </div>
        </div>

        <!--img 2-->
        <div
          class="container-img-architecture lg:absolute inset-0 lg:translate-x-[55%] lg:translate-y-[30%] xl:translate-x-[65%]"
        >
          <img
            class="img-architecture lg:w-85 lg:h-120"
            src="/images/architectures/2.jpg"
            alt="architecture2"
          />

          <div class="lg:flex lg:flex-row lg:pt-5 lg:w-84 wrap-break-word">
            <h3 class="title-architecture lg:flex-5">Curved Roofs</h3>
            <p class="desc-architecture lg:flex-9">
              Elegant rooflines of Hanok, built to flow with the wind, sunlight,
              and seasons.
            </p>
          </div>
        </div>

        <!--img 3-->
        <div
          class="container-img-architecture lg:flex lg:items-center lg:justify-center lg:translate-y-[45%] lg:translate-x-[12%] xl:translate-y-[30%]"
        >
          <img
            class="img-architecture lg:w-95 lg:h-135"
            src="/images/architectures/4.jpg"
            alt="architecture4"
          />

          <div class="lg:flex lg:flex-row lg:pt-5 lg:w-95 wrap-break-word">
            <h3 class="title-architecture lg:flex-10">Patterns of Tradition</h3>
            <p class="desc-architecture lg:flex-10">
              Intricate wooden patterns and vibrant colors that reflect Korea’s
              artistic heritage.
            </p>
          </div>
        </div>

        <!--img 4-->
        <div
          class="container-img-architecture lg:-translate-y-[25%] xl:-translate-y-[25%]"
        >
          <img
            class="img-architecture lg:w-65 lg:h-85"
            src="/images/architectures/3.jpg"
            alt="architecture3"
          />
          <div class="lg:flex lg:flex-row lg:pt-5 lg:w-65 wrap-break-word">
            <h3 class="title-architecture lg:flex-7">Inside Hanok</h3>
            <p class="desc-architecture lg:flex-8">
              Soft light passes through hanji doors, filling the wooden interior
              with calm and serenity.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
