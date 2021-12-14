
import cloudbase from "@cloudbase/js-sdk";
// 自定义插件对象 
var auths = {};
auths.install = function (vue) {
  const app = cloudbase.init({
    env: "mycloud-1g1jv3t870135c18",
  });
  const myauth = app.auth({
    persistence: "local" //用户显式退出或更改密码之前的30天一直有效
  })
  vue.prototype.$auths = myauth;
}
// 导出插件 
export default auths