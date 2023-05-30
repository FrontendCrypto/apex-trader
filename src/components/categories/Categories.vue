<script>
import Category from '../categories/Category.vue'
import BookmarkCategory from '../categories/BookmarkCategory.vue'

import { BookmarkIcon, CubeTransparentIcon, CubeIcon, EllipsisHorizontalCircleIcon, PuzzlePieceIcon } from '@heroicons/vue/24/solid'
export default {
    components: {
        Category,
        BookmarkCategory,
        CubeTransparentIcon,
        CubeIcon,
        EllipsisHorizontalCircleIcon,
        PuzzlePieceIcon,
        BookmarkIcon
    },
    data() {
        return {
            categories: [
                { name: 'All', icon: EllipsisHorizontalCircleIcon },
                { name: 'Bookmarks', icon: BookmarkIcon },
                { name: 'DeFi', icon: CubeTransparentIcon },
                { name: 'Gaming', icon: PuzzlePieceIcon },
                { name: 'PoW', icon: CubeIcon },
                { name: 'PoS', icon: EllipsisHorizontalCircleIcon },
            ]
        }
    },
    computed: {
        getslug(name) {
            return name.toLowerCase()
        }
    }
}
</script>

<template>
    <div class="categories">
        <component v-for="category in categories" :is="category.name == 'Bookmarks' ? 'BookmarkCategory' : 'Category'"
            :name="category.name" :key="category.name">
            <component :is="category.icon" class="icon"></component>
        </component>
    </div>
</template>

<style scoped lang="scss">
.categories {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 48px;
    overflow: hidden;
    grid-auto-flow: column;
    gap: 4px;
    /* 1 line */
}
</style>
