<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { IMAGE_INTERIOR, INTERIOR_NOTES, INTERIOR_POINTS } from '../../constans';
import { killGsap, shouldAnimate, shouldUseScrollMotion } from '../../utils/motion';

const sectionRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const notesRef = ref<HTMLElement | null>(null);

let reveal: GSAPTween | null = null;
let parallax: GSAPTimeline | null = null;
let notesTween: GSAPTween | null = null;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  if (!sectionRef.value || !imageRef.value || !contentRef.value || !notesRef.value) return;

  if (shouldAnimate()) {
    reveal = gsap.from(contentRef.value.children, {
      y: 70,
      opacity: 0,
      duration: 1.15,
      stagger: 0.14,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top+=45%',
      },
    });
  }

  if (shouldUseScrollMotion()) {
    parallax = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    parallax.fromTo(imageRef.value, { yPercent: -8 }, { yPercent: 8, ease: 'none' });
  }

  if (shouldAnimate()) {
    notesTween = gsap.from(notesRef.value.querySelectorAll('.interior-note'), {
      y: 70,
      opacity: 0,
      duration: 1,
      stagger: 0.14,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: notesRef.value,
        start: 'top top+=65%',
      },
    });
  }
});

onBeforeUnmount(() => {
  killGsap(reveal);
  killGsap(parallax);
  killGsap(notesTween);
});
</script>

<template>
  <section id="interior" ref="sectionRef" class="relative overflow-hidden bg-accent text-primary px-6 md:px-12 lg:px-15 py-24 md:py-32 lg:py-44">
    <div class="container mx-auto grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-end">
      <div class="relative h-[72vh] min-h-120 overflow-hidden md:h-[82vh] lg:h-[105vh]">
        <img ref="imageRef" :src="IMAGE_INTERIOR[0]" alt="Quiet Hanok interior with warm wood" class="h-[116%] w-full object-cover will-change-transform" loading="lazy" decoding="async" />
        <div class="absolute inset-0 bg-accent/10" />
      </div>

      <div ref="contentRef" class="lg:pb-12">
        <p class="text-sm md:text-base uppercase text-primary/55">Interior / 안채</p>
        <h2 class="mt-6 text-5xl md:text-7xl lg:text-8xl leading-[0.95] font-medium">Rooms made for warmth and pause.</h2>
        <p class="mt-8 max-w-2xl text-lg md:text-2xl leading-snug text-primary/72">
          Inside Hanok, material does not shout. Paper, wood, stone, and floor heat work together so the room feels held, never sealed.
        </p>
        <ul class="mt-10 space-y-5 border-t border-primary/20 pt-8">
          <li v-for="point in INTERIOR_POINTS" :key="point" class="flex gap-5 text-sm md:text-base text-primary/70">
            <span class="mt-2 h-px w-10 shrink-0 bg-primary/35" />
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div ref="notesRef" class="container mx-auto mt-24 md:mt-32 lg:mt-44">
      <div class="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
        <div class="interior-note grid grid-cols-2 gap-4 md:gap-6">
          <div class="h-[46vh] overflow-hidden md:h-[64vh]">
            <img :src="IMAGE_INTERIOR[1]" alt="Warm wooden Hanok corridor with paper doors" class="h-full w-full object-cover" loading="lazy" decoding="async" />
          </div>
          <div class="mt-16 h-[42vh] overflow-hidden md:mt-28 md:h-[56vh]">
            <img :src="IMAGE_INTERIOR[2]" alt="Hanji door and wooden Hanok interior detail" class="h-full w-full object-cover" loading="lazy" decoding="async" />
          </div>
        </div>

        <div class="interior-note lg:pt-20">
          <p class="text-sm uppercase text-primary/45">Rooms as rhythm</p>
          <h3 class="mt-6 max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
            The interior is not a backdrop. It is a sequence of pauses.
          </h3>
          <div class="mt-10 divide-y divide-primary/15 border-y border-primary/15">
            <article v-for="note in INTERIOR_NOTES" :key="note.label" class="grid gap-4 py-6 md:grid-cols-[0.32fr_1fr]">
              <h4 class="text-xl font-medium">{{ note.label }}</h4>
              <p class="text-base leading-relaxed text-primary/62">{{ note.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
