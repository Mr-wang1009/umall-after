<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @adit='edit' ></v-list>
    <v-add :info="info" ref='add'></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: { vList, vAdd },
  data() {
    return {
      info: {
        isShow: false,
        isAdd: false
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    edit(id) {
      this.info.isShow = true;
      this.info.isAdd = false;
      // 让add组件 发起获取详情的请求
      this.$refs.add.look(id);
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
