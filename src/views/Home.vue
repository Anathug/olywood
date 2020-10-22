<template>
  <div class="home">
    <div class="home__title__wrapper">
      <h2 class="home__title__wrapper__upper-text">
        <div class="overflow-hidden">
          <span ref="letter" v-for="(letter, i) in firstTitle" :key="i">
            {{ letter }}
          </span>
        </div>
      </h2>
      <h2 class="home__title__wrapper__lower-text">
        <div class="overflow-hidden">
          <span ref="letter" v-for="(letter, i) in secondTitle" :key="i">
            {{ letter }}
          </span>
        </div>
      </h2>
    </div>
    <div class="home__fake-wrapper">
      <div class="home__fake-wrapper__image">
        <router-link class="cursor-over" to="/olywood"> </router-link>
      </div>
    </div>
    <div class="home__description-wrapper">
      <p>
        Comparative datavisualisation between the two major film industries in
        the world through 5 data
      </p>
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
      firstTitle: "lly",
      secondTitle: "dataviz",
    };
  },
  mounted() {
    const holywoodButton = document.querySelector(
      ".nav-layout__right-wrapper__oly-wrapper__holywood"
    );
    const bolywoodButton = document.querySelector(
      ".nav-layout__right-wrapper__oly-wrapper__bolywood"
    );
    const fakeWrapperImg = document.querySelector(".home__fake-wrapper");
    const firstNumber = document.querySelector(".first-number");
    const secondNumber = document.querySelector(".second-number");
    const description = document.querySelector(".home__description-wrapper");

    this.bridge = new Bridge();
    this.scene = this.bridge.getSingleton();
    this.scene.createMesh(0.15);
    this.scene.createMesh(3);
    this.currentIndex = 0;
    this.scene.camera.position.z = 1;
    // gsap.fromTo(
    //   this.scene.scene.children[0].material.uniforms.progress,
    //   {
    //     value: 500,
    //     duration: 1,
    //   },
    //   {
    //     value: 0,
    //     duration: 2,
    //     delay: 1,
    //     ease: "back.out(1)",
    //   }
    // );

    // HOME ANIMATION

    gsap.to(this.scene.camera.position, {
      x: 0,
      duration: 2,
      delay: 1,
      ease: "power3.inOut",
    });

    const homeTL = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1,
        ease: "power3.inOut",
      },
    });
    const homeAnimation = homeTL
      .fromTo(
        this.$refs.letter,
        {
          y: 50,
          alpha: 0,
          stagger: 0.05,
        },
        {
          y: 0,
          alpha: 1,
          stagger: 0.05,
        },
        0
      )
      .fromTo(
        holywoodButton,
        {
          y: 50,
          alpha: 0,
          stagger: 0.05,
        },
        {
          y: 0,
          alpha: 1,
          stagger: 0.05,
        },
        0
      )
      .fromTo(
        bolywoodButton,
        {
          y: 50,
          alpha: 0,
          stagger: 0.05,
        },
        {
          y: 0,
          alpha: 1,
          stagger: 0.05,
        },
        0.2
      )
      .fromTo(
        description,
        {
          y: 100,
          alpha: 0,
          skewY: 3,
        },
        {
          y: 0,
          alpha: 1,
          skewY: 0,
        },
        0.3
      );

    homeAnimation.play();

    //SLIDER ANIMATION

    holywoodButton.addEventListener("click", () => {
      this.slideHolywood(firstNumber);
      holywoodButton.classList.add("current-wood");
      bolywoodButton.classList.remove("current-wood");
    });
    bolywoodButton.addEventListener("click", () => {
      this.slideBolywood(firstNumber);
      holywoodButton.classList.remove("current-wood");
      bolywoodButton.classList.add("current-wood");
    });
    fakeWrapperImg.addEventListener("click", () => {
      this.enterExperience(homeAnimation);
    });
  },
  beforeDestroy() {
    setTimeout(() => {
      this.scene.scene.children[0].geometry.dispose();
      this.scene.scene.children[1].geometry.dispose();
      this.scene.scene.children[0].material.dispose();
      this.scene.scene.children[1].material.dispose();
      this.scene.scene.remove(
        this.scene.scene.children[0],
        this.scene.scene.children[1]
      );
    }, 1000);
  },
  methods: {
    slideBolywood(firstNumber) {
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
      }
    },
    slideHolywood(firstNumber) {
      if (this.currentIndex === 1) {
        this.scene.slideCameraLeft({
          onStart: () => {
            this.scene.scene.children[0].visible = true;
          },
          onComplete: () => {
            this.scene.scene.children[1].visible = false;
          },
        });
      }
      this.currentIndex = 0;
    },
    enterExperience(homeAnimation) {
      homeAnimation.reverse();
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
  h2 {
    margin: 0;
  }
  &__title__wrapper {
    position: relative;
    left: 5vw;
    top: 43vh;
    transform: translateY(-50%);
    font-size: 5.5vw;
    -webkit-text-stroke: 1px #f69f55;
    display: inline-block;
    margin: 0;
    color: transparent;
    text-transform: uppercase;
    &__upper-text,
    &__lower-text {
      span {
        display: inline-block;
      }
    }
  }
  &__fake-wrapper {
    z-index: 50;
    width: 65%;
    height: 80%;
    position: absolute;
    top: 10%;
    left: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__image {
      width: 750px;
      position: absolute;
      height: 80vh;
      a {
        height: 100%;
        width: 100%;
        display: inline-block;
      }
    }
  }
  &__description-wrapper {
    position: relative;
    left: 5vw;
    top: 35vh;
    opacity: 0;
    transform: translateY(-50%);
    p {
      margin: 0;
      width: 300px;
      line-height: 1.5rem;
    }
  }
}
</style>
