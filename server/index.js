import Koa from "koa";
import consola from "consola";
import { Nuxt, Builder } from "nuxt";
import mongoose from "mongoose";
import bodyParser from "koa-bodyparser";
import session from "koa-generic-session";
import Redis from "koa-redis";
import json from "koa-json";
// Import and Set Nuxt.js options
import config from "../nuxt.config.js";
import dbConfig from "./dbs/config";
import passport from "./dbs/interface/utils/passport";
// 挂载路由
import usersRouter from "./dbs/interface/users";
import geoRouter from "./dbs/interface/geo";
import searchRouter from "./dbs/interface/search";

const app = new Koa();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

config.dev = !(app.env === "production");
// **************缓存Redis和数据库链接**************
app.keys = ["meituan", "meituansite"];
app.proxy = true;
app.use(session({
  key: "meituan",
  prefix: "mt:uid",
  store: new Redis()
}));
app.use(bodyParser({ extendTypes: ["json", "form", "text"] }));
app.use(json());
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
});
app.use(passport.initialize());
app.use(passport.session());

// **************缓存Redis和数据库链接**************


async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  // *********挂载接口路由(注意位置)**************
  app.use(usersRouter.routes()).use(usersRouter.allowedMethods());
  app.use(geoRouter.routes()).use(geoRouter.allowedMethods());
  app.use(searchRouter.routes()).use(searchRouter.allowedMethods());
  // *********挂载接口路由(注意位置)**************


  app.use(ctx => {
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on("close", resolve);
      ctx.res.on("finish", resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject);
      });
    });
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
