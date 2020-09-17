<template>
<Layout class-prefix="xxx">
    <NumberPad />
    <Types />
    <Notes />
    <Tags />
</Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types2.vue";
import {
    component
} from "vue/types/umd";
export default {
    name: "Money",
    components: {
        NumberPad,
        Tags,
        Notes,
        Types
    }
};
</script>

<style lang="scss">
.xxx-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>
