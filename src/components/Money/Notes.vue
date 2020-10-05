<template>
<div>
    <label class="notes">
        <span class="name">{{ this.fieldName }}</span>
        <input type="text" v-model="value" :placeholder="this.placeholder" />
    </label>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import {
    Component,
    Watch,
    Prop
} from "vue-property-decorator";

@Component
export default class Notes extends Vue {
    // name: "Notes";
    value = "";

    @Prop({
        required: true
    })
    fieldName!: string;
    @Prop() placeholder? : string;

    @Watch("value")
    onValueChange(value: string) {
        this.$emit("update:value", value);
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";

.notes {
    display: flex;
    font-size: 14px;
    background-color: #f5f5f5;
    padding-left: 16px;
    align-items: center;

    >.name {
        padding-right: 16px;
    }

    >input {
        height: 64px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
    }
}
</style>
