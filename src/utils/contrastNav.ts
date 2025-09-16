import { ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useContrastNav = () => {
  const isContrast = ref(false);
  const triggers: ScrollTrigger[] = [];

  const setContrast = (v: boolean) => {
    isContrast.value = v;
  };

  const registerSection = ({ el, contrast }: { el: HTMLElement; contrast: boolean }) => {
    const t = ScrollTrigger.create({
      trigger: el,
      start: 'top top+=15%',
      markers: false,
      end: 'bottom top+=15%',
      onEnter: () => {
        setContrast(contrast);
      },
      onLeaveBack: () => {
        setContrast(false);
      },
      onEnterBack: () => {
        setContrast(contrast);
      },
      onLeave: () => {
        setContrast(false);
      },
    });

    triggers.push(t);
    return t;
  };

  const clear = () => {
    triggers.forEach((t) => t.kill());
    triggers.length = 0;
  };

  return { isContrast, registerSection, clear };
};
