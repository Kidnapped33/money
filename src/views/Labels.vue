<template>
    <div>
        <Layout>
            <div class="tags">
                <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
                    <span>{{ tag.name }}</span>
                    <Icon name="right"/>
                </router-link>
            </div>
            <div class="createTag-wrapper">
                <Button class="createTag"
                        @click="createTag">新建标签</Button>
            </div>
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Button from "@/components/Button.vue";
    import {mixins} from "vue-class-component";
    import TagHelper from "@/mixins/TagHelper";
    // /* eslint-disable */
    // const tagHelper: any = require("@/mixins/TagHelper");
    // /* eslint-disable */

    @Component({
        components: {Button},
        computed: {
            tags() {
                return this.$store.state.tagList;
            }
        }
    })
    export default class Label extends mixins(TagHelper) {
        beforeCreate() {
            this.$store.commit('fetchTags');
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        background-color: white;
        font-size: 16px;
        padding-left: 16px;

        > .tag {
            background-color: #fff;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;

            svg {
                width: 18px;
                height: 18px;
                color: #777;
                margin-right: 16px;
            }
        }
    }

    .createTag {
        background-color: #767676;
        color: white;
        border-radius: 4px;
        border: none;
        padding: 5px 15px;

        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 40-16px;
        }
    }
</style>
