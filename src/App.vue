<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  },
  mounted() {

  },
};

</script>

<style lang="scss">
html, body {
    width: 100vw;
    overflow: hidden;
    position: relative;
}

</style>
