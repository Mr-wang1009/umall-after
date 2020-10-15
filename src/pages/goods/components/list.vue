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
      <el-table-column prop="id" label="商品编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" sortable width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary">是</el-button>
          <el-button v-else type="danger">否</el-button>
        </template>
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
    <el-pagination
      @current-change="changePage"
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
import { reqGoodsDelete } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      size: "goods/size",
      total: "goods/total"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "goods/reqListAction",
      reqTotalAction: "goods/reqTotalAction",
      changPageAction: "goods/changPageAction"
    }),
    del(id) {
      reqGoodsDelete(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();

          //重新获取总数
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    adit(id) {
      this.$emit("adit", id);
    },
    // 修改当前按钮
    changePage(e) {
      this.changPageAction(e);
    }
  },
  mounted() {
    // 获取list
    this.reqListAction();
    this.reqTotalAction();
  }
};
</script>
<style scoped>
img{
  width: 50px;
  height: 50px;
}
</style>
