<script>
import store from '../../store'
import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/vue/24/solid'
export default {
    components: {
        BookmarkIcon,
        BookmarkSlashIcon
    },
    data() {
        return {
            text: {
                bookmarked: 'Bookmarked',
                bookmark: 'Bookmark'
            }
        }
    },
    props: {
        name: String
    },
    computed: {
        isBookmarked() {
            return store.getters.isBookmarked
        },
        getText() {
            return this.isBookmarked ? 'Bookmarked' : 'Bookmark'
        }
    },
    methods: {
        updateStore() {
            this.$store.commit('updateBookmarks')
        },
        toggle() {
            if (this.isBookmarked) {
                this.$store.commit('removeBookmark')
            } else {
                this.$store.commit('addBookmark')
            }
        }
    }
}
</script>

<template>
    <button @click="this.toggle()">
        <BookmarkSlashIcon v-if="isBookmarked" class="icon" />
        <BookmarkIcon v-else class="icon" />
        <span>{{ getText }}</span>
    </button>
</template>

<styles scoped lang="scss">
@import '../../assets/button.scss';
</styles>