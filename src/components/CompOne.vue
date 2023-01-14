<template>
  <v-container>
    <v-row justify="center">
      <v-col class="d-sm-block d-md-none" sm="2" xs="12" >
        <v-btn  color="rgb(86, 86, 201)" dark block  @click="clickButton" elevation="2">{{button==='bids'? 'ASKS':'BIRDS'}}</v-btn>
      </v-col>
      
      <v-col class="d-sm-block d-md-none" md="6" sm="10">
        <TableComp :items="glass[button]">{{button.toLocaleUpperCase()}}</TableComp>
      </v-col>



      <v-col class="d-none d-sm-none d-md-block" md="6" >
        <TableComp :items="glass.bids">BIDS</TableComp>
      </v-col>
      <v-col class="d-none d-sm-none d-md-block" md="6" >
        <TableComp :items="glass.asks">ASKS</TableComp>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableComp from "./TableComp.vue";
export default {
  name: 'CompOne',
  components: { TableComp },
  data: () => ({
    symbol: "BTCUSDT",
    glass: {
      bids: null,
      asks: null
    },
    button:'bids',
    ws: null
  }),
  async created() {
    await this.snapshot();
    this.wsSubscribe();
    this.$bus.$on("symbol", symbol => {
      this.symbol = symbol;
      this.ws.close();
      this.wsSubscribe();
    });
  },
  methods: {
    clickButton(){
      this.button==='bids'?this.button='asks': this.button='bids'
    },
    async snapshot() {
      let glass = await this.$sdk.get(this.symbol);
      glass.bids = glass.bids.reverse();
      glass.asks = glass.asks.reverse();
      this.glass = glass;
    },
    wsSubscribe() {
      this.ws = this.$sdk.subscribe(this.symbol);
      this.ws.onmessage = async event => {
        let data = JSON.parse(event.data);
        let [asksAdd, bidsAdd] = [
          data.a.filter(item => item[1] != 0),
          data.b.filter(item => item[1] != 0)
        ];
        asksAdd.reverse();
        bidsAdd.reverse();
        this.glass.asks.splice(this.glass.asks.length - asksAdd.length, asksAdd.length);
        this.glass.bids.splice(this.glass.bids.length - bidsAdd.length, bidsAdd.length);
        this.glass.asks = [...asksAdd, ...this.glass.asks,];
        this.glass.bids = [...bidsAdd, ...this.glass.bids,];

      };
    }
  }
}
</script>
