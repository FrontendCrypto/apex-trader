<template>
    <div class="operative-tabs">
        <div class="operative-tabs-bar">
            <button class="operative-tabs-item active">
                <span>Buy</span>
            </button>
            <button class="operative-tabs-item">
                <span>Sell</span>
            </button>
        </div>
        <div class="content">
            <form>
                <div class="order-type">
                    <div>
                        <input type="radio" name="orderType" id="limit" value="limit" checked>
                        <label for="limit"><span>Limit</span></label>
                    </div>
                    <div>
                        <input type="radio" name="orderType" id="market" value="market">
                        <label for="market"><span>Market</span></label>
                    </div>
                    <div>
                        <input type="radio" name="orderType" id="stopLimit" value="stopLimit">
                        <label for="stopLimit"><span>Stop Limit</span></label>
                    </div>
                    <div>
                        <input type="radio" name="orderType" id="oco" value="stopLimit">
                        <label for="oco"><span>OCO</span></label>
                    </div>
                </div>
                <div class="order-form">
                    <div>
                        <label for="quantity">Quantity ({{ asset }})</label>
                        <input type="number" name="" id="quantity" value="">
                    </div>
                    <div>
                        <label for="price">Price ({{ counterpart }})</label>
                        <input type="number" name="" id="price" value="">
                    </div>
                    <div>
                        <label for="total">Total ({{ counterpart }})</label>
                        <input type="number" name="" id="total" value="">
                    </div>
                </div>
                <div class="advanced">
                    <div>
                        <label for="timeInForce">Time in force</label>
                        <select name="" id="timeInForce">
                            <option selected>Good Til Cancelled</option>
                            <option>Inmediate or Cancel</option>
                            <option>Fill or Kill</option>
                        </select>
                    </div>
                    <div>
                        <label for="postOnly">Post Only?</label>
                        <input type="checkbox" id="postOnly">
                    </div>
                </div>
            </form>
            <span style="margin-top: auto;">ApexTrader by Pablo Carballeda</span>
        </div>
    </div>
</template>
<script>
import store from '../store';

export default {
    components: {

    },
    computed:{
        currency(){
            return store.state.currency
        },
        asset(){
            return store.state.asset
        },
        counterpart(){
            return store.state.counterpart
        }
    },
    methods: {

    }
}
</script>

<styles scoped lang="scss">
@import '@/assets/variables.scss';

.operative-tabs {
    display: grid;
    grid-template-rows: 48px 1fr;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;

    &.expand {
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
    display: flex;
    flex-direction: column;
}
</styles>