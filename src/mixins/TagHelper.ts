import Vue from "vue";
import Component from "vue-class-component";

@Component
export class TagHelper extends Vue {
    hello = "hello";

    createTag() {
        const names = this.$store.state.tagList.map(item => item.name);
        const name = window.prompt("请输入标签名");
        if (!name) {
            return window.alert("标签名不能为空");
        } else if (names.indexOf(name) >= 0) {
            window.alert("标签名已存在");
            return "duplicated";
        }
        this.$store.commit("createTag", name);
    }
}

export default TagHelper;