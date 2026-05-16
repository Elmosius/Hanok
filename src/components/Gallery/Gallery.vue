<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { GALLERY_ITEMS, GALLERY_MOMENTS } from '../../constans';
import { killGsap, shouldAnimate, shouldUseScrollMotion } from '../../utils/motion';

const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);

let tween: GSAPTween | null = null;
let reveal: GSAPTween | null = null;

const imageFrameClass = (shape: string) => {
  if (shape === 'wide') return 'h-[46vh] md:h-[54vh] lg:h-[58vh]';
  if (shape === 'compact') return 'h-[52vh] mt-10 md:h-[46vh] md:mt-28';
  return 'h-[68vh] md:h-[74vh]';
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  if (!sectionRef.value || !trackRef.value) return;

  if (shouldAnimate()) {
    reveal = gsap.from(sectionRef.value.querySelectorAll('.gallery-reveal'), {
      y: 70,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top+=55%',
      },
    });
  }

  if (shouldUseScrollMotion()) {
    tween = gsap.to(trackRef.value, {
      xPercent: -55,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
});

onBeforeUnmount(() => {
  killGsap(reveal);
  killGsap(tween);
});
</script>

<template>
  <section id="gallery" ref="sectionRef" class="bg-accent text-primary overflow-hidden py-24 md:py-32 lg:py-44">
    <div class="px-6 md:px-12 lg:px-15">
      <div class="container mx-auto flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="gallery-reveal text-sm md:text-base uppercase text-primary/55">Gallery / 장면</p>
          <h2 class="gallery-reveal mt-4 text-5xl md:text-7xl lg:text-8xl leading-[0.95] font-medium">A slower way to look.</h2>
        </div>
        <p class="gallery-reveal max-w-md text-base md:text-lg text-primary/60">
          Fragments of roof, gate, pattern, room, and village street become one continuous memory of the house.
        </p>
      </div>
    </div>

    <div ref="trackRef" class="mt-16 flex w-max gap-5 px-6 md:mt-24 md:gap-8 md:px-12 lg:px-15 will-change-transform">
      <figure
        v-for="(item, index) in GALLERY_ITEMS"
        :key="item.label"
        :class="['gallery-reveal', item.shape === 'wide' ? 'w-[84vw] md:w-[48vw] lg:w-[42vw]' : 'w-[68vw] md:w-[32vw] lg:w-[28vw]']"
      >
        <div :class="['overflow-hidden bg-primary/10', imageFrameClass(item.shape)]">
          <img :src="item.image" :alt="item.alt" class="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" decoding="async" />
        </div>
        <figcaption class="mt-4 grid grid-cols-[1fr_auto] gap-4 text-sm text-primary/55">
          <span>
            {{ item.label }}
            <span v-if="item.credit" class="block text-xs text-primary/35">{{ item.credit }}</span>
          </span>
          <span class="text-right">{{ String(index + 1).padStart(2, '0') }}</span>
        </figcaption>
      </figure>
    </div>

    <div class="px-6 md:px-12 lg:px-15">
      <div class="container mx-auto mt-20 grid gap-8 border-t border-primary/15 pt-10 md:grid-cols-[0.4fr_1fr] md:gap-16">
        <p class="gallery-reveal text-sm uppercase text-primary/45">What the sequence holds</p>
        <div class="grid gap-px bg-primary/15 md:grid-cols-2">
          <p v-for="moment in GALLERY_MOMENTS" :key="moment" class="gallery-reveal bg-accent py-6 text-2xl leading-tight md:px-6 md:py-8 md:text-3xl">
            {{ moment }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
