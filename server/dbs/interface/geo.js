import Router from "koa-router";
import Province from "../models/province";
import Menu from "../models/menu";
import City from "../models/city";


let geoRouter = new Router({
  prefix: "/geo"
});

const sign = "getGeoSign";

geoRouter.get("/getPosition", async ctx => {
  // let {status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`);
  let status = 200;
  let province = "北京";
  let city = "北京市";
  if (status === 200) {
    ctx.body = {
      province,
      city
    };
  } else {
    ctx.body = {
      province: "",
      city: ""
    };
  }
});

geoRouter.get("/province", async ctx => {
  let province = await Province.find();
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      };
    })
  };
});

geoRouter.get("/province/:id", async (ctx) => {
  let city = await City.findOne({ id: ctx.params.id });

  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name
      };
    })
  };
});

geoRouter.get("/city", async (ctx) => {
  let city = [];
  let result = await City.find();
  result.forEach(item => {
    city = city.concat(item.value);
  });
  ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === "市辖区" || item.name === "省直辖县级行政区划"
          ? item.province
          : item.name
      };
    })
  };
});

geoRouter.get("/menu", async ctx => {
  const result = await Menu.findOne();
  if (result) {
    ctx.body = {
      menu: result.menu
    };
  } else {
    ctx.body = {
      menu: {}
    };
  }

});

geoRouter.get("/hotCity", async (ctx) => {
  let list = [
    "北京市",
    "上海市",
    "广州市",
    "深圳市",
    "天津市",
    "西安市",
    "杭州市",
    "南京市",
    "武汉市",
    "成都市"
  ];
  let result = await City.find();
  let nList = [];
  result.forEach(item => {
    nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)));
  });
  ctx.body = {
    hots: nList
  };
  // let {status, data: {
  //   hots
  // }} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  // if (status === 200) {
  //   ctx.body = {
  //     hots
  //   }
  // } else {
  //   ctx.body = {
  //     hots: []
  //   }
  // }
});

export default geoRouter;
