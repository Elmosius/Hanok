<script setup lang="ts">
import gsap from 'gsap';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import HoverArchitecture from '../HoverArchitecture';
import { ARCHITECTURE_FEATURES, ARCHITECTURE_ITEMS } from '../../constans';
import { killGsap, shouldAnimate, shouldUseScrollMotion } from '../../utils/motion';

const title = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const img2 = ref<HTMLElement | null>(null);
const img3 = ref<HTMLElement | null>(null);

let tween: GSAPTween | null = null;
let tl: GSAPTimeline | null = null;
let detailTween: GSAPTween | null = null;

onMounted(() => {
  if (!container.value) return;

  if (shouldAnimate()) {
    detailTween = gsap.from(container.value.querySelectorAll('.architecture-reveal'), {
      y: 70,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: container.value.querySelector('.architecture-details'),
        start: 'top top+=70%',
      },
    });
  }

  if (!shouldUseScrollMotion()) return;
  if (!title.value || !container.value || !img2.value || !img3.value) return;

  tween = gsap.fromTo(
    title.value,
    { y: 80, clipPath: 'inset(0% 0% 100% 0%)', rotate: 5 },
    {
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      rotate: 0,
      duration: 2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: container.value,
        start: 'top top+=35%',
        markers: false,
      },
    }
  );

  tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: container.value,
        start: 'top top',
        end: 'bottom bottom-=20%',
        scrub: true,
        markers: false,
      },
    })
    .to(img2.value, { y: '-=36' })
    .to(img3.value, { y: '-=48' }, '-=0.2');
});

onBeforeUnmount(() => {
  killGsap(tween);
  killGsap(tl);
  killGsap(detailTween);
});
</script>

<template>
  <section class="min-h-screen relative overflow-hidden bg-primary py-24 md:py-30 lg:pt-48" id="architecture" ref="container">
    <div class="h-full w-full px-6 md:px-12 lg:px-30 container mx-auto relative">
      <div class="h-full w-full flex flex-col gap-y-2 text-accent font-medium relative">
        <p class="md:text-xl lg:hidden">Traditional Harmony</p>
        <h2 class="font-semibold text-5xl wrap-break-word md:text-7xl md:mt-5 lg:text-9xl will-change-transform" ref="title">Architecture</h2>
        <p class="font-light mt-3 md:text-xl lg:hidden">Every curve and detail is designed to live in balance with sky, season, and land.</p>
      </div>

      <div class="h-full w-full pt-10 flex flex-col gap-y-12 text-accent md:pt-15 lg:grid lg:min-h-[270vh] lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-44 lg:pt-25 xl:min-h-[300vh]">
        <!-- img 1 -->
        <div class="container-img-architecture lg:col-span-5 lg:flex-row lg:gap-x-10">
          <div class="w-full h-full">
            <HoverArchitecture>
              <img class="img-architecture lg:h-135 lg:w-full xl:h-150" :src="ARCHITECTURE_ITEMS[0].image" :alt="ARCHITECTURE_ITEMS[0].alt" loading="lazy" decoding="async" />
              <div class="lg:flex lg:flex-row lg:pt-5 wrap-break-word will-change-transform">
                <h3 class="title-architecture lg:flex-4">{{ ARCHITECTURE_ITEMS[0].title }}</h3>
                <p class="desc-architecture lg:flex-12">
                  {{ ARCHITECTURE_ITEMS[0].description }}
                  <span v-if="ARCHITECTURE_ITEMS[0].credit" class="mt-2 block text-xs text-accent/40">{{ ARCHITECTURE_ITEMS[0].credit }}</span>
                </p>
              </div>
            </HoverArchitecture>
          </div>
        </div>

        <div class="hidden lg:col-span-4 lg:col-start-8 lg:mt-28 lg:block h-full font-medium">
          <p class="md:text-xl lg:text-lg">Traditional Harmony</p>
          <p class="font-light mt-8 md:text-xl">Every curve and detail is designed to live in balance with sky, season, and land.</p>
        </div>

        <!--img 2-->
        <div class="container-img-architecture will-change-transform lg:col-span-4 lg:col-start-8 lg:row-start-2 lg:mt-12 xl:mt-20" ref="img2">
          <HoverArchitecture>
            <img class="img-architecture lg:h-112 lg:w-full xl:h-120" :src="ARCHITECTURE_ITEMS[1].image" :alt="ARCHITECTURE_ITEMS[1].alt" loading="lazy" decoding="async" />

            <div class="lg:flex lg:flex-row lg:pt-5 wrap-break-word will-change-transform">
              <h3 class="title-architecture lg:flex-5">{{ ARCHITECTURE_ITEMS[1].title }}</h3>
              <p class="desc-architecture lg:flex-9">
                {{ ARCHITECTURE_ITEMS[1].description }}
                <span v-if="ARCHITECTURE_ITEMS[1].credit" class="mt-2 block text-xs text-accent/40">{{ ARCHITECTURE_ITEMS[1].credit }}</span>
              </p>
            </div>
          </HoverArchitecture>
        </div>

        <!--img 3-->
        <div class="container-img-architecture lg:col-span-5 lg:col-start-7 lg:row-start-4 lg:flex lg:items-center lg:justify-center" ref="img3">
          <HoverArchitecture>
            <img class="img-architecture lg:h-125 lg:w-full xl:h-135" :src="ARCHITECTURE_ITEMS[2].image" :alt="ARCHITECTURE_ITEMS[2].alt" loading="lazy" decoding="async" />

            <div class="lg:flex lg:flex-row lg:pt-5 wrap-break-word will-change-transform">
              <h3 class="title-architecture lg:flex-10">{{ ARCHITECTURE_ITEMS[2].title }}</h3>
              <p class="desc-architecture lg:flex-10">
                {{ ARCHITECTURE_ITEMS[2].description }}
                <span v-if="ARCHITECTURE_ITEMS[2].credit" class="mt-2 block text-xs text-accent/40">{{ ARCHITECTURE_ITEMS[2].credit }}</span>
              </p>
            </div>
          </HoverArchitecture>
        </div>

        <!--img 4-->
        <div class="container-img-architecture lg:col-span-3 lg:col-start-2 lg:row-start-3 lg:mt-36 xl:mt-44">
          <HoverArchitecture>
            <img class="img-architecture lg:h-90 lg:w-full" :src="ARCHITECTURE_ITEMS[3].image" :alt="ARCHITECTURE_ITEMS[3].alt" loading="lazy" decoding="async" />
            <div class="lg:flex lg:flex-row lg:pt-5 wrap-break-word will-change-transform">
              <h3 class="title-architecture lg:flex-7">{{ ARCHITECTURE_ITEMS[3].title }}</h3>
              <p class="desc-architecture lg:flex-8">
                {{ ARCHITECTURE_ITEMS[3].description }}
                <span v-if="ARCHITECTURE_ITEMS[3].credit" class="mt-2 block text-xs text-accent/40">{{ ARCHITECTURE_ITEMS[3].credit }}</span>
              </p>
            </div>
          </HoverArchitecture>
        </div>
      </div>

      <div class="architecture-details mt-20 border-t border-accent/15 pt-10 text-accent md:mt-28 lg:mt-40">
        <div class="architecture-reveal grid gap-6 md:grid-cols-[0.45fr_1fr]">
          <p class="text-sm uppercase text-accent/45">Reading the house</p>
          <p class="max-w-4xl text-3xl leading-tight md:text-5xl lg:text-6xl">
            Hanok architecture is a sequence of decisions: how the roof meets the sky, how the gate slows arrival, and how detail turns structure into feeling.
          </p>
        </div>

        <div class="mt-12 divide-y divide-accent/15">
          <article v-for="feature in ARCHITECTURE_FEATURES" :key="feature.title" class="architecture-reveal grid gap-5 py-8 md:grid-cols-[0.22fr_0.42fr_1fr] md:items-start">
            <p class="text-sm uppercase text-accent/45">{{ feature.eyebrow }}</p>
            <h3 class="text-2xl font-medium leading-tight md:text-3xl">{{ feature.title }}</h3>
            <p class="max-w-2xl text-base leading-relaxed text-accent/60 md:text-lg">{{ feature.description }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
