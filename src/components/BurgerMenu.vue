<template>
  <div class="burger-menu">
    <div class="burger-menu__upper-line"></div>
    <div class="burger-menu__lower-line"></div>
  </div>
</template>

<script>
export default {
  name: "BurgerMenu",
  mounted() {},
};
</script>

<style scoped lang="scss">
.burger-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &__upper-line,
  &__lower-line {
    height: 2px;
    width: 30px;
    background-color: black;
  }
  &__lower-line {
    margin-top: 10px;
    width: 20px;
  }
}
</style>
