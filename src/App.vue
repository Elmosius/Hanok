<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import gsap from 'gsap';
import Navbar from './components/Navbar';
import { useScrollLock } from './utils/scrollLock';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VueLenis } from 'lenis/vue';
import Hero from './components/Hero';
import Architecture from './components/Architecture';
import { useContrastNav } from './utils/contrastNav';
import Intro from './components/Intro';
import Interior from './components/Interior';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

const lenisRef = ref();
const { lock, unlock } = useScrollLock();
const main = ref<HTMLElement | null>(null);
const openNav = ref(false);

const { isContrast, registerSection, clear } = useContrastNav();
const introRef = ref<InstanceType<typeof Intro> | null>(null);
const architectureRef = ref<InstanceType<typeof Architecture> | null>(null);
const footerRef = ref<InstanceType<typeof Footer> | null>(null);

let tl: GSAPTimeline | null = null;

const toggleNav = () => {
  if (!main.value) return;

  openNav.value = !openNav.value;

  tl = gsap.timeline();

  if (openNav.value) {
    lock();
    tl.to(main.value, {
      rotation: 10,
      x: 300,
      y: 450,
      scale: 1.5,
      duration: 1.5,
      ease: 'power4.inOut',
      delay: 0.2,
    });
  } else {
    unlock();
    tl.to(main.value, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power4.inOut',
    });
  }
};

watchEffect((onInvalidate) => {
  if (!lenisRef.value?.lenis) return;
  lenisRef.value.lenis.on('scroll', ScrollTrigger.update);

  function update(time: number) {
    lenisRef.value.lenis.raf(time * 1000);
  }

  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);
  onInvalidate(() => {
    gsap.ticker.remove(update);
  });
});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (introRef.value) {
    registerSection({ el: introRef.value.$el, contrast: true });
  }
  if (architectureRef.value) {
    registerSection({ el: architectureRef.value.$el, contrast: true });
  }
  if (footerRef.value) {
    registerSection({ el: footerRef.value.$el, contrast: true });
  }
});

onBeforeUnmount(() => {
  tl?.kill();
  clear();
});
</script>

<template>
  <VueLenis root ref="lenisRef" :options="{ autoRaf: false }" />

  <Navbar @toggle-nav="toggleNav" :open-nav="openNav" :is-contrast="isContrast" />

  <main class="relative overflow-hidden origin-top-left will-change-transform" ref="main">
    <Hero />

    <Intro ref="introRef" />

    <Architecture ref="architectureRef" />

    <Interior />

    <Gallery />

    <Footer ref="footerRef" />
  </main>
</template>

<style scoped></style>
