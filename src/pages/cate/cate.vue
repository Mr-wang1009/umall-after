<template>
  <div>
    <el-button type="primary" @click="willAdd">添 加</el-button>
    <v-list @adit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./componrnts/list";
import vAdd from "./componrnts/add";
export default {
  props: [],
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      // 传递给add的数据
      info: {
        // 添加弹框状态
        isShow: false,
        isAdd: true
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      // this.$refs.add.empty()
      this.info.isShow = true;
      // 添加还是编辑 true添加 false编辑
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
