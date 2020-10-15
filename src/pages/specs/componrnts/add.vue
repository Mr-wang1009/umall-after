<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '规格添加' : '规格修改'"
      :visible.sync="info.isShow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="con">
            <div class="input-wrap">
              <el-input v-model="item.value"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addInput"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="delInput(index)"
              >删除</el-button
            >
          </div></el-form-item
        >

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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import {
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsUpdate
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attrArr: [{ value: "" }, { value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction",
      reqTotalList: "specs/reqTotalAction"
    }),
    addInput() {
      this.attrArr.push({ value: "" });
    },
    delInput(i) {
      this.attrArr.splice(i, 1);
    },
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
        specsname: "",
        attrs: "",
        status: 1
      };
      this.attrArr = [{ value: "" }];
    },
    checkedData() {
      //验证规格名称
      if (this.form.specsname == "") {
        warningAlert("规格名称不能为空");
        return false;
      }

      //验证每一个属性值都不能为空
      if (this.attrArr.some(item => item.value == "")) {
        warningAlert("所有的属性值都必填");
        return false;
      }
      return true;
    },
    // 点击了添加按钮
    add() {
      // if (!this.form.specsname) {
      //   warningAlert('名称不可以为空')
      //   return
      // }
      if (!this.checkedData()) {
        return;
      }
      // 把数组attrArr每一个的value取出来 拼接搭配attrs上面
      this.form.attrs = JSON.stringify(this.attrArr.map(item => item.value));

      reqSpecsAdd(this.form).then(res => {
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
          this.reqTotalList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    look(id) {
      // 发请求
      reqSpecsDetail(id).then(res => {
        // 这个时候form没有id
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.form = res.data.list[0];
          this.form.id = id;
          this.attrArr = JSON.parse(this.form.attrs).map(item => ({
            value: item
          }));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
        if (!this.checkedData()) {
        return;
      }
      reqSpecsUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
          this.reqTotalList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
.box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}
.box h3 {
  font-size: 40px;
  line-height: 150px;
  font-weight: 400;
  text-align: center;
}
.box .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.box .input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}
.con {
  display: flex;
}
.input-wrap {
  flex: 1;
}
</style>
