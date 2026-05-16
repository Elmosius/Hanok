<script setup lang="ts">
import gsap from 'gsap';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { isMobileViewport, killGsap } from '../../utils/motion';

const hover = ref(false);
const containerRef = ref<HTMLElement | null>(null);

let tl: GSAPTimeline | null = null;
const onMouseEnter = () => {
  hover.value = true;
};
const onMouseLeave = () => {
  hover.value = false;
};

onMounted(() => {
  if (!containerRef.value) return;
  if (isMobileViewport()) return;

  const img = containerRef.value.children[0] as HTMLElement;

  img.addEventListener('mouseenter', onMouseEnter);
  img.addEventListener('mouseleave', onMouseLeave);

  const text = containerRef.value.children[1] as HTMLElement;
  gsap.set(text, { clipPath: 'inset(0% 0% 100% 0%)', rotate: 3, y: 20 });
});

watch(hover, (newVal) => {
  if (!containerRef.value) return;
  if (isMobileViewport()) return;

  const text = containerRef.value.children[1] as HTMLElement;
  tl = gsap.timeline();
  if (newVal) {
    gsap.set(text, {
      clipPath: 'inset(0% 0% 100% 0%)',
      rotate: 3,
      y: 20,
    });

    tl.to(text, {
      clipPath: 'inset(0% 0% 0% 0%)',
      rotate: 0,
      y: 0,
      duration: 0.8,
      ease: 'expo.out',
    });
  } else {
    tl.to(text, {
      clipPath: 'inset(100% 0% 0% 0%)',
      rotate: -3,
      y: -20,
      duration: 0.8,
      ease: 'expo.inOut',
      onComplete: () => {
        gsap.set(text, {
          clipPath: 'inset(0% 0% 100% 0%)',
          rotate: 3,
          y: 20,
        });
      },
    });
  }
});

onBeforeUnmount(() => {
  if (!containerRef.value) return;
  const img = containerRef.value.children[0] as HTMLElement;

  img.removeEventListener('mouseenter', onMouseEnter);
  img.removeEventListener('mouseleave', onMouseLeave);

  killGsap(tl);
});
</script>

<template>
  <div ref="containerRef">
    <slot />
  </div>
</template>
