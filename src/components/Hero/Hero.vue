<script setup lang="ts">
import { HERO_INDEX_ITEMS, IMAGE_HERO } from '../../constans';
import gsap from 'gsap';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { killGsap, shouldAnimate, shouldUseScrollMotion } from '../../utils/motion';
import { scrollToSection } from '../../utils/navigation';

const imgHeroRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const metaRef = ref<HTMLElement | null>(null);
const stripRef = ref<HTMLElement | null>(null);

let tl: GSAPTimeline | null = null;
let tween: GSAPTimeline | null = null;
let stripTween: GSAPTimeline | null = null;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (!imgHeroRef.value || !titleRef.value || !metaRef.value || !stripRef.value) return;

  if (shouldAnimate()) {
    tween = gsap
      .timeline()
      .from(titleRef.value.children, {
        y: 120,
        rotate: 4,
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1.25,
        stagger: 0.18,
        ease: 'power4.out',
      })
      .from(
        metaRef.value.children,
        {
          opacity: 0,
          y: 28,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.65'
      )
      .from(
        stripRef.value.children,
        {
          y: 42,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.45'
      );
  }

  if (shouldUseScrollMotion()) {
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

    stripTween = gsap.timeline().to(stripRef.value, {
      y: -34,
      ease: 'none',
      scrollTrigger: {
        trigger: stripRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
});

onBeforeUnmount(() => {
  killGsap(tween);
  killGsap(tl);
  killGsap(stripTween);
});
</script>

<template>
  <section class="relative h-[100svh] lg:h-screen overflow-hidden bg-accent" id="home">
    <div class="w-full h-full relative">
      <div class="min-h-[100svh] lg:min-h-screen px-6 md:px-12 lg:px-15 container mx-auto absolute inset-0 z-10 flex flex-col justify-end pb-10 md:pb-18 lg:pb-36">
        <div class="overflow-hidden" ref="titleRef">
          <p class="text-primary/75 text-sm md:text-base uppercase mb-3 will-change-transform">한옥 / Traditional Korean House</p>
          <h1 class="text-[22vw] leading-[0.78] md:text-[15vw] lg:text-[13.5vw] text-primary font-semibold will-change-transform">Hanok</h1>
        </div>

        <div ref="metaRef" class="mt-6 md:mt-8 grid gap-5 text-primary md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1fr_0.45fr]">
          <p class="max-w-3xl text-2xl md:text-3xl lg:text-4xl leading-tight font-light will-change-transform">
            A house shaped by seasons, silence, wood, paper, and light.
          </p>
          <div class="flex items-end justify-between gap-6 md:block">
            <p class="max-w-xs text-sm md:text-base text-primary/70 leading-relaxed will-change-transform">
              An interactive showcase of Korean traditional living, reimagined as a cinematic scroll experience.
            </p>
            <p class="text-xs md:text-sm text-primary/60 uppercase mt-6 will-change-transform">Scroll to enter</p>
          </div>
        </div>
      </div>

      <img
        ref="imgHeroRef"
        :src="IMAGE_HERO"
        alt="Hanok roof against the sky"
        class="w-full h-[112%] object-cover brightness-75 z-5 will-change-transform"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-accent via-accent/25 to-accent/10 z-6" />
    </div>
  </section>

  <section ref="stripRef" class="relative z-20 bg-accent text-primary border-y border-primary/15 md:-mt-24 will-change-transform">
    <div class="container mx-auto px-6 md:px-12 lg:px-15">
      <div class="grid gap-px bg-primary/15 md:grid-cols-3">
        <button
          v-for="item in HERO_INDEX_ITEMS"
          :key="item.id"
          class="group grid min-h-44 grid-cols-[5rem_1fr] gap-5 bg-accent py-6 text-left md:min-h-52 md:grid-cols-[6rem_1fr] md:px-6 lg:min-h-56"
          @click="scrollToSection(item.id)"
        >
          <div class="overflow-hidden">
            <img
              :src="item.image"
              :alt="`${item.title} preview`"
              class="h-24 w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-100 md:h-32"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span class="flex flex-col justify-between">
            <span class="text-xs uppercase text-primary/45">{{ item.number }}</span>
            <span>
              <span class="block text-2xl font-medium md:text-3xl">{{ item.title }}</span>
              <span class="mt-3 block max-w-xs text-sm leading-relaxed text-primary/55">{{ item.description }}</span>
            </span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
