<template>
<Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <ol v-if="groupedList.length > 0">
        <li v-for="(group, index) in groupedList" :key="index">
            <h3 class="title">
                {{ beautify(group.title) }} <span>￥{{ group.total }}</span>
            </h3>
            <ol>
                <li v-for="item in group.items" :key="item.id" class="record">
                    <span>{{ tagString(item.tags) }}</span>
                    <span class="notes">{{ item.notes }}</span>
                    <span>￥{{ item.amount }} </span>
                </li>
            </ol>
        </li>
    </ol>
    <div class="noResult" v-else>
        快来记账吧~
    </div>
</Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {
    Component
} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
    components: {
        Tabs
    }
})
export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
        return tags.length === 0 ? "无" : tags.map(t => t.name).join(" | ");
    }

    beautify(string: string) {
        const day = dayjs(string);
        const now = dayjs();
        if (day.isSame(now, "day")) {
            return "今天";
        } else if (day.isSame(now.subtract(1, "day"), "day")) {
            return "昨天";
        } else if (day.isSame(now.subtract(2, "day"), "day")) {
            return "前天";
        } else if (day.isSame(now, "year")) {
            return day.format("M-DD");
        } else {
            return day.format("YYYY-M-D");
        }
    }

    get recordList() {
        return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
        const {
            recordList
        } = this;
        if (recordList.length === 0) {
            return [];
        }
        type HashTableValue = {
            title: string;
            items: RecordItem[];
        };
        // const hashTable: { title: string; items: RecordItem[] }[];
        const newList = clone(recordList)
            .filter(r => r.type === this.type)
            .sort(
                (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
            );
        if (newList.length === 0) {
            return [] as Result;
        }
        type Result = {
            title: string;
            total? : number;
            items: RecordItem[];
        } [];
        const result: Result = [{
            title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
            items: [newList[0]]
        }];
        for (let i = 1; i < newList.length; i++) {
            const current = newList[i];
            const last = result[result.length - 1];
            if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
                last.items.push(current);
            } else {
                result.push({
                    title: dayjs(current.createdAt).format("YYYY-MM-DD"),
                    items: [current]
                });
            }
        }
        const x = result.map(group => {
            group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
        });
        console.log(result);
        return result;
    }

    beforeCreate() {
        this.$store.commit("fetchRecords");
    }

    type = "-";
    recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
%item {
    padding: 8px 16px;
    min-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.title {
    @extend %item;
}

.record {
    background-color: rgb(219, 150, 167);
    color: white;
    @extend %item;
}

.notes {
    margin-right: auto;
    margin-left: 16px;
    color: rgb(102, 86, 86);
}

.noResult {
    padding-top: 30px;
    text-align: center;
    font-size: 25px;
}

::v-deep {
    .type-tabs-item {
        background: white;

        &.selected {
            background: rgb(211, 150, 167);
            color: white;

            &::after {
                display: none;
            }
        }
    }

    .interval-tabs-item {
        height: 48px;
    }
}
</style>
