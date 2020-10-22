<template>
  <div class="olywood">
    <section class="first-section">
      <DataSections
        :firstTitle="dataSections[0].firstTitle"
        :secondTitle="dataSections[0].secondTitle"
      />
      <div class="first-section__sub-section">
        <div
          v-observe-visibility="{
            callback: visibilityChanged,
            intersection: {
              threshold: 0.4,
            },
          }"
          class="first-section__sub-section__bolywood"
        >
          <h3 data-splitting>Bolywood</h3>
          <p data-splitting>1600</p>
          <div class="first-section__sub-section__bolywood__comparaison"></div>
        </div>
        <div
          v-observe-visibility="{
            callback: visibilityChanged,
            intersection: {
              threshold: 0.4,
            },
          }"
          class="first-section__sub-section__holywood"
        >
          <h3 data-splitting>Holywood</h3>
          <p data-splitting>500</p>
          <div class="first-section__sub-section__holywood__comparaison"></div>
        </div>
      </div>
    </section>
    <section
      v-observe-visibility="{
        callback: visibilityChanged,
        intersection: {
          threshold: 0.4,
        },
      }"
      class="second-section"
    >
      <DataSections
        :firstTitle="dataSections[1].firstTitle"
        :secondTitle="dataSections[1].secondTitle"
      />
      <SectionPageBG firstColor="#448D9D" secondColor="#4890A1" />
    </section>
  </div>
</template>

<script>
import Bridge from "@/assets/scene/Bridge";
import DataSections from "@/components/DataSections.vue";
import SectionPageBG from "@/components/SectionPageBG.vue";
import gsap from "gsap";
import SmoothScroll from "@/assets/scene/SmoothScroll";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
export default {
  name: "Olywood",
  components: {
    DataSections,
    SectionPageBG,
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    },
  },
  data() {
    return {
      dataSections: [
        {
          firstTitle: "Number of movies",
          secondTitle: "shot per years",
        },
        {
          firstTitle: "Best box office",
          secondTitle: "movie of all time",
        },
        {
          firstTitle: "Most expensive",
          secondTitle: "films",
        },
        {
          firstTitle: "The actors who earn",
          secondTitle: "the most in 2020",
        },
        {
          firstTitle: "Number of dead ",
          secondTitle: "actors in 2020 ",
        },
      ],
    };
  },
  mounted() {
    this.bridge = new Bridge();
    this.scene = this.bridge.getSingleton();
    new SmoothScroll(document, 60, 20);

    Splitting({
      target: "[data-splitting]",
      by: "chars",
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

    // window.removeEventListener("mousewheel", (e) => {
    //   this.scene.onMouseScroll(e);
    // });
  },
};
</script>

<style lang="scss">
.first-section__sub-section h3 .char {
  transition-delay: calc(20ms * var(--char-index));
  transition: 1s cubic-bezier(0.65, 0, 0.35, 1);
  transform: translateY(100%);
}

.first-section__sub-section p .char {
  transition-delay: calc(60ms * var(--char-index));
  transition: 1s cubic-bezier(0.65, 0, 0.35, 1);
  transform: scale(0);
}

.is-visible h3 .char {
  transform: translateY(0) !important;
}

.is-visible p .char {
  transform: scale(1) !important;
}

.first-section__sub-section .first-section__sub-section__bolywood__comparaison,
.first-section__sub-section .first-section__sub-section__holywood__comparaison {
  transition: 1s transform cubic-bezier(0.65, 0, 0.35, 1);
  transform: scaleX(0);
  transform-origin: left;
}

.is-visible .first-section__sub-section__bolywood__comparaison,
.is-visible .first-section__sub-section__holywood__comparaison {
  transition: 1s transform cubic-bezier(0.65, 0, 0.35, 1);
  transform: scaleX(1);
}

.second-section.is-visible .page-bg {
  transform: scaleY(1) !important;
}
</style>

<style lang="scss" scoped>
.olywood {
  position: absolute;
  top: 7vh;
  left: 7vh;
  width: calc(100% - 14vh);
  .first-section {
    z-index: 50;
    position: relative;
    &__sub-section {
      &__bolywood,
      &__holywood {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        h3 {
          font-size: 4rem;
          -webkit-text-stroke: 1px #f69f55;
          color: transparent;
          margin: 0;
        }
        p {
          margin: 0;
          font-size: 8rem;
          color: white;
          font-weight: 900;
        }
      }
      &__bolywood {
        &__comparaison {
          height: 5px;
          width: 1600px;
          background-color: white;
          margin: 5vh;
        }
      }
      &__holywood {
        &__comparaison {
          height: 5px;
          width: 500px;
          background-color: white;
        }
      }
    }
  }
}

section .data-sections {
  position: relative;
  z-index: 10;
}

.second-section {
  margin-top: 20vh;
}
</style>
