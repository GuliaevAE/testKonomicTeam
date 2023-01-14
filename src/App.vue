<template>
  <v-app class="app">
    <Navbar :tabs="tabs" v-on:switchComponent="tab=>this.currentTab=tab"/>

    <v-main class="components">
      <keep-alive>
        <component  :is="currentTabComponent"></component>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>

import Navbar from './components/Navbar.vue'
export default {
  name: 'App',

  components: {
    Navbar,
    CompOne: () => import('./components/CompOne.vue'),
    CompTwo: () => import('./components/CompTwo.vue')
  },

  data: () => ({
    tabs: ["CompOne", "CompTwo"],
    currentTab: "CompOne",

  }),
  computed: {
    currentTabComponent() {                               //при изменении currentTab меняем компонент
      return this.currentTab;
    }
  },
};
</script>

<style lang="scss">

.app::-webkit-scrollbar{
  width: 0;
}

.components{
  max-height: 100vh;
  width: 100vw;
  background: rgb(202, 202, 202);
  overflow: hidden;
}
</style>
