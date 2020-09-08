<template>
<div class="nav-border">
    <div class="money">Money</div>
    <Nav />
</div>
</template>

<script lang="ts">
export default {
    name: "Money"
};
</script>

<style lang="scss" scoped>
.nav-border {
    border: 2px solid green;
    width: 100vh;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.money {
    border: 2px solid red;
    overflow: auto;
    flex-grow: 1;
}
</style>
