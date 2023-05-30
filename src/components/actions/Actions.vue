<script>
import Action from './Action.vue'
import BookmarkAction from './BookmarkAction.vue'
import { ArrowsUpDownIcon, ChevronDoubleUpIcon, ChevronDoubleDownIcon } from '@heroicons/vue/24/solid'
export default {
    components: {
        Action,
        BookmarkAction,
        ArrowsUpDownIcon,
        ChevronDoubleDownIcon,
        ChevronDoubleUpIcon,
    },
    props: {
        isFavorite: Boolean,
    }
}
</script>

<template>
    <div class="actions">
        <Action name="Buy">
            <ChevronDoubleDownIcon class="icon" />
        </Action>
        <Action name="Swap">
            <ArrowsUpDownIcon class="icon" />
        </Action>
        <Action name="Sell">
            <ChevronDoubleUpIcon class="icon" />
        </Action>
    </div>
</template>

<style scoped lang="scss">
.actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 48px;
    grid-auto-flow: column;
    gap: 4px;
}
</style>
