require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([13],{163:function(e,t,i){"use strict";var n=c(i(1)),s=c(i(164));function c(e){return e&&e.__esModule?e:{default:e}}new n.default(s.default).$mount()},164:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(166),s=i.n(n),c=i(167);var l=function(e){i(165)},u=i(0)(s.a,c.a,l,null,null);t.default=u.exports},165:function(e,t){},166:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{list:[{value:"手势密码"},{value:"更新检测"}],flist:[{value:"分享推送"},{value:"关于我们"}],isChecked:!1}},methods:{mClick:function(t){switch(t){case 0:e.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://uniapp.dcloud.io/",title:"uni-app分享",summary:"我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",imageUrl:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",success:function(e){console.log("success:"+JSON.stringify(e))},fail:function(e){console.log("fail:"+JSON.stringify(e))}})}},change_gesture:function(){console.log("点击了手势密码")},checkChange:function(t){var i=this;t.target.value?i.isChecked=!0:(i.isChecked=!1,e.showModal({title:"APP提示：",content:"确认关闭手机密码吗？",success:function(t){t.confirm?(i.isChecked=!1,e.navigateTo({url:"../../gesture-lock/gesture-lock"})):i.isChecked=!0}}))}}}}).call(t,i(2).default)},167:function(e,t,i){"use strict";var n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("view",{staticClass:"main"},[e._l(e.list,function(t,n){return i("view",{key:n,staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell uni-list-cell-pd"},[i("view",{staticClass:"uni-list-cell-db",attrs:{eventid:"dgT-0-"+n},on:{tap:function(t){e.change_gesture()}}},[e._v(e._s(t.value))]),0==n?i("switch",{attrs:{checked:e.isChecked,eventid:"mzG-1-"+n},on:{change:e.checkChange}}):e._e()])])}),i("view",{staticClass:"uni-list"},e._l(e.flist,function(t,n){return i("view",{key:n,staticClass:"uni-list-cell",attrs:{eventid:"F7b-2-"+n},on:{tap:function(t){e.mClick(n)}}},[i("view",{staticClass:"uni-list-cell-navigate uni-navigate-right"},[e._v("\n\t\t\t\t"+e._s(t.value)+"\n\t\t\t")])])}))],2)},staticRenderFns:[]};t.a=n}},[163]);