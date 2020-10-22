<template>
  <div class="olywood">
    <section class="olywood__first-section"></section>
  </div>
</template>

<script>
import Bridge from "@/assets/scene/Bridge";
import gsap from "gsap";

export default {
  name: "Olywood",
  mounted() {
    this.bridge = new Bridge();
    this.scene = this.bridge.getSingleton();
    // this.scene.createParticles();

    const indicatorLine = document.querySelector(
      ".nav-layout__right-wrapper__indicator .line"
    );
    const indicatorFirstNumber = document.querySelector(
      ".nav-layout__right-wrapper__indicator .first-number"
    );
    const indicatorSecondNumber = document.querySelector(
      ".nav-layout__right-wrapper__indicator .second-number"
    );

    const pageBG = document.querySelector(".page-bg");

    const circle = document.querySelector(".nav-layout__left-wrapper circle");

    const olyThreeTL = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1,
        ease: "power3.inOut",
      },
    });

    const olyTL = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1,
        ease: "power3.inOut",
      },
    });
    this.olyAnimation = olyTL
      .fromTo(
        pageBG,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
        },
        0
      )
      .fromTo(
        circle,
        {
          x: -50,
        },
        {
          x: 0,
        },
        1
      )
      .fromTo(
        indicatorLine,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
        },
        1.2
      )
      .fromTo(
        indicatorFirstNumber,
        {
          y: 50,
        },
        {
          y: 0,
        },
        1.3
      )
      .fromTo(
        indicatorSecondNumber,
        {
          y: 50,
        },
        {
          y: 0,
        },
        1.4
      );

    this.olyAnimation.play();
  },
  beforeDestroy() {
    this.olyAnimation.reverse();

    // window.removeEventListener("mousewheel", (e) => {
    //   this.scene.onMouseScroll(e);
    // });
  },
};
</script>

<style lang="scss" scoped>
.olywood {
  position: absolute;
  top: 7vh;
  left: 7vh;
  width: calc(100% - 14vh);
  h1 {
    text-align: center;
  }
}
</style>
