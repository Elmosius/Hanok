<script setup lang="ts">
import { ref } from 'vue';
import gsap from 'gsap';
import Navbar from './components/Navbar';

const main = ref<HTMLElement | null>(null);
const openNav = ref(false);

const toggleNav = () => {
  if (!main.value) return;

  openNav.value = !openNav.value;

  const tl = gsap.timeline();

  if (openNav.value) {
    tl.to(main.value, { rotation: 10, x: 300, y: 450, scale: 1.5, duration: 1.5, ease: 'power4.inOut', delay: 0.1 });
  } else {
    tl.to(main.value, { rotation: 0, x: 0, y: 0, scale: 1, duration: 1.5, ease: 'power4.inOut' });
  }
};
</script>

<template>
  <Navbar @toggle-nav="toggleNav" :open-nav="openNav" />

  <main class="relative overflow-hidden origin-top-left" ref="main">
    <section class="relative h-screen overflow-hidden bg-amber-100">
      <h1 class="text-8xl h-screen font-bold flex justify-center items-center">hello world</h1>
    </section>

    <section class="relative h-screen overflow-hidden bg-amber-400">
      <h1 class="text-8xl h-screen font-bold flex justify-center items-center">hello world</h1>
    </section>
  </main>
</template>

<style scoped></style>
