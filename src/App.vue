<template>

  <div id="app">    
    <h1 id="h1">hello world</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#h1{
  position: fixed;
  top: 0;
  right: 0;
}
</style>
