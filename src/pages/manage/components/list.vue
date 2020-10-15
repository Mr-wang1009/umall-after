<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" disabled type="primary">
            启 用</el-button
          >

          <el-button v-else disabled type="info ">禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="adit(scope.row.uid)"
            >修 改</el-button
          >

          <del-btn @confirm="del(scope.row.uid)"></del-btn>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    @current-change='changePage'
  background
  layout="prev, pager, next"
  :total="total" :page-size='size'>
</el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqManageDel, reqManageDetail } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      size: "manage/size",
      total: "manage/total"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "manage/reqListAction",
      reqTotalList: "manage/reqTotalAction",
      changPageAction: "manage/changPageAction"
    }),
    del(id) {
      reqManageDel(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();

          //重新获取总数
            this.reqTotalList()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    adit(id) {
      this.$emit("adit", id);
    },
    // 修改当前按钮
    changePage(e){

      this.changPageAction(e)
    }
  },
  mounted() {

    // 获取list
    this.reqListAction();
    this.reqTotalList()
  }
};
</script>
<style scoped></style>
