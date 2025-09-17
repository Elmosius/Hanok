<script setup lang="ts">
import { IMAGE_HERO } from '../../constans';
import gsap from 'gsap';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const imgHeroRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);

let tl: GSAPTimeline | null = null;
let tween: GSAPTween | null = null;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (!imgHeroRef.value || !titleRef.value) return;

  tween = gsap.from(titleRef.value.children, {
    y: 100,
    rotate: 5,
    clipPath: 'inset(0% 0% 100% 0%)',
    duration: 1.25,
    stagger: 0.5,
    ease: 'power4.out',
  });

  tl = gsap.timeline().fromTo(
    imgHeroRef.value,
    {
      yPercent: -15,
    },
    {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    }
  );
});

onBeforeUnmount(() => {
  tween?.kill();
  tl?.scrollTrigger?.kill();
  tl?.kill();
});
</script>

<template>
  <section class="relative h-screen lg:h-[150vh] overflow-hidden" id="home">
    <div class="w-full h-full relative">
      <div class="h-full px-15 md:px-30 container mx-auto absolute inset-0 z-10 flex flex-col gap-y-2 justify-center" ref="titleRef">
        <h1 class="text-5xl md:text-7xl lg:text-9xl text-primary font-medium will-change-transform">The Beauty of Hanok</h1>
        <p class="md:text-xl lg:text-3xl text-primary/95 font-light will-change-transform">
          Timeless Korean traditional houses that embrace <br />
          warmth and harmony
        </p>
      </div>

      <img ref="imgHeroRef" :src="IMAGE_HERO" alt="home" class="w-full h-[120%] object-cover brightness-90 z-5 will-change-transform" />
    </div>
  </section>
</template>

<style scoped></style>
