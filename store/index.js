import Vue from 'vue';
import Vuex from 'vuex';
import geo from './modules/geo';
import home from './modules/home';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    async nuxtServerInit({ commit }, { req, app }) {
      let { status, data: { province, city } } = await app.$axios.get('/geo/getPosition');
      commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' });

      let menuResult = await app.$axios.get('/geo/menu');
      status = menuResult.status;
      let menu = menuResult.data.menu || [];
      commit('home/setMenu', status === 200 ? menu : []);

      let hotPlaceResult = await app.$axios.get('/search/hotPlace',
        {
          params: {
            city: app.store.state.geo.position.city.replace('市', ''),
            type: '丽人'
          }
        });
      status = hotPlaceResult.status;
      commit('home/setHotPlace', status === 200 ? hotPlaceResult.data : []);
    }
  }
});

export default store;
