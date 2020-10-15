import {
  reqSpecsList,
  reqSpecsListCou
} from '../../utils/request'

const state = {
  // 菜单的list
  list: [],
  size: 2, // 单页数
  total: 0 //总数
    ,
  page: 1 //页码
}
const mutations = {
  //修改list
  changeList(state, arr) {
    state.list = arr;
    console.log(state.list);
  },
  changeTotal(state, num) {
    state.total = num;
  },
  changePage(state, num) {
    state.page = num;
  }
}
const actions = {
  //页面请求

  reqListAction(context,bool) {
    // 发请求
    let params = bool ? {} : { page: context.state.page, size: context.state.size }
    reqSpecsList(params).then(res => {


      let list = res.data.list ? res.data.list : [];
      if (context.state.page > 1 && list.length == 0) {
        // 如果取list的时候 去到了null 那么可能最后一页没数据了 需要减1在请求list
        context.commit("changePage", context.state.page - 1)
        // 单项数据流 遵循 mutations修改数据
        context.dispatch("reqListAction")

        return
      }
      list.forEach(item => {
        item.attrs = JSON.parse(item.attrs)
      })
      context.commit("changeList", list)







    })



  },
  // 获取总数请求
  reqTotalAction(context) {
    reqSpecsListCou().then(res => {
      context.commit("changeTotal", res.data.list[0].total);
    })
  },
  changPageAction(context, page) {
    // 修改页码
    context.commit("changePage", page);
    // 发起list请求
    context.dispatch('reqListAction')

  }
}
const getters = {
  list(state) {
    return state.list
  },
  size(state) {
    return state.size
  },
  total(state) {
    return state.total
  },
  page(state) {
    return state.page
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
