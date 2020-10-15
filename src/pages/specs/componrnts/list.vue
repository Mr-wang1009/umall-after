<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column sortable prop="id" label="规格编号"> </el-table-column>
      <el-table-column sortable prop="specsname" label="规格名称">
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item.id">{{
            item
          }}</el-tag>
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
    <el-pagination
      @current-change="changPageAction"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqSpecsDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      size: "specs/size",
      total: "specs/total"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction",
      reqTotalList: "specs/reqTotalAction",
      changPageAction: "specs/changPageAction"
    }),
    adit(id) {
      this.$emit("adit", id);
    },
    del(id) {
      reqSpecsDel(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqTotalList();
          this.reqListAction()
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.reqListAction();
    this.reqTotalList();
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
