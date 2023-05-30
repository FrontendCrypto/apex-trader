<template>
    <span v-if="direction === 'down'" class="down">
        <ArrowDownIcon class="icon" />
        {{ change }} %
    </span>
    <span v-else class="up">
        <ArrowUpIcon class="icon" />
        {{ change }} %
    </span>
</template>

<script>
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid'
import store from '../../store'

export default {
    components: {
        ArrowDownIcon,
        ArrowUpIcon
    },
    computed: {
        change() {
            return store.state.change
        },
        direction() {
            return this.change > 0 ? 'up' : 'down'
        }
    },
}
</script>

<style scoped lang="scss">
.icon {
    width: 16px;
}

span {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;

    &.up {
        color: green;
    }

    &.down {
        color: red;
    }

    .icon {
        color: inherit
    }
}
</style>
