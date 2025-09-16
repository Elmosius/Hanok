<script setup lang="ts">
import gsap from 'gsap';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const hover = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const isMobile = window.matchMedia('(max-width: 768px)').matches;
let tl: GSAPTimeline | null = null;

onMounted(() => {
  if (!containerRef.value) return;

  console.log(isMobile);
  if (isMobile) return;

  const img = containerRef.value.children[0] as HTMLElement;

  img.addEventListener('mouseenter', () => {
    hover.value = true;
  });

  img.addEventListener('mouseleave', () => {
    hover.value = false;
  });

  const text = containerRef.value.children[1] as HTMLElement;
  gsap.set(text, { clipPath: 'inset(0% 0% 100% 0%)', rotate: 3, y: 20 });
});

watch(hover, (newVal) => {
  if (!containerRef.value) return;
  if (isMobile) return;

  const text = containerRef.value.children[1] as HTMLElement;
  tl = gsap.timeline();
  if (newVal) {
    tl.to(text, {
      clipPath: 'inset(0% 0% 0% 0%)',
      rotate: 0,
      y: 0,
      duration: 1.4,
      ease: 'expo.out',
    });
  } else {
    tl.to(text, {
      clipPath: 'inset(100% 0% 0% 0%)',
      rotate: 2,
      y: -20,
      duration: 0.8,
      ease: 'expo.inOut',
      onComplete: () => {
        gsap.set(text, { clipPath: 'inset(0% 0% 100% 0%)', rotate: 3, y: 20 });
      },
    });
  }
});

onBeforeUnmount(() => {
  if (!containerRef.value) return;
  const img = containerRef.value.children[0] as HTMLElement;

  img.removeEventListener('mouseenter', () => {
    hover.value = true;
  });

  img.removeEventListener('mouseleave', () => {
    hover.value = false;
  });

  tl?.kill();
});
</script>

<template>
  <div ref="containerRef">
    <slot />
  </div>
</template>
