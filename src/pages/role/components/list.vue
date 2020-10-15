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
      <el-table-column prop="id" label="角色编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180">
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
import { reqRoleDel, reqRoleDetail } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "role/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "role/reqListAction"
    }),
    del(id) {
      reqRoleDel(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    adit(id) {
      this.$emit("adit", id);
    },
    
  },
  mounted() {
    this.reqListAction();
  }
};
</script>
<style scoped></style>
