<script>
export default {
    props: {
        name: String
    }
}
</script>

<template>
    <button>
        <slot></slot>
        <span>{{ name }}</span>
    </button>
</template>

<styles scoped lang="scss">
@import '../../assets/button.scss';
</styles>