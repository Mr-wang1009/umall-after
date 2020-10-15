import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
Vue.prototype.$imgPre = "http://localhost:3000"
let baseUrl = "/api";

// 打包
// Vue.prototype.$imgPre=""
// let baseUrl ='';


// 响应拦截
axios.interceptors.response.use(res => {
  console.group("=======本次请求地址是：" + res.config.url)
  console.log(res)
  console.groupEnd()
  return res
})
// =========菜单管理============
// 添加
export const reqMenuAdd = (params) => {
  return axios({
    url: baseUrl + '/api/menuadd',
    method: 'POST',
    data: qs.stringify(params)
  })
}
// 列表
export const reqMenuList = (id) => {
  return axios({
    url: baseUrl + '/api/menulist',
    method: 'GET',
    params: {
      istree: true
    }
  })
}
// 详情
export const reqMenuDel = (id) => {
  return axios({
    url: baseUrl + '/api/menudelete',
    method: 'POST',
    data: qs.stringify({
      id: id
    })
  })
}
// 删除数据
export const reqMenuDetail = (id) => {
  return axios({
    url: baseUrl + '/api/menuinfo',
    method: 'GET',
    params: {
      id: id
    }
  })
}
// 修改
export const reqMenuUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/menuedit',
    method: 'post',
    data: qs.stringify(params)
  })
}
// =========角色管理============
// 添加
export const reqRoleAdd = (params) => {
  return axios({
    url: baseUrl + '/api/roleadd',
    method: 'POST',
    data: qs.stringify(params)
  })
}
// 列表
export const reqRoleList = () => {
  return axios({
    url: baseUrl + '/api/rolelist',
    method: 'GET',

  })
}
// 删除数据
export const reqRoleDel = (id) => {
  return axios({
    url: baseUrl + '/api/roledelete',
    method: 'POST',
    data: qs.stringify({
      id: id
    })
  })
}
// 详情
export const reqRoleDetail = (id) => {
  return axios({
    url: baseUrl + '/api/roleinfo',
    method: 'GET',
    params: {
      id: id
    }
  })
}
// 修改
export const reqRoleUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/roleedit',
    method: 'post',
    data: qs.stringify(params)
  })
}


// =========管理员管理============
// 添加
export const reqManageAdd = (params) => {
  return axios({
    url: baseUrl + '/api/useradd',
    method: 'POST',
    data: qs.stringify(params)

  })
}


export const reqManageAll = () => {
  return axios({
    url: baseUrl + '/api/usercount',
    method: 'get',

  })
}
// 分页 {page:''.size:''}
export const reqManageList = (params) => {
  return axios({
    url: baseUrl + '/api/userlist',
    method: 'get',
    params: params
  })
}


// 删除数据
export const reqManageDel = (uid) => {
  return axios({
    url: baseUrl + '/api/userdelete',
    method: 'POST',
    data: qs.stringify({
      uid: uid
    })
  })
}
// 详情
export const reqManageDetail = (uid) => {
  return axios({
    url: baseUrl + '/api/userinfo',
    method: 'GET',
    params: {
      uid: uid
    }
  })
}
// 修改
export const reqManageUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/useradd',
    method: 'post',
    data: qs.stringify(params)
  })
}

// =========商品分类管理============
// 添加
export const reqCateAdd = (params) => {
  let data = new FormData()
  /*
  data.append("pid",1)
  data.append("catename","123")
  data.append("img",File)
  data.append("status",1)
  */
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/cateadd',
    method: 'POST',
    data: data

  })
}


// 分页 {page:''.size:''}
export const reqCateList = (params) => {
  return axios({
    url: baseUrl + '/api/catelist',
    method: 'get',
    params: params
  })
}


// 删除数据
export const reqCateDel = (id) => {
  return axios({
    url: baseUrl + '/api/catedelete',
    method: 'POST',
    data: qs.stringify({
      id: id
    })
  })
}
// 详情
export const reqCateDetail = (id) => {
  return axios({
    url: baseUrl + '/api/cateinfo',
    method: 'GET',
    params: {
      id: id
    }
  })
}
// 修改
export const reqCateUpdate = (params) => {

  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: params
  })
}

// =========规格管理============
// 添加
export const reqSpecsAdd = (params) => {
  return axios({
    url: baseUrl + '/api/Specsadd',
    method: 'POST',
    data: qs.stringify(params)
  })
}
// 列表
export const reqSpecsList = (params) => {
  return axios({
    url: baseUrl + '/api/Specslist',
    method: 'GET',
    params: params
  })
}
// 总页数
export const reqSpecsListCou = () => {
  return axios({
    url: baseUrl + '/api/specscount',
    method: 'GET',

  })
}
// 删除数据
export const reqSpecsDel = (id) => {
  return axios({
    url: baseUrl + '/api/specsdelete',
    method: 'POST',
    data: qs.stringify({
      id: id
    })
  })
}
// 详情
export const reqSpecsDetail = (id) => {
  return axios({
    url: baseUrl + '/api/specsinfo',
    method: 'GET',
    params: {
      id: id
    }
  })
}
// 修改
export const reqSpecsUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/specsedit',
    method: 'post',
    data: qs.stringify(params)
  })
}
// =========商品管理==========


//1商品添加
export const reqGoodsAdd = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/goodsadd',
    method: 'POST',
    data: data
  })
}
// **2.商品总数（用于计算分页）**
export const reqGoodsConnect = () => {
  return axios({
    url: baseUrl + '/api/goodscount'
  })
}
// **3.商品列表（分页）**
export const reqGoodsList = (params) => {
  return axios({
    url: baseUrl + '/api/goodslist',
    params: params
  })
}
// 4.商品获取（一条）
export const reqGoodsDetail = (id) => {
  return axios({
    url: baseUrl + '/api/goodsinfo',
    params: {
      id: id
    }
  })
}
// 5.商品修改
export const reqGoodsUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({

    url: baseUrl + '/api/goodsedit',
    method: 'POST',
    data: data
  })
}
// 6.商品删除
export const reqGoodsDelete = (id) => {
  return axios({
    url: baseUrl + '/api/goodsdelete',
    method: 'POST',
    data: {
      id
    }
  })
}

// ======登录管理======
export const reqLogin = (params) => {
  return axios({
    url: baseUrl + '/api/userlogin',
    method: 'POST',
    data: qs.stringify(params)
  })
}
