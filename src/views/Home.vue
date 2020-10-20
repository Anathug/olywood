<template>
  <div class="home">
    <div class="home__title__wrapper">
      <h2>
        <span ref="letter" v-for="(letter, i) in title" :key="i">
          {{ letter }}
        </span>
      </h2>
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
    const svgUp = document.querySelector(".svg-up");
    const svgDown = document.querySelector(".svg-down");
    const bolyIn = gsap
      .to(this.$refs.letter, {
        x: -300,
        alpha: 0,
        duration: 1,
        delay: 0.2,
        ease: "power4.inOut",
        stagger: 0.05,
      })
      .pause();

    svgUp.addEventListener("click", () => {
      bolyIn.play();
      this.scene.slideCameraRight({
        onStart: () => {
          this.scene.createMesh(3);
        },
        onComplete: () => {
         this.scene.scene.remove(this.scene.scene.children[0])
        },
      });
    });
    svgDown.addEventListener("click", () => {
        this.scene.slideCameraLeft({
        onStart: () => {
          this.scene.createMesh(0);
          console.log('test')
        },
        onComplete: () => {
         this.scene.scene.remove(this.scene.scene.children[0])
        },
      });
      bolyIn.reverse();
    });
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  top: 7vh;
  left: 7vh;

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
}
</style>
