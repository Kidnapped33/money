import Vue from 'vue';
import Vuex from 'vuex';
import clone from "@/lib/clone";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[]
    },
    mutations: {
        fetchRecords(state) {
            const recordList = JSON.parse(
                window.localStorage.getItem("recordList") || "[]") as RecordItem[];
            return {recordList: recordList};
        },
        createRecord(state, record) {
            const record2: RecordItem = clone(record);
            record2.createdAt = new Date();
            state.recordList.push(record2);
            store.commit("saveRecords");
        },
        saveRecords(state) {
            window.localStorage.setItem("recordList",
                JSON.stringify(state.recordList));
        },
    }
});

export default store;
