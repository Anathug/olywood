<template>
  <div class="home">
    <div class="home__title__wrapper">
      <h2>
        <span ref="letter" v-for="(letter, i) in title" :key="i">
          {{ letter }}
        </span>
      </h2>
    </div>
    <div class="home__fake-wrapper">
      <div class="home__fake-wrapper__image-bolywood">
        <router-link class="cursor-over" to="/bolywood"> </router-link>
      </div>
      <div class="home__fake-wrapper__image-holywood">
        <router-link class="cursor-over" to="/holywood"> </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Bridge from "@/assets/scene/Bridge";
import gsap from "gsap";
export default {
  name: "Home",
  data: function() {
    return {
      title: "Bolywood",
    };
  },
  mounted() {
    this.bridge = new Bridge();
    this.scene = this.bridge.getSingleton();
    this.scene.createMesh(0);
    this.scene.createMesh(3);
    this.currentIndex = 0;
    this.bolyIn = gsap
      .to(this.$refs.letter, {
        x: -300,
        alpha: 0,
        duration: 1,
        delay: 0.2,
        ease: "power4.inOut",
        stagger: 0.05,
      })
      .pause();
    const svgUp = document.querySelector(".svg-up");
    const svgDown = document.querySelector(".svg-down");
    const firstNumber = document.querySelector(".first-number");
    const secondNumber = document.querySelector(".second-number");
    const fakeWrapperImgBoly = document.querySelector(
      ".home__fake-wrapper__image-bolywood"
    );
    const fakeWrapperImgHoly = document.querySelector(
      ".home__fake-wrapper__image-holywood"
    );
    const fakeWrapperImg = [fakeWrapperImgBoly, fakeWrapperImgHoly];
    const circle = document.querySelector(".nav-layout__left-wrapper circle");

    svgUp.addEventListener("click", () => {
      this.slideArrowUp(firstNumber, fakeWrapperImgBoly, fakeWrapperImgHoly);
    });
    svgDown.addEventListener("click", () => {
      this.slideArrowDown(firstNumber, fakeWrapperImgBoly, fakeWrapperImgHoly);
    });
    fakeWrapperImg.forEach((wrapper) =>
      wrapper.addEventListener("click", () => {
        this.enterExperience(svgUp, svgDown, circle);
      })
    );
  },
  methods: {
    slideArrowUp(firstNumber, fakeWrapperImgBoly, fakeWrapperImgHoly) {
      this.bolyIn.play();
      if (this.currentIndex === 0) {
        this.scene.slideCameraRight({
          onStart: () => {
            this.scene.scene.children[1].visible = true;
          },
          onComplete: () => {
            this.scene.scene.children[0].visible = false;
          },
        });
        this.currentIndex = 1;
        firstNumber.style.transform = "translateY(-100%)";
        fakeWrapperImgBoly.style.transform = "translateX(-3000px)";
        fakeWrapperImgHoly.style.transform = "translateX(0)";
      }
    },
    slideArrowDown(firstNumber, fakeWrapperImgBoly, fakeWrapperImgHoly) {
      this.bolyIn.reverse();
      if (this.currentIndex === 1) {
        this.scene.slideCameraLeft({
          onStart: () => {
            this.scene.scene.children[0].visible = true;
          },
          onComplete: () => {
            this.scene.scene.children[1].visible = false;
          },
        });
        fakeWrapperImgBoly.style.transform = "translateX(0)";
        fakeWrapperImgHoly.style.transform = "translateX(3000px)";
        firstNumber.style.transform = "translateY(0)";
      }
      this.currentIndex = 0;
    },
    enterExperience(svgUp, svgDown, circle) {
      const secondNumber = document.querySelector(".second-number");
      secondNumber.style.transform = "translateY(-100%)";
      gsap.to(svgUp, {
        x: -50,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.to(svgDown, {
        x: -50,
        duration: 1,
        ease: "power3.inOut",
        delay: 0.1,
      });
      gsap.to(circle, {
        x: -50,
        duration: 1,
        ease: "power3.inOut",
        delay: 0.2,
      });
      gsap.to(this.$refs.letter, {
        x: 600,
        alpha: 0,
        duration: 1,
        delay: 0.2,
        ease: "power4.inOut",
        stagger: -0.05,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  top: 7vh;
  left: 7vh;
  width: calc(100% - 14vh);
  height: calc(100% - 14vh);
  &__title__wrapper {
    position: relative;
    left: 50vw;
    top: 43vh;
    transform: translateY(-50%);
    h2 {
      margin: 0;
      font-size: 10rem;
      -webkit-text-stroke: 1px white;
      color: transparent;
      span {
        display: inline-block;
      }
    }
  }
  &__fake-wrapper {
    z-index: 50;
    width: 80%;
    height: 80%;
    position: absolute;
    top: 10%;
    left: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__image-bolywood,
    &__image-holywood {
      width: 750px;
      position: absolute;
      height: 80vh;
      a {
        height: 100%;
        width: 100%;
        display: inline-block;
      }
    }
    &__image-holywood {
      transform: translateX(3000px);
    }
  }
}
</style>
