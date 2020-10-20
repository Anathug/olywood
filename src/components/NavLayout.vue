<template>
  <div class="nav-layout">
    <div class="nav-layout__left-wrapper">
      <router-link to="/">Ollywood</router-link>
      <div class="nav-layout__left-wrapper__arrow-wrapper">
        <img ref="svgUp" class="svg-up" src="../assets/svg/arrow.svg" alt="" />
        <img
          ref="svgDown"
          class="svg-down"
          src="../assets/svg/arrow.svg"
          alt=""
        />
      </div>
      <svg height="50" width="50">
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="white"
          stroke-width="1"
          fill="transparent"
        />
      </svg>
    </div>
    <div class="nav-layout__right-wrapper">
      <router-link to="/about">
        <BurgerMenu />
      </router-link>
      <div class="nav-layout__right-wrapper__indicator">
        <div class="first-number">1</div>
        <div class="line"></div>
        <div class="second-number">2</div>
      </div>
    </div>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu.vue";

export default {
  name: "NavLayout",
  components: {
    BurgerMenu,
  },

};
</script>

<style scoped lang="scss">
.nav-layout {
  height: 86vh;
  display: flex;
  justify-content: space-between;
  position: relative;

  &__left-wrapper,
  &__right-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__left-wrapper {
    display: flex;
    flex-direction: column;
    &__arrow-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      align-self: center;
      .svg-up,
      .svg-down {
        cursor: pointer;
      }
      .svg-down {
        transform: rotate(180deg);
        margin-top: 150px;
      }
    }
  }

  &__right-wrapper {
    align-items: flex-end;
    &__indicator {
      display: flex;
      align-items: center;
      .line {
        width: 80px;
        height: 1px;
        background-color: white;
        padding: 10 10px;
      }
      .first-number {
        padding-right: 20px;
      }
      .second-number {
        padding-left: 20px;
      }
    }
  }
}

a {
  color: white;
  text-decoration: none;
}
</style>
