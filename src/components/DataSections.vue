<template>
  <div class="data-sections">
    <div class="overflow-hidden">
      <h2 data-splitting>{{ firstTitle }}</h2>
    </div>
    <div class="overflow-hidden">
      <h2 data-splitting>{{ secondTitle }}</h2>
    </div>
  </div>
</template>
<script>
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
export default {
  name: "DataSections",
  props: {
    firstTitle: String,
    secondTitle: String,
  },
  mounted() {
    Splitting({
      target: "[data-splitting]",
      by: "chars",
    });
  },
};
</script>

//
<style lang="scss">
.data-sections h2 .char {
  transition: 1s cubic-bezier(0.65, 0, 0.35, 1);
  transition-delay: calc(20ms * var(--char-index));
  transform: translateY(100%);
}

.is-visible h2 .char {
  transform: translateY(0) !important;
}
</style>
<style lang="scss" scoped>
.data-sections {
  height: 86vh;
  margin-bottom: 7vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    -webkit-text-stroke: 1px #f69f55;
    color: transparent;
    font-size: 10vw;
    text-align: center;
    margin: 0;
  }
}
</style>
