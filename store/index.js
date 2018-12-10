import Vue from "vue";
import Vuex from "vuex";
import geo from "./modules/geo";
import home from "./modules/home";

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    geo, home
  },
  actions: {
    async nuxtServerInit({ commit }, { req, app }) { // 获取不到全局的this,所以使用app
      let { status, data: { province, city } } = await app.$axios.get("/geo/getPosition");
      commit("geo/setPosition", status === 200 ? { city, province } : { city: "", province: "" }); //提交commit

    }
  }
});

export default store;
