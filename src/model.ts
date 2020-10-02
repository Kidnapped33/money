const localStorageKeyName = "recordList"
const model = {
    clone(data: RecordItem[] | RecordItem){
        return JSON.parse(JSON.stringify(data))
    },
    //fetch  接来；到达；取来
    //获取数据
    fetch() {
        //const recordList: Record[] = (变成return)
        return JSON.parse(
            window.localStorage.getItem(localStorageKeyName) || "[]"
        ) as RecordItem[];
    },
    //保存数据
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }
}

export default model