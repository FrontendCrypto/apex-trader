<template>
    <div :class="['tabs', expanded ? 'expand' : '']">
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
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    props: {
        expanded: Boolean,
    },
    components: {

    },
    computed: {
        ...mapGetters(['operative']),
    },
    methods: {
        ...mapMutations(['updateOperativeSelectedTab']),
    }
}
</script>

<styles scoped lang="scss">
@import '@/assets/variables.scss';

.tabs {
    display: grid;
    grid-template-rows: 48px 1fr;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;

    &.expand {
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

.content {
    padding: 12px;
}
</styles>