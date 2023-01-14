<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="6">
        <TableComp :items="glass.bids">Bids</TableComp>
      </v-col>
      <v-col md="6" sm="6">
        <TableComp :items="glass.asks">Asks</TableComp>
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
