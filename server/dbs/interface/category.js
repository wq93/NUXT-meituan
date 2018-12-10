import Router from 'koa-router';
import Categroy from '../models/categroy';

let categoryRouter = new Router({ prefix: '/category' });

categoryRouter.get('/crumbs', async (ctx) => {

  let result = await Categroy.findOne({ city: ctx.query.city.replace('市', '') || '北京' });
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    };
  } else {
    ctx.body = {
      areas: [],
      types: []
    };
  }
});


export default categoryRouter;
