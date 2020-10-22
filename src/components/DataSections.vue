<template>
  <div
    class="data-sections"
    v-observe-visibility="{
      callback: visibilityChanged,
      intersection: {
        threshold: 0.4,
      },
    }"
  >
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
    // $in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
    // $in-out-quint: cubic-bezier(0.83, 0, 0.17, 1);

    // $out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
    // $out-quint: cubic-bezier(0.22, 1, 0.36, 1);

    // $in-cubic: cubic-bezier(0.32, 0, 0.67, 0);
    // $in-quint: cubic-bezier(0.64, 0, 0.78, 0);
    Splitting({
      target: "[data-splitting]",
      by: "chars",
    });
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        console.log("is visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    },
  },
};
</script>

<style lang="scss">
.data-sections h2 .char {
  transition: 1s cubic-bezier(0.65, 0, 0.35, 1) calc(20ms * var(--char-index));
  transform: translateY(100%);
}

.is-visible h2 .char {
  transform: translateY(0) !important;
}
</style>
<style lang="scss" scoped>
.overflow-hidden {
  overflow: hidden;
  position: relative;
}
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
