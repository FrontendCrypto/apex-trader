<script>
import { StarIcon as StarIconOutlined } from '@heroicons/vue/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid'

export default {
    components: {
        starIconOutlined: StarIconOutlined,
        starIconSolid: StarIconSolid,
    },
    props: {
        ticker: String,
        favorite: Boolean,
        size: Number
    },
    computed: {
        styles() {
            return `width: ${this.size}px`
        }
    },
}
</script>

<template>
    <button @click="this.$emit('toggleFavorite')">
        <star-icon-solid v-if="favorite" class="icon favorite" :style="styles" />
        <star-icon-outlined v-else class="icon" :style="styles" />
    </button>
</template>

<style scoped lang="scss">
@import '../assets/variables';

button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
}

.icon {
    color: $surfaceContent;

    &.favorite {
        color: $surfaceContentHight;
    }
}
</style>
