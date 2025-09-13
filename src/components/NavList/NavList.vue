<script setup lang="ts">
import { ref, watch } from "vue";
import gsap from "gsap";

const navList = ref<HTMLElement | null>(null);
const navListHover = ref(false);

watch(navListHover, (newValue) => {
  if (!navList.value) return;

  const parent = navList.value.children[0] as HTMLElement;
  const border = parent.children[1] as HTMLElement;

  if (newValue) {
    gsap.to(border, {
      scaleX: 1,
      duration: 0.5,
      ease: "expo.in",
      transformOrigin: "left",
    });
  } else {
    gsap.to(border, {
      scaleX: 0,
      duration: 0.5,
      ease: "expo.in",
      transformOrigin: "right",
    });
  }
});
</script>

<template>
  <div
    ref="navList"
    @mouseenter="navListHover = true"
    @mouseleave="navListHover = false"
  >
    <slot />
  </div>
</template>
