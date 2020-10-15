<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column sortable prop="id" label="分类编号"> </el-table-column>
      <el-table-column sortable prop="catename" label="分类名称">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope" >
          <img :src="$imgPre + scope.row.img" v-if="scope.row.img!='null'" alt="" />
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" disabled type="primary">
            启 用</el-button
          >

          <el-button v-else disabled type="info ">禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="adit(scope.row.id)"
            >修 改</el-button
          >

          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqCateDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction"
    }),
    adit(id) {
      this.$emit("adit", id);
    },
    del(id) {
      reqCateDel(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.reqListAction();
  }
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
  display: inline-block;
}
</style>
