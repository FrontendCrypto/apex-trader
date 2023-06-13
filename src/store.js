import { createStore } from 'vuex'
// import chart from './data/chart'
import { bid, ask } from './data/orderbook'
const store = createStore({
  state() {
    return {
      orderbook: {
        bid: bid,
        ask: ask,
      },
      timeframe: {
        selected: 24,
        values: [1, 4, 12, 24]
      },
      price: {
        currency: 'USD',
        value: '27342',
        change: '-3,67'
      }
    }
  },
  getters: {

  },
  mutations: {

  }
})

export default store
