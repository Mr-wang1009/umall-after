<template>
  <el-dialog
    :title="info.isAdd ? '商品添加' : '商品修改'"
    :visible.sync="info.isShow"
    @closed="close"
    @opened="opened"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="一级分类">
        <el-select
          @change="changeFirst"
          v-model="form.first_cateid"
          placeholder="请选择上级菜单"
        >
          <el-option label="请选择" disabled value=""></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="form.second_cateid" placeholder="请选择上级菜单">
          <el-option label="请选择" disabled value=""></el-option>
          <el-option
            v-for="item in secondCateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称">
        <el-input v-model="form.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <div class="box">
          <h3>+</h3>
          <img class="img" v-if="imgUrl" :src="imgUrl" alt="" />
          <input @change="getFile" class="input" type="file" />
        </div>
      </el-form-item>
      <el-form-item label="商品规格">
        <el-select v-model="form.specsid" @change="changeSpecs">
          <el-option label="请选择" disabled value=""> </el-option>
          <el-option
            v-for="item in specsList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性">
        <el-select
          v-model="form.specsattr"
          placeholder="请选择上级菜单"
          multiple
        >
          <el-option label="请选择" disabled value=""></el-option>
          <el-option
            v-for="item in goodsAttrList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品">
        <template>
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="是否热卖">
        <template>
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item label="商品描述">
        <!-- <textarea v-model="form.description" cols="30" rows="10"></textarea> -->
        <!-- 富文本 -->
        <div v-if="info.isShow" id="editor"></div>
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
import E from "wangeditor";

import {
  reqCateAdd,
  reqCateList,
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前 转换格式
        isnew: 1,
        ishot: 1,
        status: 1
      },
      // 添加二分类
      secondCateList: [],
      // 图片地址
      imgUrl: "",
      // 商品属性

      goodsAttrList: []
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list"
    })
  },
  methods: {
    opened() {
      //富文本

      // const E = window.wangEditor;
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    ...mapActions({
      reqCateList: "cate/reqListAction",
      reqSpecsList: "specs/reqListAction",
      reqGoodsList: "goods/reqListAction",
      reqTotalList: "goods/reqTotalAction"
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
      this.imgUrl = "";
      this.secondCateList = [];
      this.goodsAttrList = [];
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前 转换格式
        isnew: 1,
        ishot: 1,
        status: 1
      };
      // 树形控件设置【】
    },

    // 点击了添加按钮
    add() {
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr)
      };
      reqGoodsAdd(data).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          //成功弹框
          successAlert(res.data.msg);
          // 清空数据
          this.empty();
          //弹框消失
          this.cancel();

          // list数据刷新
          this.reqGoodsList();
          // 刷新总数
          this.reqTotalList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //一级分类修改了，获取二级分类的list
    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },
    //获得二级分类list
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then(res => {
        this.secondCateList = res.data.list;
      });
    },
    //商品规格发生了改变，计算商品属性的数组
    changeSpecs() {
      //商品规格变了，商品属性先置空
      this.form.specsattr = [];

      this.getAttrsArr();
    },
    //获得商品属性数组
    getAttrsArr() {
      // console.log(this.specsList);
      // this.form.specsid 颜色 1
      // 在specsList中找到 找到哪一条数据的id和当前this.form.specsid是一样的。
      let obj = this.specsList.find(item => item.id == this.form.specsid);
      // // 把这条数据的attrs赋值给goodsAttrList;
      this.goodsAttrList = obj.attrs;
      console.log(obj.attrs);
    },
    getFile(e) {
      let file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件不能超过2M");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    look(id) {
      // 发请求
      reqGoodsDetail(id).then(res => {
        // 这个时候form没有id
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.form = res.data.list;
           this.form.id = id;
          this.getSecondList();
          this.imgUrl = this.$imgPre + this.form.img;
           this.form.specsattr = JSON.parse(this.form.specsattr);
          this.getAttrsArr();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr)
      };

      reqGoodsUpdate(data).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
             // list数据刷新
          this.reqGoodsList();
          // 刷新总数
          this.reqTotalList();
          // this.reqManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.reqGoodsList();
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
    this.reqSpecsList("ture");
  }
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
