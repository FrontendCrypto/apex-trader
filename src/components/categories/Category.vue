<script>
export default {
    props: {
        name: String
    },
    computed: {}
}
</script>

<template>
    <button>
        <slot></slot>
        <span>{{ name }}</span>
        <span></span>
    </button>
</template>

<styles scoped lang="scss">
@import '../../assets/button.scss';
.icon{
    width: 16px;
    color: rgb(70, 70, 70);
}
</styles>