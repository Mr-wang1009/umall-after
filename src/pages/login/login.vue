<template>
  <div class="login">
    <div class="box line">
      <h2 class="center line h3">登录</h2>
      <div>
        <el-input placeholder="请输入账号" v-model="form.username"></el-input>
        <div class="line">
          <el-input placeholder="请输入密码" v-model="form.password"></el-input>
        </div>
        <div class="center line">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../utils/alert";
import { reqLogin } from "../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:'changeUserInfoAction'
    }),
    login() {
      console.log(this.form);
      reqLogin(this.form).then(res => {

        if (res.data.code == 200) {

          successAlert("登陆成功");
          this.changeUserInfoAction(res.data.list)
          this.$router.push("/")
        }
        warningAlert(res.data.msg);
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
.center {
  text-align: center;
}

.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(to right, #553443, #303d60);
  overflow: hidden;
}
.box {
  width: 500px;
  height: 300px;
  position: relative;
  border-radius: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 0 40px;
  /* display: flex; */
  box-sizing: border-box;
}
.line {
  margin-top: 30px;
}
.h3 {
  line-height: 50px;
  font-size: 30px;
  font-weight: bold;
}
.el-button {
  width: 200px;
}
</style>
