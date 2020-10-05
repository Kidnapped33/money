<template>
<div>
    <button class="button" @click="$emit('click', $event)">
        <slot />
    </button>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "vue-property-decorator";

@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
.button {
    background-color: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 5px 15px;

    &-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 40-16px;
    }
}
</style>
