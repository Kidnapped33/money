<template>
<Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @sumbit="saveRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="notes">
        <FormItem fieldName="备注" placeholder="在这里输入备注" :value="record.notes" @update:value="onUpdateNotes" />
    </div>
    <Tags @update:value="record.tags = $event" />
</Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/Money/FormItem.vue";
import {
    Component
} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";

@Component({
    components: {
        Tabs,
        NumberPad,
        Tags,
        FormItem
    }
})
export default class Money extends Vue {
    get recordList() {
        return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;
    record: RecordItem = {
        tags: [],
        notes: "",
        type: "-",
        amount: 0
    };

    created() {
        this.$store.commit("fetchRecords");
    }

    onUpdateNotes(value: string) {
        this.record.notes = value;
    }

    saveRecord() {
        if (!this.record.tags.length || this.record.tags.length === 0) {
            return window.alert("别忘了选择标签哦~");
        }
        this.$store.commit("createRecord", this.record);
        if (this.$store.state.createRecordError === null) {
            window.alert("已保存");
            this.record.notes = "";
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
}

.notes {
    padding: 12px 0;
    background-color: rgb(255, 227, 237);
}
</style>
