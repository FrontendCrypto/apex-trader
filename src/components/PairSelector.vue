<script>
import { mapGetters, mapMutations } from 'vuex';
import anime from 'animejs'
export default {
    computed: {
        ...mapGetters(['pairSelectorVisibility']),
        isVisible: {
            get() {
                return this.pairSelectorVisibility;
            },
            set(newValue) {
                this.updatePairSelectorVisibility(newValue);
            },
        },
    },
    watch: {
        isVisible(newValue) {
            newValue ? this.show() : this.hide();
        }
    },
    methods: {
        ...mapMutations(['updatePairSelectorVisibility']),
        show() {
            anime({
                targets: '.pair-selector',
                left: '0px',
                easing: 'easeInOutQuad',
                duration: 300
            });
        },
        hide() {
            anime({
                targets: '.pair-selector',
                left: '-300px',
                easing: 'easeInOutQuad',
                duration: 300
            });
        }
    },
}
</script>

<template>
    <div class="pair-selector">
        <button @click="isVisible = false">Cerrar</button>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Change</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Change</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Change</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/variables.scss';

.pair-selector {
    position: absolute;
    height: 100vh;
    background-color: $surfaceHight;
    width: 300px;
    left: -300px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    z-index: 2;
    box-sizing: border-box;
}

.row {
    display: grid;
    grid-template-columns: ;

    span {
        color: $surfaceContent;
        flex: 1;
    }
}
</style>