import { createStore } from 'vuex'
// import chart from './data/chart'
import { bid, ask } from './data/orderbook'
const store = createStore({
  state() {
    return {
      orderbook: {
        bid: bid,
        ask: ask,
      }
    }
  },
  getters: {

  },
  mutations: {

  }
})

export default store
