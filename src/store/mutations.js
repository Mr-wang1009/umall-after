export const state = {
  userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
}
export const mutations = {
  changeUserInfo(state, info) {
    state.userInfo = info
    // 状态层刷新没有了 存到本地存贮
    if (info.id) {
      sessionStorage.setItem("userInfo", JSON.stringify(info))
    } else {
      sessionStorage.removeItem('userInfo');
    }
  }

}
export const getters = {
  userInfo(state) {
    return state.userInfo
  }
}
