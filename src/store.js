import { createStore } from 'vuex'
import { market } from './data/market'
import { preferences } from './data/preferences'
const store = createStore({
  state() {
    return {
      user: {
        currency: '€',
        configuration: {
          show: false,
          showActions: true,
          showCategories: true
        },
        bookmarks: preferences.bookmarks,
        keyboard: {
          show: true,
          height: Number
        },
      },
      ticker: 'btc',
      data: market['btc'],
      color: market['btc'].chart.foreColor,
      series: market['btc'].chart.series,
      change: market['btc'].change,
      icon: market['btc'].icon
    }
  },
  getters: {
    isBookmarked(state) {
      return state.user.bookmarks.includes(state.ticker)
    },
    isKeyboardVisible(state) {
      return state.user.keyboard.show
    }
  },
  mutations: {
    selectCoin(state, value) {
      state.ticker = value
      state.data = market[state.ticker]
      state.color = market[state.ticker].chart.foreColor
      state.series = market[state.ticker].chart.series
      state.change = market[state.ticker].change
      state.icon = market[state.ticker].icon
    },
    toggleCategories(state) {
      state.user.configuration.showCategories = !state.user.configuration.showCategories
    },
    toggleActions(state) {
      state.user.configuration.showActions = !state.user.configuration.showActions
    },
    toggleConfiguration(state) {
      state.user.configuration.show = !state.user.configuration.show
    },
    hideConfiguration(state) {
      state.user.configuration.show = false
    },
    showConfiguration(state) {
      state.user.configuration.show = true
    },
    addBookmark(state) {
      // Add current ticker to bookmarks array.
      state.user.bookmarks.push(state.ticker)
    },
    removeBookmark(state) {
      // Create nearray of bookmarks filtering current ticker.
      state.user.bookmarks = state.user.bookmarks.filter((item) => item !== state.ticker)
    },
    hideKeyboard(state) {
      state.user.keyboard.show = false
    },
    showKeyboard(state) {
      state.user.keyboard.show = true
    },
    setKeyboardHeight(state, value) {
      state.user.keyboard.height = value
    }
  }
})

export default store
