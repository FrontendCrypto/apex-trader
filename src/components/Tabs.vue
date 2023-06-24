<template>
    <div class="tabs">
        <div class="tabs-bar">
            <div class="tabs expanded">
                <div class="tabbar">
                    <button v-for="(tab, index) in tabs" :key="index" :class="['tabbar-item', tab.selected ? 'active' : '']"
                        @click="updateSelectedTab(index)">
                        <span>{{ tab.name }}</span>
                    </button>
                </div>
                <div class="content">
                    <div class="open-orders" v-if="openOrdersSelected">
                        <div class="row">
                            Open orders row
                        </div>
                        <!-- <OpenOrders /> -->
                    </div>
                    <div class="filled-orders" v-if="filledOrdersSelected">
                        <div class="row">
                            Filled orders row
                        </div>
                        <!-- <FilledOrders /> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            tabs: [
                {
                    name: 'Open orders',
                    selected: true,
                },
                {
                    name: 'Filled orders',
                    selected: false,
                },
            ],
        }
    },
    computed: {
        openOrdersSelected() {
            return this.tabs[0].selected;
        },
        filledOrdersSelected() {
            return this.tabs[1].selected;
        },
    },
    methods: {
        updateSelectedTab(index) {
            this.tabs.forEach((tab, i) => {
                tab.selected = i === index;
            });
        },
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

.button {
    font-size: 20px;
    font-weight: bold;

    &.buy {
        background-color: rgba($positive, 0.1);
    }

    &.sell {
        background-color: rgba($negative, 0.1);
    }
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

.tabs {
    display: grid;
    grid-template-rows: 48px 1fr;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;

    &.expanded {
        .tabs-item {}
    }
}

.tabs-bar {
    display: flex;
    flex-direction: row;
    height: 100%;
    border-bottom: 1px solid rgb(38, 43, 56);
}

.tabs-item {
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

    .upper {
        flex: 1;
    }
}

.section-title {
    font-size: 18px;
    margin-bottom: 24px;
    display: block;
}
</style>
