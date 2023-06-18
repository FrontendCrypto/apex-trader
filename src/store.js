import { createStore } from 'vuex'
// import chart from './data/chart'
import { orderbook } from './data/orderbook'
import { trades } from './data/trades'
import { markets } from './data/markets'
const store = createStore({
  state() {
    return {
      markets: markets,
      pairSelector: {
        visible: false
      },
      baseCurrency: 'USD',
      asset: 'BTC',
      counterpart: 'USD',
      orderbook,
      trades,
      timeframe: {
        selected: 24,
        values: [1, 4, 12, 24]
      },
      // price: {
      //   value: '27342',
      //   change: '-3,67'
      // },
      operative: {
        type: 'buy'
      }
    }
  },
  getters: {
    pairSelectorVisibility(state) {
      return state.pairSelector.visible
    },
    selectedAssetPrice(state) {
      const selectedMarket = state.markets.find(market => market.ticker === state.asset);
      return selectedMarket ? selectedMarket.price.value : null;
    },
    selectedAssetChange(state) {
      const selectedMarket = state.markets.find(market => market.ticker === state.asset);
      return selectedMarket ? selectedMarket.price.change : null;
    },
    baseCurrency(state) {
      return state.baseCurrency
    },
    timeframe(state) {
      return state.timeframe.selected
    },
    counterpart(state) {
      return state.counterpart
    },
    asset(state) {
      return state.asset
    }
  },
  mutations: {
    updatePairSelectorVisibility(state, value) {
      state.pairSelector.visible = value
    },
    updateAsset(state, value){
      state.asset = value
    }
  }
})

export default store
