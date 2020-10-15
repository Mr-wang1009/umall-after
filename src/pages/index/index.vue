<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          unique-opened
          router
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 目录 -->
              <el-submenu :index="item.id+''" v-if='item.children'>
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="i in item.children"  :key='i.id' :index="i.url">{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>



  <!-- 菜单 -->
              <el-menu-item :index="item.url" v-else>
                {{ item.title }}
              </el-menu-item>
          </div>



        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="right">
            <span>{{userInfo.username}}</span>
            <el-button @click="outLogin">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }" v-if="$route.name"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item
              ><a href="/">{{ $route.name }}</a></el-breadcrumb-item
            >
          </el-breadcrumb>
          <router-view></router-view
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo"
    })
  },
  methods: {
    ...mapActions({
changeUserInfoAction:'changeUserInfoAction'
    }),
    outLogin(){
      this.changeUserInfoAction({})
      // sessionStorage.removeItem('userInfo');
      this.$router.push('/login');

    }
  },
  mounted() {}
};
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-breadcrumb {
  padding: 10px;
}
.el-aside {
  background-color: #20222a;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.right{
  float: right;
}
</style>
