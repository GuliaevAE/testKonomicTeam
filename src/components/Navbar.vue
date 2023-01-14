<template>
  <v-app-bar class="header" dense  app color="rgb(86, 86, 201)" dark height="50">
    <span class="currentSymbol">{{currentSymbol}}</span>
    <v-spacer></v-spacer>
    <v-btn v-for="tab in tabs" :key="tab" @click="switchComponent(tab)" text>
      <span class="mr-2">{{tab}}</span>
    </v-btn>
  </v-app-bar>
</template>


<script>
export default {
  name: 'NavBar',
  props:['tabs'],
  data(){
    return {currentSymbol: "BTCUSDT"}
  },
  async created() {
    this.$bus.$on("symbol", symbol => {
      this.currentSymbol = symbol;
    });
  },
  methods : {
    switchComponent (tab) {
      this.$emit('switchComponent', tab)
    }
  }
}
</script>


<style lang="scss" scoped>
.header{
  height: inherit;
  .currentSymbol{
    font-size: 25px;
    font-weight: 800;
  }
}
</style>