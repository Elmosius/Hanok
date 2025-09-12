<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import { useScrollLock } from "./utils/scrollLock.ts";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VueLenis } from "lenis/vue";

const lenisRef = ref();
const { lock, unlock } = useScrollLock();
const main = ref<HTMLElement | null>(null);
const openNav = ref(false);

const toggleNav = () => {
  if (!main.value) return;

  openNav.value = !openNav.value;

  const tl = gsap.timeline();

  if (openNav.value) {
    lock();
    tl.to(main.value, {
      rotation: 10,
      x: 300,
      y: 450,
      scale: 1.5,
      duration: 1.5,
      ease: "power4.inOut",
      delay: 0.1,
    });
  } else {
    unlock();
    tl.to(main.value, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power4.inOut",
    });
  }
};

watchEffect((onInvalidate) => {
  if (!lenisRef.value?.lenis) return;
  lenisRef.value.lenis.on("scroll", ScrollTrigger.update);

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
});
</script>

<template>
  <VueLenis root ref="lenisRef" :options="{ autoRaf: false }" />

  <Navbar @toggle-nav="toggleNav" :open-nav="openNav" />

  <main class="relative overflow-hidden origin-top-left" ref="main">
    <section class="relative h-screen overflow-hidden bg-amber-100" id="home">
      <h1 class="text-8xl h-screen font-bold flex justify-center items-center">
        hello world
      </h1>
    </section>

    <section
      class="relative h-screen overflow-hidden bg-amber-400"
      id="architecture"
    >
      <h1 class="text-8xl h-screen font-bold flex justify-center items-center">
        hello world
      </h1>
    </section>
  </main>
</template>

<style scoped></style>
