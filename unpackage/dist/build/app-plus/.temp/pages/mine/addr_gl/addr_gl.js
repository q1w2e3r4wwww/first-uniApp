require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([19],{78:function(t,e,a){"use strict";var s=n(a(1)),i=n(a(79));function n(t){return t&&t.__esModule?t:{default:t}}new s.default(i.default).$mount()},79:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(81),i=a.n(s),n=a(82);var d=function(t){a(80)},c=a(0)(i.a,n.a,d,"data-v-71a97b90",null);e.default=c.exports},80:function(t,e){},81:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{addList:[{name:"王涛",phone:18786026794,addr:"广东省深圳市龙岗区横岗街道7栋1楼"}],active_img:"../../../static/rideo_active.png"}},mounted:function(){},onLoad:function(e){if(t.showLoading({title:"加载中..."}),setTimeout(function(){t.hideLoading()},1e3),void 0==e.newAddr)this.addList=t.getStorageSync("newAdd");else if(void 0!=e.newAddr){var a=JSON.parse(e.newAddr);this.addList.push(a),t.setStorageSync("newAdd",this.addList),t.showToast({title:"数据保存成功"})}},onBackPress:function(){return t.reLaunch({url:"../mine"}),!0},methods:{Delete:function(e){this.addList.splice(e,1),t.showToast({title:"删除成功"}),t.setStorageSync("newAdd",this.addList)},go_addr:function(){t.navigateTo({url:"../addr/addr"})}}}}).call(e,a(2).default)},82:function(t,e,a){"use strict";var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("view",{staticClass:"main-content"},t._l(t.addList,function(e,s){return a("view",{key:s,staticClass:"main"},[a("view",{staticClass:"myaddr"},[a("view",{staticClass:"text-name"},[a("image",{attrs:{src:"../../../static/user.png",mode:""}}),a("text",{staticClass:"name"},[t._v(t._s(e.name))])]),a("view",{staticClass:"text-phone"},[a("image",{attrs:{src:"../../../static/phone.png",mode:""}}),a("text",{staticClass:"phone"},[t._v(t._s(e.phone))])])]),a("view",{staticClass:"addr"},[a("text",{staticClass:"data"},[t._v(t._s(e.addr))])]),a("view",{staticClass:"sette"},[a("view",{staticClass:"title"},[a("image",{staticClass:"check",attrs:{src:t.active_img,mode:""}}),a("text",{staticClass:"text"},[t._v("设为默认地址")])]),a("view",{staticClass:"setting"},[a("image",{staticClass:"update",attrs:{src:"../../../static/update.png",mode:""}}),a("image",{staticClass:"delete",attrs:{src:"../../../static/delete.png",mode:"",eventid:"q0G-0-"+s},on:{tap:function(e){t.Delete(s)}}})])])])})),a("view",{staticClass:"footer"},[a("text",{staticClass:"button",attrs:{eventid:"fuo-1"},on:{tap:t.go_addr}},[t._v("新增收货地址")])])])},staticRenderFns:[]};e.a=s}},[78]);