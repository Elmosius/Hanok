<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { FOOTER_STORY_LINKS, IMAGE_CREDITS } from '../../constans';
import { killGsap, shouldAnimate } from '../../utils/motion';
import { scrollToSection } from '../../utils/navigation';

const footerRef = ref<HTMLElement | null>(null);
let tween: GSAPTween | null = null;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  if (!footerRef.value) return;
  if (!shouldAnimate()) return;

  tween = gsap.from(footerRef.value.querySelectorAll('.footer-reveal'), {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.14,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: footerRef.value,
      start: 'top top+=60%',
    },
  });
});

onBeforeUnmount(() => {
  killGsap(tween);
});
</script>

<template>
  <footer ref="footerRef" class="bg-primary text-accent px-6 md:px-12 lg:px-15 py-20 md:py-28">
    <div class="container mx-auto">
      <div class="grid gap-12 border-t border-accent/15 pt-10 md:grid-cols-[1fr_0.6fr] md:gap-20">
        <div>
          <p class="footer-reveal text-sm md:text-base uppercase text-accent/50">한옥</p>
          <h2 class="footer-reveal mt-6 text-5xl md:text-7xl lg:text-9xl leading-[0.9] font-semibold">Living with the seasons.</h2>
        </div>
        <div class="footer-reveal self-end space-y-8 text-accent/60">
          <p class="text-lg md:text-xl leading-snug">
            A one-page interactive study of Korean traditional homes, made with Vue, GSAP, and a little reverence for quiet spaces.
          </p>
          <div class="flex justify-between gap-8 text-sm uppercase text-accent/45">
            <span>Hanok Showcase</span>
            <span>2026</span>
          </div>
        </div>
      </div>
      <div class="footer-reveal mt-16 grid gap-8 border-t border-accent/15 pt-8 md:grid-cols-[0.35fr_1fr]">
        <p class="text-xs uppercase text-accent/45">Continue the path</p>
        <div class="grid gap-px bg-accent/15 md:grid-cols-4">
          <button
            v-for="link in FOOTER_STORY_LINKS"
            :key="link.id"
            class="bg-primary py-6 text-left text-xl leading-tight transition-colors hover:text-accent/55 md:px-5"
            @click="scrollToSection(link.id)"
          >
            {{ link.label }}
          </button>
        </div>
      </div>
      <div class="footer-reveal mt-16 border-t border-accent/15 pt-8">
        <p class="text-xs uppercase text-accent/45">Selected image credits</p>
        <div class="mt-4 grid gap-3 text-xs text-accent/45 md:grid-cols-2 lg:grid-cols-4">
          <a v-for="credit in IMAGE_CREDITS" :key="credit.label" :href="credit.source" target="_blank" rel="noreferrer" class="leading-relaxed hover:text-accent">
            {{ credit.label }}
            <span class="block">{{ credit.author }} / {{ credit.license }}</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
