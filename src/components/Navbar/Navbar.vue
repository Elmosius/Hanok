<script setup lang="ts">
import { House, X } from "lucide-vue-next";
import gsap from "gsap";
import {
  IMAGE_ARCHITECTURE,
  IMAGE_GALLERY,
  IMAGE_HOME,
  IMAGE_INTERIOR,
} from "../../constans";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import NavList from "../NavList";
import { navList } from "./navbar";
import { useScrollLock } from "../../utils/scrollLock.ts";

const image = ref(IMAGE_HOME[0]);

const imgRef = ref<HTMLElement | null>(null);
const containerOverlay = ref<HTMLElement | null>(null);
const contentOverlay = ref<HTMLElement | null>(null);
const navListRef = ref<HTMLElement | null>(null);
const menuOverlayRef = ref<HTMLElement | null>(null);

let tl: any = null;
let tween: any = null;

const emits = defineEmits<{
  (e: "toggleNav"): void;
}>();

const { openNav } = defineProps<{
  openNav: boolean;
}>();

const { scrollToId } = useScrollLock();

onMounted(() => {
  if (
    !containerOverlay.value ||
    !contentOverlay.value ||
    !navListRef.value ||
    !menuOverlayRef.value
  )
    return;

  gsap.set(navListRef.value, {
    y: 50,
    clipPath: "inset(0% 0% 100% 0%)",
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
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  });
});

watch(
  () => openNav,
  (isOpen) => {
    tl?.kill();

    const menuOverlayChildren = menuOverlayRef.value
      ?.children as HTMLCollection;

    tl = gsap.timeline();
    if (isOpen) {
      tl.to(containerOverlay.value, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 175%)",
        duration: 1.5,
        ease: "expo.inOut",
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
            ease: "expo.inOut",
          },
          0,
        )
        .to(
          navListRef.value,
          {
            y: 0,
            duration: 1.5,
            rotate: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            stagger: 0.3,
            ease: "power4",
          },
          "-=0.8",
        )
        .from(
          menuOverlayChildren,
          {
            delay: 0.2,
            rotate: -3,
            duration: 1.5,
            ease: "expo.inOut",
            stagger: 0.3,
            opacity: 0,
          },
          0,
        );
    } else {
      tl.to(containerOverlay.value, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(navListRef.value, {
            y: 50,
            clipPath: "inset(100% 0% 0% 0%)",
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
        0,
      );
    }
  },
);

watch(image, () => {
  if (!imgRef.value) return;

  tween?.kill();
  tween = gsap.fromTo(
    imgRef.value,
    { opacity: 0, scale: 1.15, rotate: 10 },
    { duration: 1.5, opacity: 1, scale: 1, rotate: 0, ease: "expo.out" },
  );
});

const changeImage = (index: number) => {
  if (index === 0) {
    image.value = IMAGE_HOME[0];
  } else if (index === 1) {
    image.value = IMAGE_ARCHITECTURE[0];
  } else if (index === 2) {
    image.value = IMAGE_INTERIOR[0];
  } else {
    image.value = IMAGE_GALLERY[0];
  }
};

onBeforeUnmount(() => {
  tl?.kill();
  tween?.kill();
});
</script>

<template>
  <header class="relative overflow-hidden z-50">
    <nav class="fixed w-full py-15 px-15">
      <div class="w-full h-2 flex justify-between items-center">
        <a href="#" class="text-accent font-bold text-sm md:text-lg lg:text-lg"
          >한옥</a
        >
        <button
          class="text-accent flex text-sm cursor-pointer group"
          @click="emits('toggleNav')"
        >
          <span class="flex flex-row items-center gap-x-3">
            <span class="font-medium">Menu</span>
            <House class="navHover" />
          </span>
        </button>
      </div>
    </nav>
  </header>

  <div
    class="fixed h-screen bg-accent overflow-hidden z-60"
    ref="containerOverlay"
  >
    <div class="h-full w-screen py-15 px-15 z-60" ref="contentOverlay">
      <div class="w-full h-2 flex justify-between items-center">
        <a
          href="#"
          class="text-primary font-medium text-sm md:text-lg lg:text-lg"
          >hanok</a
        >

        <button
          class="text-primary flex text-sm cursor-pointer group"
          @click="emits('toggleNav')"
        >
          <span class="flex flex-row items-center gap-x-3" ref="menuOverlayRef">
            <span class="font-medium">Close</span>
            <X class="navHover" />
          </span>
        </button>
      </div>

      <div
        class="w-full h-full relative flex items-center justify-center lg:px-30"
      >
        <div
          class="hidden lg:flex lg:w-full h-full items-center justify-center"
        >
          <img :src="image" alt="1" class="w-72 h-108" ref="imgRef" />
          <div
            class="w-100 h-130 border-50 border-x-63 border-accent absolute border-mask"
          />
        </div>

        <div class="text-primary/95 w-full md:px-15 lg:px-10">
          <ul
            class="text-5xl md:text-6xl lg:text-5xl font-medium flex flex-col gap-y-5"
          >
            <NavList v-for="(item, i) in navList" :key="i">
              <li
                ref="navListRef"
                class="relative pb-2 cursor-pointer"
                @mouseenter="changeImage(i)"
              >
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
                <span class="borderNavList" />
                <span class="borderNavList2" />
              </li>
            </NavList>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
