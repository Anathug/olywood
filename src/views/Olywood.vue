<template>
  <div class="olywood">
    <div class="full-bg"></div>
    <section
      ref="firstSection"
      v-observe-visibility="{
        callback: visibilityChanged,
        intersection: {
          threshold: 0.4,
        },
      }"
      class="first-section"
    >
      <DataSections
        :firstTitle="dataSections[0].firstTitle"
        :secondTitle="dataSections[0].secondTitle"
      />
      <div
        v-observe-visibility="{
          callback: visibilityChanged,
          intersection: {
            threshold: 0.4,
          },
        }"
        class="first-section__sub-section"
      >
        <div class="first-section__sub-section__bolywood">
          <div class="overflow-hidden">
            <h3 data-splitting>Bollywood</h3>
          </div>
          <p data-splitting>1600</p>
          <div class="first-section__sub-section__bolywood__comparaison"></div>
        </div>
        <div class="first-section__sub-section__holywood">
          <div class="overflow-hidden">
            <h3 data-splitting>Hollywood</h3>
          </div>
          <p data-splitting>500</p>
          <div class="first-section__sub-section__holywood__comparaison"></div>
        </div>
      </div>
      <SectionPageBG firstColor="#bf6989" secondColor="#e280a4" />
    </section>
    <section
      ref="secondSection"
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
      <div
        v-observe-visibility="{
          callback: visibilityChanged,
          intersection: {
            threshold: 0.4,
          },
        }"
        class="second-section__sub-section"
      >
        <div class="second-section__sub-section__left">
          <h3>Bollywood</h3>
          <p data-splitting>{{ numbers.second.price.bolywood }} $</p>
          <div class="h4-wrapper">
            <h4>dangal</h4>
            <h4>budget: 12 000 000$</h4>
          </div>
        </div>
        <!-- <div class="arrow">
          <img src="../assets/img/ARO.png" />
        </div> -->
        <div class="second-section__sub-section__right">
          <h3>Hollywood</h3>
          <p data-splitting>2 797 800 564 $</p>
          <div class="h4-wrapper">
            <h4>avengers: endgame</h4>
            <h4>budget: 356 000 000$</h4>
          </div>
        </div>
      </div>
      <div class="second-section__img-left">
        <img src="../assets/img/DAN.png" />
      </div>
      <div class="second-section__img-right">
        <img src="../assets/img/CAP.png" />
      </div>
      <SectionPageBG firstColor="#448D9D" secondColor="#4890A1" />
    </section>
    <section
      ref="thirdSection"
      v-observe-visibility="{
        callback: visibilityChanged,
        intersection: {
          threshold: 0.4,
        },
      }"
      class="third-section"
    >
      <DataSections
        :firstTitle="dataSections[1].firstTitle"
        :secondTitle="dataSections[1].secondTitle"
      />
      <div
        v-observe-visibility="{
          callback: visibilityChanged,
          intersection: {
            threshold: 0.4,
          },
        }"
        class="third-section__sub-section"
      >
        <div class="third-section__sub-section__left">
          <h3>Bollywood</h3>
          <p data-splitting>73 000 000 $</p>
          <div class="h4-wrapper">
            <h4>2.0</h4>
            <h4>box-office: 108 628 480 $</h4>
          </div>
        </div>
        <!-- <div class="arrow">
          <img src="../assets/img/ARO.png" />
        </div> -->
        <div class="third-section__sub-section__right">
          <h3>Bollywood</h3>
          <p data-splitting>379 000 000 $</p>
          <div class="h4-wrapper">
            <h4>PotC: On Stranger Tides</h4>
            <h4>box office: 1 046 000 000 $</h4>
          </div>
        </div>
      </div>
      <div class="third-section__img-left">
        <img src="../assets/img/20.png" />
      </div>
      <div class="third-section__img-right">
        <img src="../assets/img/PIR.png" />
      </div>
      <SectionPageBG firstColor="#9D4444" secondColor="#A14848" />
    </section>
  </div>
</template>

<script>
import Bridge from "@/assets/scene/Bridge";
import DataSections from "@/components/DataSections.vue";
import SectionPageBG from "@/components/SectionPageBG.vue";
import gsap from "gsap";
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
      const numbers = document.querySelector(".first-number");
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
      if (this.$refs.firstSection.classList.contains("is-visible")) {
        numbers.style.transform = "translateY(0)";
      }
      if (this.$refs.secondSection.classList.contains("is-visible")) {
        numbers.style.transform = "translateY(-19px)";
      }
      if (this.$refs.thirdSection.classList.contains("is-visible")) {
        numbers.style.transform = "translateY(-40px)";
      }
    },
    pageScroll(e, el, force) {
      el.forEach((element) => {
        gsap.to(element, {
          y: "-=" + e.deltaY * force,
          duration: 1,
          ease: "power2.out",
        });
      });
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
      numbers: {
        second: {
          price: {
            bolywood: "288 373 229",
            holywood: "2 797 800 564",
          },
          budget: {
            bolywood: "12 000 000",
            budget: "356 000 000",
          },
        },
      },
    };
  },

  mounted() {
    this.bridge = new Bridge();
    this.scene = this.bridge.getSingleton();
    gsap.ticker.remove(this.scene.render);
    Splitting({
      target: "[data-splitting]",
      by: "chars",
    });

    window.addEventListener("mousewheel", (e) => {
      if (
        document
          .querySelector(".second-section")
          .classList.contains("is-visible")
      ) {
        this.pageScroll(
          e,
          document.querySelectorAll(
            ".second-section__img-left img, .second-section__img-right img"
          ),
          1
        );
      }
    });

    window.addEventListener("mousemove", (e) => {});

    const indicatorLine = document.querySelector(
      ".nav-layout__right-wrapper__indicator .line"
    );

    const indicatorFirstNumber = document.querySelector(
      ".nav-layout__right-wrapper__indicator .first-number-wrapper"
    );
    const indicatorSecondNumber = document.querySelector(
      ".nav-layout__right-wrapper__indicator .second-number"
    );

    const layoutEl = document.querySelectorAll(".nav-layout a");
    layoutEl.forEach((el) => {
      el.style.color = "white";
    });

    const burgerMenu = document.querySelectorAll(
      ".burger-menu__upper-line, .burger-menu__lower-line"
    );

    burgerMenu.forEach((el) => {
      el.style.backgroundColor = "white";
    });

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
    const leavingPage = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1,
        ease: "power3.inOut",
      },
    });

    leavingPage
      .to(document.querySelector(".transition-page"), {
        scaleX: 1,
        duration: 1,
        ease: "power4.inOut",
        transformOrigin: "right",
      })
      .to(document.querySelector(".transition-page"), {
        scaleX: 0,
        duration: 1,
        ease: "power4.inOut",
        transformOrigin: "left",
      });

    leavingPage.play();
    const indicatorLine = document.querySelector(
      ".nav-layout__right-wrapper__indicator .line"
    );

    const burgerMenu = document.querySelectorAll(
      ".burger-menu__upper-line, .burger-menu__lower-line"
    );

    const layoutEl = document.querySelectorAll(".nav-layout a");
    layoutEl.forEach((el) => {
      el.style.color = "black";
    });

    burgerMenu.forEach((el) => {
      el.style.backgroundColor = "black";
    });
  },
};
</script>

<style lang="scss">
.router-anim-leave-to.olywood {
  opacity: 0;
  transition: 0.1s 0.8s;
}
.first-section__sub-section h3 .char {
  transition: 1s cubic-bezier(0.65, 0, 0.35, 1);
  transition-delay: calc(20ms * var(--char-index));
  transform: translateY(100%);
}

.first-section__sub-section p .char {
  transition: 1s cubic-bezier(0.65, 0, 0.35, 1);
  transition-delay: calc(60ms * var(--char-index));
  transform: scale(0);
}

.first-section__sub-section.is-visible h3 .char {
  transform: translateY(0) !important;
}

.second-section__sub-section p .char,
.third-section__sub-section p .char {
  transition: 0.7s cubic-bezier(0.65, 0, 0.35, 1);
  transition-delay: calc(20ms * var(--char-index));
  transform: scale(0);
}

// .second-section__sub-section .arrow img {
//   transition: 1s cubic-bezier(0.65, 0, 0.35, 1);
//   transform: scale(0);
// }
// .second-section__sub-section.is-visible .arrow img {
//   transform: scale(1);
// }

.first-section__sub-section.is-visible p .char,
.second-section__sub-section.is-visible p .char,
.third-section__sub-section.is-visible p .char {
  transform: scale(1) !important;
}

.first-section__sub-section .first-section__sub-section__bolywood__comparaison,
.first-section__sub-section .first-section__sub-section__holywood__comparaison {
  transition: 1s transform cubic-bezier(0.65, 0, 0.35, 1);
  transform: scaleX(0);
  transform-origin: left;
}

.first-section__sub-section.is-visible
  .first-section__sub-section__bolywood__comparaison,
.first-section__sub-section.is-visible
  .first-section__sub-section__holywood__comparaison {
  transition: 1s transform cubic-bezier(0.65, 0, 0.35, 1);
  transform: scaleX(1);
}
.first-section.is-visible .page-bg,
.second-section.is-visible .page-bg,
.third-section.is-visible .page-bg {
  transform: scaleY(1) !important;
}
</style>

<style lang="scss" scoped>
.full-bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: linear-gradient(#161920, #1c2029);
  opacity: 0;
  animation: full-bg-anim 0.1s 1s forwards;
}
.olywood {
  position: absolute;
  pointer-events: none;
  width: calc(100% - 14vh);
  .first-section {
    &__sub-section {
      z-index: 50;
      position: relative;
      &__bolywood,
      &__holywood {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      &__bolywood {
        &__comparaison {
          height: 5px;
          width: 80%;
          background-color: white;
          margin: 5vh;
        }
      }
      &__holywood {
        &__comparaison {
          height: 5px;
          width: 50%;
          background-color: white;
        }
      }
    }
  }
  .second-section,
  .third-section {
    margin-bottom: 10vh;
    &__sub-section {
      height: 100vh;
      display: flex;
      position: relative;
      z-index: 10;
      &__left,
      &__right {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
          margin: 0;
          font-size: 6vw;
          color: white;
          font-weight: 900;
        }
        .h4-wrapper {
          display: flex;
          justify-content: space-around;
          width: 100%;
          margin-top: 2vh;
          h4 {
            margin: 0;
            color: white;
            text-transform: uppercase;
          }
        }
      }
    }
    &__img-left,
    &__img-right {
      position: relative;
      z-index: 9;
      img {
        width: 30%;
        position: absolute;
      }
    }
    &__img-left {
      img {
        bottom: -60vh;
        left: -7vh;
      }
    }
    &__img-right {
      img {
        bottom: -80vh;
        right: -7vh;
      }
    }
  }
}

.arrow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(35deg);
  opacity: 0.1;
  img {
    height: 30%;
  }
}

section .data-sections {
  position: relative;
  z-index: 10;
}

h3 {
  font-size: 6rem;
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

@keyframes full-bg-anim {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
