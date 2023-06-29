import { createStore } from 'vuex'
import { orderbook } from './data/orderbook'
import { trades } from './data/trades'
import { markets } from './data/markets'

const store = createStore({
  state() {
    return {
      markets,
      pairSelector: {
        visible: false
      },
      settings: {
        visible: false
      },
      selectedPrice: null,
      baseCurrency: 'USD',
      currencies: [
        {
          name: 'USD',
        },
        {
          name: 'EUR',
        }
      ],
      asset: 'BTC',
      counterpart: 'USD',
      orderbook,
      trades,
      timeframe: {
        selected: '1w',
        options: ['1d', '1w', '1m'],
      },
      operative: [
        {
          name: 'Buy',
          slug: 'buy',
          selected: true
        },
        {
          name: 'Sell',
          slug: 'sell',
          selected: false
        },
      ],
    }
  },
  getters: {
    isPairSelectorVisible(state) {
      return state.pairSelector.visible
    },
    isSettingsVisible(state) {
      return state.settings.visible
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
    currencies(state) {
      return state.currencies
    },
    timeframe(state) {
      return state.timeframe.selected
    },
    counterpart(state) {
      return state.counterpart
    },
    asset(state) {
      return state.asset
    },
    bids(state) {
      return state.orderbook.bids
    },
    asks(state) {
      return state.orderbook.asks
    },
    operative(state) {
      return state.operative
    },
    assetIconPath(state) {
      const slug = state.asset.toLowerCase()
      return `node_modules/cryptocurrency-icons/svg/white/${slug}.svg`;
    },
    trades(state) {
      return state.trades
    },
    selectedPrice(state) {
      return state.selectedPrice
    }
  },
  mutations: {
    updatePairSelectorVisibility(state, value) {
      state.pairSelector.visible = value
    },
    updateSettingsVisibility(state, value) {
      state.settings.visible = value
    },
    updateAsset(state, value) {
      state.asset = value
    },
    updateOperativeSelectedTab(state, value) {
      state.operative.forEach((element) => {
        element.selected = (element.slug === value);
      });
    },
    updateSelectedPrice(state, value) {
      state.selectedPrice = value
    },
    updateBaseCurrency(state, value) {
      state.baseCurrency = value
    },
    updateTimeframe(state, selectedTimeframe) {
      state.timeframe.selected = selectedTimeframe;
    },
  }
})

export default store
