<template>
  <el-dialog
    :title="info.isAdd ? '商品分类添加' : '商品分类修改'"
    :visible.sync="info.isShow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="上级菜单">
        <el-select v-model="form.pid" placeholder="请选择上级菜单">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input v-model="form.catename"></el-input>
      </el-form-item>
      <el-form-item label="图片" v-if="form.pid != 0">
        <div class="box">
          <h3>+</h3>
          <img class="img" v-if="imgUrl" :src="imgUrl" alt="" />
          <input @change="getFile" class="input" type="file" />
        </div>
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

import {
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1
      }
    };
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
    getFile(e) {
      // event 存在信、息
      let file = e.target.files[0];
      // 规定图片大小
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("图片大于2M！！请重新选择。");
        return;
      }

      let imgExtArr = [".jpg", ".png", ".jpeg", ".gif"];
      let extname = file.name.slice(file.name.lastIndexOf(".")); //'.jpg'
      if (!imgExtArr.some(item => item == extname)) {
        warningAlert("文件格式不正确");
        return;
      }

      // URL.createObjectURL() 可以通过文件生成一个地址
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
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
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 数据重置
    empty() {
      (this.imgUrl = ""),
        (this.form = {
          pid: 0,
          catename: "",
          img: null,
          status: 1
        });
    },
    // 点击了添加按钮
    add() {
      console.log(this.form);
      // console.log(this.form); 测试
      reqCateAdd(this.form).then(res => {
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
      reqCateDetail(id).then(res => {
        // 这个时候form没有id
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl=this.$imgPre+this.form.img
        } else {
          warningAlert(res.data.msg);``
        }
      });
    },
    update() {
      reqCateUpdate(this.form).then(res => {
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
</style>
