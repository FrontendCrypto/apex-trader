<template>
    <div class="operative-tabs">
        <div class="operative-tabs-bar">
            <div class="tabs expanded">
                <div class="tabbar">
                    <button :class="['tabbar-item', tab.selected ? 'active' : '', tab.slug]" v-for="tab in operative"
                        :key="tab.slug" @click="updateOperativeSelectedTab(tab.slug)">
                        <span>{{ tab.name }}</span>
                    </button>
                </div>
                <div class="content">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
        <div class="content">
            <form class="order-form">
                <div>
                    <div class="order-type form-element">
                        <label for="orderType">Order type</label>
                        <select id="orderType" name="orderType" v-model="orderType">
                            <option v-for="type in orderTypes" :key="type.value" :value="type.value">{{ type.label }}
                            </option>
                        </select>
                    </div>

                    <div v-if="orderType === 'limit'">
                        <div class="form-element">
                            <label for="quantity">Quantity ({{ asset }})</label>
                            <input type="number" name="" id="quantity" value="">
                        </div>
                        <div class="form-element">
                            <label for="price">Price ({{ counterpart }})</label>
                            <input type="number" name="" id="price" value="">
                        </div>
                        <div class="form-element">
                            <label for="total">Total (incl. fee) ({{ counterpart }})</label>
                            <input type="number" name="" id="total" value="">
                        </div>
                    </div>

                    <div v-if="orderType === 'stopLimit'">
                        <div class="form-element">
                            <label for="triggerPrice">Trigger Price {{ counterpart }}</label>
                            <input type="number" name="triggerPrice" id="triggerPrice" value="">
                        </div>
                        <div class="form-element">
                            <label for="quantity">Quantity {{ asset }}</label>
                            <input type="number" name="quantity" id="quantity" value="">
                        </div>
                        <div class="form-element">
                            <label for="price">Price {{ counterpart }}</label>
                            <input type="number" name="price" id="price" value="">
                        </div>
                        <div class="form-element">
                            <label for="total">Total (incl. fee) ({{ counterpart }})</label>
                            <input type="number" name="" id="total" value="">
                        </div>
                    </div>

                    <div v-if="orderType === 'market'">
                        <div class="form-element">
                            <label for="quantity">Quantity aprox. {{ asset }}</label>
                            <input type="number" name="" id="quantity" value="">
                        </div>
                        <div class="form-element">
                            <label for="totalPrice">Total Price {{ counterpart }}</label>
                            <input type="number" name="" id="totalPrice" value="">
                        </div>
                    </div>

                    <div v-if="orderType === 'oco'">
                        <div class="form-element">
                            <label for="price">Price {{ counterpart }}</label>
                            <input type="number" name="" id="price" value="">
                        </div>
                        <div class="form-element">
                            <label for="stop">Stop {{ counterpart }}</label>
                            <input type="number" name="" id="stop" value="">
                        </div>
                        <div class="form-element">
                            <label for="limit">Limit {{ counterpart }}</label>
                            <input type="number" name="" id="limit" value="">
                        </div>
                        <div class="form-element">
                            <label for="quantity">Quantity {{ asset }}</label>
                            <input type="number" name="" id="quantity" value="">
                        </div>
                    </div>
                    <button class="button w-100">
                        <span>Buy</span>
                    </button>
                </div>
                <div class="advanced">
                    <span class="section-title">Advanced options</span>
                    <div class="form-element">
                        <label for="timeInForce">Time in force</label>
                        <select name="" id="timeInForce">
                            <option selected>Good Til Cancelled</option>
                            <option>Inmediate or Cancel</option>
                            <option>Fill or Kill</option>
                        </select>
                    </div>
                    <div class="form-element">
                        <label for="postOnly">Post Only?</label>
                        <input type="checkbox" id="postOnly">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    data() {
        return {
            orderType: 'limit',
            orderTypes: [
                { value: 'limit', label: 'Limit' },
                { value: 'market', label: 'Market' },
                { value: 'stopLimit', label: 'Stop Limit' },
                { value: 'oco', label: 'OCO' }
            ]
        }
    },
    computed: {
        ...mapGetters(['operative', 'asset', 'counterpart']),
    },
    methods: {
        ...mapMutations(['updateOperativeSelectedTab']),
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.tabs {
    display: grid;
    grid-template-rows: 48px 1fr;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;

    &.expanded {
        .tabbar-item {
            flex: 1;
            align-items: center;
        }
    }
}

.tabbar {
    display: flex;
    flex-direction: row;
    height: 100%;
    border-bottom: 1px solid rgb(38, 43, 56);
}

.tabbar-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 16px;
    color: $surfaceContent;
    border-color: rgb(38, 43, 56);
    border-width: 0 1px 0 0;
    border-style: solid;
    height: 100%;
    gap: 4px;
    font-size: 14px;
    transition: 0.2s ease-in-out;
    background-color: transparent;
    border: 0;
    border-bottom: 3px solid transparent;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }

    &.active {
        background-color: rgba(255, 255, 255, 0.05);

        &.buy {
            border-color: rgba(118, 209, 170, 1);
        }

        &.sell {
            border-color: rgba(173, 155, 227, 1);
        }
    }
}

.operative-tabs {
    display: grid;
    grid-template-rows: 48px 1fr;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;

    &.expanded {
        .operative-tabs-item {}
    }
}

.operative-tabs-bar {
    display: flex;
    flex-direction: row;
    height: 100%;
    border-bottom: 1px solid rgb(38, 43, 56);
}

.operative-tabs-item {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    color: $surfaceContent;
    border-color: rgb(38, 43, 56);
    border-width: 0 1px 0 0;
    border-style: solid;
    height: 100%;
    gap: 4px;
    font-size: 14px;
    transition: 0.2s ease-in-out;
    background-color: transparent;
    border: 0;
    border-bottom: 3px solid transparent;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }

    &.active {
        background-color: rgba(255, 255, 255, 0.05);
        border-color: rgb(55, 43, 100);
    }
}

.content {
    padding: 12px;
}

.order-form {
    display: flex;
    gap: 24px;
    flex-direction: column;
}

.section-title {
    font-size: 18px;
}
</style>
