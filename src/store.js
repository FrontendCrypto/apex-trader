import { createStore } from 'vuex'
// import chart from './data/chart'
import { bid, ask } from './data/orderbook'
import { trades } from './data/trades'
const store = createStore({
  state() {
    return {
      currency: 'USD',
      asset: 'BTC',
      counterpart: 'USD',
      orderbook: {
        bid: bid,
        ask: ask,
      },
      trades: trades,
      timeframe: {
        selected: 24,
        values: [1, 4, 12, 24]
      },
      price: {
        value: '27342',
        change: '-3,67'
      },
      operative:{
        type: 'buy'
      }
    }
  },
  getters: {

  },
  mutations: {

  }
})

export default store
