<template>
  <div class="olywood"></div>
</template>

<script>
import Bridge from "@/assets/scene/Bridge";
import gsap from "gsap";

export default {
  name: "Olywood",
  mounted() {
    this.bridge = new Bridge();
    this.scene = this.bridge.getSingleton();
    this.scene.createFont(-170, -30, 2, "Number of movies \n shot per years");
    window.addEventListener("mousewheel", (e) => {
      this.scene.onMouseScroll(e);
    });
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

    setTimeout(() => {
      this.olyThreeAnimation = olyThreeTL
        .fromTo(
          this.scene.scene.children[0].scale,
          {
            y: 0,
            duration: 2,
            ease: "power4.out",
          },
          {
            y: 1,
            duration: 2,
            ease: "power4.inOut",
          },
          0
        )
        .fromTo(
          this.scene.camera.position,
          {
            z: 1000,
            duration: 2,
            ease: "power4.out",
          },
          {
            z: 300,
            duration: 2,
            ease: "power4.inOut",
          },
          0
        );
      this.olyThreeAnimation.play();
    }, 1000);

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
    this.olyThreeAnimation.reverse();
    setTimeout(() => {
      this.scene.scene.children[0].geometry.dispose();
      this.scene.scene.children[0].material.dispose();
      this.scene.scene.remove(this.scene.scene.children[0]);
    }, 1500);
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
