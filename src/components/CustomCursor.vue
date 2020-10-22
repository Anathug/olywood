<template>
  <div class="custom-cursor">
    <div ref="pointer" class="custom-cursor__pointer"></div>
    <div ref="circle" class="custom-cursor__circle"></div>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "CurstomCursor",
  mounted() {
    const cursorOver = document.querySelectorAll(".cursor-over");
    cursorOver.forEach((cursor) => {
      cursor.addEventListener("mouseover", () => {
        this.onMouseOver();
      });
      cursor.addEventListener("mouseout", () => {
        this.onMouseOut();
      });
    });
    window.addEventListener("mousemove", (e) => {
      this.onMouseMove(e);
    });
  },
  methods: {
    onMouseMove(event) {
      gsap.to(this.$refs.circle, {
        duration: 0.5,
        x: event.clientX - 20,
        y: event.clientY - 30,
        ease: "power4.out",
      });
      this.$refs.pointer.style.transform = `translateX(${event.clientX -
        5}px) translateY(${event.clientY - 5}px)`;
    },
    onMouseOver() {
      gsap.to(this.$refs.circle, {
        duration: 0.5,
        scale: 2,
        ease: "power4.out",
      });
    },
    onMouseOut() {
      gsap.to(this.$refs.circle, {
        duration: 0.5,
        scale: 1,
        ease: "power4.out",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.custom-cursor {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  &__pointer {
    width: 10px;
    height: 10px;
    background-color: #f69f55;
    border-radius: 50%;
  }
  &__circle {
    width: 40px;
    height: 40px;
    border: #f69f55 1px solid;
    border-radius: 50%;
  }
}
</style>
