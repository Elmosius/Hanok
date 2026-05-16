<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { INTRO_PRINCIPLES } from '../../constans';
import { killGsap, shouldAnimate } from '../../utils/motion';

const sectionRef = ref<HTMLElement | null>(null);
let tween: GSAPTween | null = null;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  if (!sectionRef.value) return;
  if (!shouldAnimate()) return;

  tween = gsap.from(sectionRef.value.querySelectorAll('.intro-reveal'), {
    y: 90,
    rotate: 3,
    opacity: 0,
    clipPath: 'inset(0% 0% 100% 0%)',
    duration: 1.35,
    stagger: 0.12,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top+=55%',
    },
  });
});

onBeforeUnmount(() => {
  killGsap(tween);
});
</script>

<template>
  <section ref="sectionRef" class="bg-primary text-accent px-6 md:px-12 lg:px-15 py-24 md:py-32 lg:py-44 overflow-hidden">
    <div class="container mx-auto grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
      <p class="intro-reveal text-sm md:text-base uppercase text-accent/55">A home in balance</p>

      <div class="space-y-10">
        <h2 class="intro-reveal text-5xl md:text-7xl lg:text-8xl leading-[0.92] font-medium">
          Built low to the earth, open to the seasons, and quiet enough to hear the day move.
        </h2>
        <div class="grid gap-8 md:grid-cols-2">
          <p class="intro-reveal text-xl md:text-2xl leading-snug text-accent/80">
            Hanok is not only architecture. It is a way of arranging light, air, family, and ritual around a softer rhythm.
          </p>
          <p class="intro-reveal text-base md:text-lg leading-relaxed text-accent/60">
            한옥 keeps the threshold between inside and outside intentionally gentle: paper doors, timber frames, heated floors, and courtyards that make weather part of the home.
          </p>
        </div>
      </div>
    </div>

    <div class="container mx-auto mt-24 md:mt-32 lg:mt-44">
      <div class="intro-reveal border-t border-accent/15 pt-8">
        <p class="text-sm uppercase text-accent/45">Three quiet principles</p>
      </div>
      <div class="mt-8 grid gap-px bg-accent/15 md:grid-cols-3">
        <article v-for="principle in INTRO_PRINCIPLES" :key="principle.label" class="intro-reveal bg-primary py-8 md:px-6 lg:py-12">
          <p class="text-sm uppercase text-accent/45">{{ principle.label }}</p>
          <h3 class="mt-8 max-w-sm text-3xl font-medium leading-tight md:text-4xl">{{ principle.title }}</h3>
          <p class="mt-6 max-w-sm text-base leading-relaxed text-accent/60">{{ principle.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
