<template>
  <el-dialog
    :title="info.isAdd ? '添加管理员' : '修改管理员'"
    :visible.sync="info.isShow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属角色">
        <el-select v-model="form.roleid" placeholder="请选择上级菜单">
          <el-option label="请选择" disabled value=""></el-option>
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
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
  reqManageAdd,
  reqManageDetail,
  reqManageUpdate
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list"
    })
  },
  methods: {
    ...mapActions({
      reqRoleListAction: "role/reqListAction",
      reqManageList: "manage/reqListAction",
      reqTotalList: "manage/reqTotalAction"
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

    // 数据重置
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
      // 树形控件设置【】
    },
    // 点击了添加按钮
    add() {
      // console.log(this.form); 测 试
      reqManageAdd(this.form).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          //成功弹框
          successAlert(res.data.msg);
          // 清空数据
          this.empty();
          //弹框消失
          this.cancel();

          // list数据刷新
          this.reqManageList();
          // 刷新总数
          this.reqTotalList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    look(id) {
      // 发请求
      reqManageDetail(id).then(res => {
        // 这个时候form没有id
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.form = res.data.list;
          this.form.password = "";
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      reqManageUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.reqRoleListAction();
    }
  }
};
</script>
<style scoped></style>
