// It has three concepts, the state, getters and actions and it's safe to assume these concepts are the equivalent of data, computed and methods in components.

import { defineStore } from 'pinia'
import { bid } from '../data/orderbook'
export const useOrderbookStore = defineStore('orderbook', {
    state: () => {
        return {
            bid: bid
        }
    },
    // getters: {
    //     double: (state) => state.count * 2,
    // },
    actions: {

    }
})