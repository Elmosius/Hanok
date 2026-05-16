<script setup lang="ts">
import { House, X } from 'lucide-vue-next';
import gsap from 'gsap';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import NavList from '../NavList';
import { navList } from './navbar';
import { useScrollLock } from '../../utils/scrollLock';
import { killGsap, shouldAnimate } from '../../utils/motion';

const currentImage = ref(navList[0].image);
const incomingImage = ref<string | null>(null);
const activePreviewIndex = ref(0);

const currentPreviewRef = ref<HTMLImageElement | null>(null);
const incomingPreviewRef = ref<HTMLImageElement | null>(null);
const containerOverlay = ref<HTMLElement | null>(null);
const contentOverlay = ref<HTMLElement | null>(null);
const navListRef = ref<HTMLElement | null>(null);
const menuOverlayRef = ref<HTMLElement | null>(null);

let tl: any = null;
let previewTween: gsap.core.Timeline | null = null;
let previewTransitionId = 0;
const preloadedImages = new Set<string>();

const emits = defineEmits<{
  (e: 'toggleNav'): void;
}>();

const { openNav, isContrast } = defineProps<{
  openNav: boolean;
  isContrast: boolean;
}>();

const { scrollToId } = useScrollLock();

const preloadNavImages = () => {
  navList.forEach(({ image }) => {
    if (preloadedImages.has(image)) return;
    const preload = new Image();
    preload.src = image;
    preloadedImages.add(image);
  });
};

onMounted(() => {
  if (!containerOverlay.value || !contentOverlay.value || !navListRef.value || !menuOverlayRef.value) return;

  gsap.set(navListRef.value.children, {
    y: 50,
    clipPath: 'inset(0% 0% 100% 0%)',
    rotate: 5,
  });

  gsap.set(contentOverlay.value, {
    opacity: 0.25,
    translateX: -100,
    translateY: -100,
    scale: 1.5,
    rotate: 30,
  });
  gsap.set(containerOverlay.value, {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
  });
});

watch(
  () => openNav,
  (isOpen) => {
    tl?.kill();

    const menuOverlayChildren = menuOverlayRef.value?.children as HTMLCollection;

    tl = gsap.timeline();
    if (isOpen) {
      preloadNavImages();

      tl.to(containerOverlay.value, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 175%)',
        duration: 1.5,
        ease: 'expo.inOut',
      })
        .to(
          contentOverlay.value,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.5,
            translateX: 0,
            translateY: 0,
            ease: 'expo.inOut',
          },
          0
        )
        .to(
          navListRef.value?.children,
          {
            y: 0,
            duration: 1.5,
            rotate: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            stagger: 0.3,
            ease: 'power4',
          },
          '-=0.8'
        )
        .from(
          menuOverlayChildren,
          {
            delay: 0.2,
            rotate: -3,
            duration: 1.5,
            ease: 'expo.inOut',
            stagger: 0.3,
            opacity: 0,
          },
          0
        );
    } else {
      tl.to(containerOverlay.value, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.5,
        ease: 'expo.inOut',
        onComplete: () => {
          if (!navListRef.value) return;
          gsap.set(navListRef.value.children, {
            y: 50,
            clipPath: 'inset(100% 0% 0% 0%)',
            rotate: 5,
          });
        },
      }).to(
        contentOverlay.value,
        {
          opacity: 0.25,
          duration: 1.5,
          translateX: -100,
          translateY: -100,
          scale: 1.5,
          rotate: 30,
          delay: 0.7,
        },
        0
      );
    }
  }
);

const changeImage = async (index: number) => {
  const nextImage = navList[index]?.image;
  if (!nextImage || index === activePreviewIndex.value) return;

  const transitionId = ++previewTransitionId;
  activePreviewIndex.value = index;
  killGsap(previewTween);
  previewTween = null;

  if (incomingImage.value) {
    currentImage.value = incomingImage.value;
    incomingImage.value = null;
    await nextTick();
    if (transitionId !== previewTransitionId) return;
  }

  if (!shouldAnimate()) {
    currentImage.value = nextImage;
    return;
  }

  incomingImage.value = nextImage;
  await nextTick();
  if (transitionId !== previewTransitionId) return;

  if (!currentPreviewRef.value || !incomingPreviewRef.value) {
    currentImage.value = nextImage;
    incomingImage.value = null;
    return;
  }

  gsap.set(currentPreviewRef.value, { opacity: 1, scale: 1, yPercent: 0 });
  gsap.set(incomingPreviewRef.value, { opacity: 0, scale: 1.06, yPercent: 4 });

  previewTween = gsap.timeline({
    onComplete: () => {
      if (transitionId !== previewTransitionId) return;

      currentImage.value = nextImage;
      incomingImage.value = null;
      previewTween = null;

      requestAnimationFrame(() => {
        if (!currentPreviewRef.value) return;
        gsap.set(currentPreviewRef.value, { opacity: 1, scale: 1, yPercent: 0 });
      });
    },
  });

  previewTween
    .to(currentPreviewRef.value, { opacity: 0, scale: 0.98, yPercent: -2, duration: 0.75, ease: 'power3.out' }, 0)
    .to(incomingPreviewRef.value, { opacity: 1, scale: 1, yPercent: 0, duration: 0.95, ease: 'expo.out' }, 0);
};

onBeforeUnmount(() => {
  tl?.kill();
  killGsap(previewTween);
});
</script>

<template>
  <header class="relative overflow-hidden z-50">
    <nav class="fixed w-full py-10 px-6 md:py-12 md:px-12 lg:px-15">
      <div :class="['w-full h-2 flex justify-between items-center transition-colors duration-500', isContrast ? 'text-accent' : 'text-primary']">
        <a href="#home" class="font-bold text-sm md:text-lg lg:text-lg">한옥</a>
        <button class="flex text-sm cursor-pointer group" @click="emits('toggleNav')">
          <span class="flex flex-row items-center gap-x-3">
            <span class="font-medium">Menu</span>
            <House class="navHover" />
          </span>
        </button>
      </div>
    </nav>
  </header>

  <div class="fixed h-screen bg-accent overflow-hidden z-60 will-change-transform" ref="containerOverlay">
    <div class="h-full w-screen py-10 px-6 md:py-12 md:px-12 lg:px-15 z-60 will-change-transform" ref="contentOverlay">
      <div class="w-full h-2 flex justify-between items-center">
        <a href="#home" class="text-primary font-medium text-sm md:text-lg lg:text-lg">hanok</a>

        <button class="text-primary flex text-sm cursor-pointer group" @click="emits('toggleNav')">
          <span class="flex flex-row items-center gap-x-3" ref="menuOverlayRef">
            <span class="font-medium will-change-transform">Close</span>
            <X class="navHover will-change-transform" />
          </span>
        </button>
      </div>

      <div class="w-full h-full relative flex items-center justify-center lg:px-30">
        <div class="hidden lg:flex lg:w-full h-full items-center justify-center">
          <div class="relative w-78 h-116 xl:w-88 xl:h-130 overflow-hidden bg-primary/10">
            <img :src="currentImage" alt="Hanok navigation preview" class="absolute inset-0 h-full w-full object-cover will-change-transform" ref="currentPreviewRef" loading="lazy" decoding="async" />
            <img
              v-if="incomingImage"
              :src="incomingImage"
              alt=""
              aria-hidden="true"
              class="absolute inset-0 h-full w-full object-cover will-change-transform"
              ref="incomingPreviewRef"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="pointer-events-none w-110 h-142 border-50 border-x-63 border-accent absolute border-mask" />
          <p class="absolute bottom-15 left-30 text-primary/55 text-sm uppercase">Navigate the house</p>
        </div>

        <div class="text-primary/95 w-full md:px-15 lg:px-10">
          <ul class="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-medium flex flex-col gap-y-5 md:gap-y-7" ref="navListRef">
            <NavList v-for="(item, i) in navList" :key="i">
              <li class="relative pb-2 cursor-pointer will-change-transform" @mouseenter="changeImage(i)">
                <span class="block text-xs md:text-sm text-primary/45 font-normal uppercase mb-1">{{ item.kicker }}</span>
                <button
                  @click="
                    () => {
                      emits('toggleNav');
                      scrollToId(item.id);
                    }
                  "
                >
                  {{ item.name }}
                </button>
                <span class="borderNavList will-change-transform" />
                <span class="borderNavList2 will-change-transform" />
              </li>
            </NavList>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
