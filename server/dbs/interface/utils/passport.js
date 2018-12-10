import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import UserModel from '../../models/users';

passport.use(new LocalStrategy(async (username, password, done) => {
  let where = {   // 查询条件
    username
  };

  let result = await UserModel.findOne(where);
  if (result) {
    if (result.password === password) {
      return done(null, result);
    } else {
      return done(null, false, '密码错误');
    }
  } else {
    return done(null, false, '用户不存在');
  }

}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

export default passport;
