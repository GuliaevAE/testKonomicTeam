const axios = require('axios');

export const SDK = {
  get : async (symbol)=> {
      let glass = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=500`);   // делаем снепшот стакана по символу ${symbol}
      return glass.data;
      },
  subscribe : function(symbol)  {
      let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`);
      return ws     
  }
};