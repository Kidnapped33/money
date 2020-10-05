const localStorageKeyName = "recordList";
const recordListModel = {
        data: [] as RecordItem[],
        clone(data: RecordItem[] | RecordItem) {
            return JSON.parse(JSON.stringify(data))
        },
        //fetch  接来；到达；取来
        //获取数据
        fetch() {
            //const recordList: Record[] = (变成return)
            this.data = JSON.parse(
                window.localStorage.getItem(localStorageKeyName) || "[]"
            );
            return this.data
        },
        //保存数据
        save() {
            window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
        }
    }
;

export default recordListModel