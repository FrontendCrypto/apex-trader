import { createStore } from 'vuex'
// import chart from './data/chart'
import { bid } from './data/orderbook'
const store = createStore({
  state() {
    return {
      orderbook: {
        bid: bid
      }
    }
  },
  getters: {

  },
  mutations: {

  }
})

export default store
