<template>
  <div class="loader"></div>
</template>
<script>
import holywoodImg from "../assets/img/holywood.jpg";
export default {
  name: "Loader",
  data() {
    return {
      ressources: [holywoodImg],
      loaded: 0,
    };
  },
  mounted() {
    console.log(this.$store);
    this.ressources.forEach((el) => {
      const image = document.createElement("img");
      image.src = holywoodImg;
      image.addEventListener("load", () => {});
    });
  },
};
</script>
<style lang="scss" scoped>
.loader {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: red;
  z-index: 10000;
}
</style>
