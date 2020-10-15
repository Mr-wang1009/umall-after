<template>
  <el-dialog
    :title="info.isAdd ? '添加菜单' : '修改菜单'"
    :visible.sync="info.isShow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select
          v-model="form.pid"
          placeholder="请选择上级菜单"
          @change="changePid"
        >
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio v-model="form.type" :label="1" disabled>目 录</el-radio>
        <el-radio v-model="form.type" :label="2" disabled>菜 单</el-radio>
      </el-form-item>
      <el-form-item label="菜单图标" v-if="form.type == 1">
        <el-select v-model="form.icon">
          <el-option v-for="item in icons" :key="item" :value="item">
            <i :class="item"></i>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单地址" v-else>
        <el-select v-model="form.url">
          <el-option
            v-for="item in routerChildren"
            :key="item.path"
            :value="'/' + item.path"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
      <el-button type="primary" @click="update" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { routerChildren } from "../../../router/index";
import {
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdate
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      // 图标
      icons: [
        "el-icon-s-fold",
        "el-icon-menu",
        "el-icon-more",
        "el-icon-user",
        "el-icon-s-tools"
      ],
      // 路由
      routerChildren: routerChildren,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "menu/reqListAction"

    }),
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 取消

    cancel() {
      this.info.isShow = false;
    },
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 数据重置
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    // 点击了添加按钮
    add() {
      // console.log(this.form); 测试
      reqMenuAdd(this.form).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          //成功弹框
          successAlert(res.data.msg);
          // 清空数据
          this.empty();
          //弹框消失
          this.cancel();

          // list数据刷新
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    look(id) {
      // 发请求
      reqMenuDetail(id).then(res => {
        // 这个时候form没有id
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      reqMenuUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
