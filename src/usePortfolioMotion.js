import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const enabled = 'screen and (prefers-reduced-motion: no-preference)';
const settle = {duration: 1.25, ease: 'expo.out', clearProps: 'transform,opacity,willChange'};

export default function usePortfolioMotion(root, tab, filter) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(enabled, () => {
      const select = gsap.utils.selector(root);
      const opening = gsap.timeline({defaults: settle});
      opening
        .fromTo('.opening-curtain', {scaleY: 1}, {scaleY: 0, duration: 1.65, ease: 'power3.inOut'}, 0)
        .fromTo('.hero-background', {scale: 1.16}, {scale: 1.045, duration: 2.5, ease: 'power3.out', clearProps: 'willChange'}, .15)
        .fromTo('.hero-main .availability', {y: 24, opacity: 0}, {y: 0, opacity: 1, duration: .9}, .12)
        .fromTo('.name-mask > span', {yPercent: 115, x: 30, scaleX: .68, scaleY: 1.2}, {yPercent: 0, x: 0, scaleX: 1, scaleY: 1, stagger: .18, duration: 1.65}, .3)
        .fromTo('.name-seal', {opacity: 0, y: 34}, {opacity: 1, y: 0}, .85)
        .fromTo('.hero-school', {y: 30, opacity: 0}, {y: 0, opacity: 1}, .65)
        .fromTo('.statement-line > span', {yPercent: 112, scaleY: 1.15}, {yPercent: 0, scaleY: 1, stagger: .16, duration: 1.4}, .78)
        .fromTo('.hero-description', {y: 36, opacity: 0}, {y: 0, opacity: 1}, 1)
        .fromTo('.hero-tags > span', {y: 28, opacity: 0}, {y: 0, opacity: 1, stagger: .07, duration: .9}, 1.15)
        .fromTo('.hero-actions > *', {y: 32, opacity: 0}, {y: 0, opacity: 1, stagger: .12}, 1.3)
        .fromTo('.hero-visual-caption > span', {y: 30, opacity: 0}, {y: 0, opacity: 1, stagger: .1}, 1.05)
        .fromTo('.profile-card-wrap', {y: 95, rotation: -4, opacity: 0}, {y: 0, rotation: 0, opacity: 1, duration: 1.6}, 1.2)
        .fromTo('.hero-bottom > *', {y: 22, opacity: 0}, {y: 0, opacity: 1, stagger: .08}, 1.4);

      // Skip the opening on restored/deep-link scroll positions, and finish it for keyboard navigation.
      if(window.scrollY > 120) opening.progress(1);
      const onFocus = () => opening.progress(1);
      const hero = select('.hero')[0];
      hero.addEventListener('focusin', onFocus);
      gsap.fromTo('.hero-background', {yPercent: 0}, {
        yPercent: -3, ease: 'none', immediateRender: false,
        scrollTrigger: {trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.2}
      });

      const reveal = (section, children) => {
        const element = select(section)[0];
        const timeline = gsap.timeline({
          defaults: settle,
          scrollTrigger: {trigger: element, start: 'clamp(top 86%)', once: true}
        });
        timeline.fromTo(element.querySelector('.motion-title-inner'),
          {yPercent: 118, x: 28, scaleY: 1.24},
          {yPercent: 0, x: 0, scaleY: 1, duration: 1.45}, 0);
        timeline.fromTo(element.querySelectorAll(children),
          {y: 62, opacity: 0}, {y: 0, opacity: 1, stagger: .16}, .28);
        const finish = () => timeline.progress(1);
        element.addEventListener('focusin', finish);
        return () => element.removeEventListener('focusin', finish);
      };
      const cleanups = [
        reveal('.highlights', '.highlight-intro p,.stat'),
        reveal('.details-header', 'h2 + span'),
        reveal('.contact', '.contact-signature,.contact-intro p,.contact-links > a,.contact-links > button')
      ];
      return () => {
        hero.removeEventListener('focusin', onFocus);
        cleanups.forEach(cleanup => cleanup());
      };
    }, root);
    return () => media.revert();
  }, {scope: root});

  useGSAP((context, contextSafe) => {
    const media = gsap.matchMedia();
    media.add(enabled, () => {
      const panel = root.current.querySelector('.tab-panel:not([hidden])');
      const cards = [...panel.querySelectorAll('.skill-card,.certificate-card:not(.filtered-out)')];
      const records = [];
      cards.forEach((card, index) => {
        const timeline = gsap.timeline({
          defaults: settle,
          scrollTrigger: {trigger: card, start: 'clamp(top 90%)', once: true}
        });
        // Delay within each row, not across the whole gallery. On a phone each card stands alone.
        const columns = root.current.clientWidth <= 760 ? 1 : 3;
        const delay = (index % columns) * .13;
        timeline.fromTo(card, {y: 76, opacity: 0}, {y: 0, opacity: 1, duration: 1.35}, delay);
        const image = card.querySelector('.certificate-image');
        if(image) timeline.fromTo(image,
          {clipPath: 'inset(0% 0% 100% 0%)'},
          {clipPath: 'inset(0% 0% 0% 0%)', duration: 1.45, ease: 'power3.inOut', clearProps: 'clipPath'}, delay + .1);
        records.push({card, timeline});
      });
      const content = panel.querySelectorAll('.education-date,.education-panel article,.education-art,.learning-note');
      if(content.length) {
        const timeline = gsap.timeline({defaults: settle, scrollTrigger: {trigger: panel, start: 'clamp(top 88%)', once: true}});
        timeline.fromTo(content, {y: 64, opacity: 0}, {y: 0, opacity: 1, stagger: .18}, .1);
        records.push({card: panel, timeline});
      }
      const onFocus = contextSafe(event => records.forEach(({card, timeline}) => {
        if(card.contains(event.target)) {
          timeline.progress(1);
          timeline.scrollTrigger?.kill();
        }
      }));
      panel.addEventListener('focusin', onFocus);
      ScrollTrigger.refresh();
      return () => panel.removeEventListener('focusin', onFocus);
    }, root);
    return () => media.revert();
  }, {scope: root, dependencies: [tab, filter], revertOnUpdate: true});

  useGSAP(() => {
    let refreshTimer;
    let active = true;
    const refresh = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {if(active) ScrollTrigger.refresh();}, 160);
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(root.current);
    document.fonts?.ready.then(() => {if(active) refresh();});
    return () => {
      active = false;
      clearTimeout(refreshTimer);
      observer.disconnect();
    };
  }, {scope: root});
}
