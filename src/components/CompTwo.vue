<template>
  <v-container class="container">
    <v-row>
      <v-col>
        <v-select sm="12" outlined label="Change symbol" :items="options" v-model="currentSymbol"></v-select>
      </v-col>
    </v-row>
    <v-row>
      
        <v-list-item >
          <v-list-item-content>
            <v-col  v-for="i in symbollist" :key="i.value">
            <v-list-item-title>{{ i.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ i.value }}
            </v-list-item-subtitle>
          </v-col>
          </v-list-item-content>
        </v-list-item>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "DiffList",
  data() {
    return {
      options: ["BTCUSDT", "BNBBTC", "ETHBTC"],
      currentSymbol: "BTCUSDT",
      symbollist: [],
      ws:null
    }
  },
  watch: {
    currentSymbol(symbol) {
      this.$bus.$emit('symbol', symbol);
    }
  },
  async created() {
    this.wsSubscribe();
    this.$bus.$on("symbol", symbol => {
      this.symbol = symbol;
      this.ws.close();
      this.wsSubscribe();
    });
  },
  methods: {

    wsSubscribe() {
      this.ws = this.$sdk.subscribe(this.currentSymbol);
      this.ws.onmessage = async event => {          
        let data = JSON.parse(event.data);      
        let list = []
        for (let i in data) {
          switch (i) {
            case 'e':
              list.push({ name: 'Event type', value: data[i] })
              break;
            case 'E':
              list.push({ name: 'Event time', value: data[i] })
              break;
            case 'u':
              list.push({ name: 'Final update ID in event', value: data[i] })
              break;
            case 'U':
              list.push({ name: 'First update ID in event', value: data[i] })
              break;
            case 's':
              list.push({ name: 'Symbol', value: data[i] })
              break;

            default:
              break;
          }
        }
        this.symbollist = list
       
      };
    }
  }
};
</script>


<style lang="scss" scoped>
.container{
  color: rgb(86, 86, 201);
}
</style>