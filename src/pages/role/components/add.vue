<template>
  <el-dialog
    :title="info.isAdd ? '角色添加' : '角色修改'"
    :visible.sync="info.isShow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          :data="menuList"
          show-checkbox
          ref="tree"
          node-key="id"
          :props="{ children: 'children', label: 'title' }"
        >
        </el-tree>
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
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list"
    })
  },
  methods: {
    ...mapActions({
      reqMenuListAction: "menu/reqListAction",
      reqRoleList: "role/reqListAction"
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
        rolename: "",
        menus: "[]",
        status: 1
      };
      // 树形控件设置【】
      this.$refs.tree.setCheckedKeys([]);
    },
    // 点击了添加按钮
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // console.log(this.form); 测 试
      reqRoleAdd(this.form).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          //成功弹框
          successAlert(res.data.msg);
          // 清空数据
          this.empty();
          //弹框消失
          this.cancel();

          // list数据刷新
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    look(id) {
      // 发请求
      reqRoleDetail(id).then(res => {
        // 这个时候form没有id
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.form = res.data.list;

          this.form.id = id;
          // 赋值树形控件
          this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys()); //后端要的是字符串
      reqRoleUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.reqMenuListAction();
    }
  }
};
</script>
<style scoped></style>
