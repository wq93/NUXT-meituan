/***
 * mongo
 * 接口签名， axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
 * /search/top
 * /search/resultByKeywords
 * /search/hotPlace
 * /search/products
 * /search/product/:id
 **/
import Router from 'koa-router';
import Poi from '../models/poi';

let searchRouter = new Router({
  prefix: '/search'
});

searchRouter.get('/top', async ctx => {
  try {
    let top = await Poi.find({
      name: new RegExp(ctx.query.input),
      city: ctx.query.city
    });
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        };
      }),
      type: top.length ? top[0].type : ''
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    };
  }
});

searchRouter.get('/hotPlace', async ctx => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
  try {
    let result = await Poi.find({
      city,
      type: ctx.query.type || '丽人'
    }).limit(10);

    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        };
      })
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    };
  }
});

searchRouter.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query;
  let { status, data } = await Poi.find({ city, keyword });
  ctx.body = {};
});

searchRouter.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword || '旅游';
  let city = ctx.query.city || '北京';
  let {
    status,
    data: {
      product,
      more
    }
  } = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city,
    }
  });
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    };
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    };
  }
});

export default searchRouter;
