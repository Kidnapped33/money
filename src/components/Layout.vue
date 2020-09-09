<template>
<div>
    <div class="nav-border">
        <div class="money">
            <slot />
        </div>
        <Nav />
    </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";

export default {
    name: "Layout"
};
</script>

<style scoped>
.nav-border {
    border: 2px solid green;
    display: flex;
    flex-direction: column;
    width: 100vh;
    height: 100vh;
}

.money {
    border: 2px solid red;
    overflow: auto;
    flex-grow: 1;
}
</style>
