<template>
  <div class="nav-layout">
    <div class="nav-layout__left-wrapper">
      <router-link class="nav-layout__left-wrapper__home cursor-over" to="/"
        >LLY</router-link
      >
      <svg height="50" width="50">
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="black"
          stroke-width="1"
          fill="transparent"
        />
      </svg>
    </div>
    <div class="nav-layout__right-wrapper">
      <router-link to="/about">
        <BurgerMenu />
      </router-link>
      <div class="nav-layout__right-wrapper__oly-wrapper">
        <div class="overflow-hidden">
          <div
            class="nav-layout__right-wrapper__oly-wrapper__holywood cursor-over current-wood"
          >
            Hollywood
          </div>
        </div>
        <div class="overflow-hidden">
          <div
            class="nav-layout__right-wrapper__oly-wrapper__bolywood cursor-over"
          >
            Bollywood
          </div>
        </div>
      </div>
      <div class="nav-layout__right-wrapper__indicator">
        <div class="first-number-wrapper">
          <div class="first-number">1</div>
        </div>
        <div class="line"></div>
        <div class="second-number-wrapper">
          <div class="second-number">5</div>
        </div>
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
  z-index: 12;

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
    &__home {
      font-size: 1.3rem;
      font-weight: 900;
    }
    svg {
      overflow: hidden;
      circle {
        transform: translateX(-50px);
      }
    }
  }

  &__right-wrapper {
    align-items: flex-end;
    &__oly-wrapper {
      color: grey;
      &__holywood,
      &__bolywood {
        margin-bottom: 20px;
        transition: 0.5s color;
        transform: translateY(50px);
      }
    }
    &__indicator {
      display: flex;
      align-items: center;
      .line {
        width: 80px;
        height: 1px;
        background-color: black;
        padding: 10 10px;
        transform: scaleX(0);
      }
      .first-number-wrapper {
        padding-right: 20px;
        position: relative;
        overflow: hidden;
        .first-number {
          transform: translateY(50px);
        }
      }
      .second-number-wrapper {
        padding-left: 20px;
        position: relative;
        overflow: hidden;
        .second-number {
          transform: translateY(50px);
          &:after {
            content: "5";
            position: absolute;
            top: 100%;
            left: 0;
          }
        }
      }
    }
  }
}

.current-wood {
  color: black;
}
a {
  color: black;
  text-decoration: none;
  position: relative;
  //   z-index: 10;
}
</style>
