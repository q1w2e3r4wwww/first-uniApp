require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([15],{63:function(t,e,s){"use strict";var a=i(s(1)),c=i(s(64));function i(t){return t&&t.__esModule?t:{default:t}}new a.default(c.default).$mount()},64:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(66),c=s.n(a),i=s(67);var n=function(t){s(65)},o=s(0)(c.a,i.a,n,"data-v-5ae69f22",null);e.default=o.exports},65:function(t,e){},66:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{checkShow:!0}},mounted:function(){},onLoad:function(){t.showLoading({title:"加载中..."}),setTimeout(function(){t.hideLoading()},1e3)},methods:{check:function(){this.checkShow=!this.checkShow},go_payEnd:function(){t.navigateTo({url:"../pay_end/pay_end"})}}}}).call(e,s(2).default)},67:function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",[s("view",{staticClass:"main-content"},[t._m(0),s("view",{staticClass:"pay-fs"},[s("text",{staticClass:"title"},[t._v("选择支付方式")]),s("view",{staticClass:"fs"},[s("image",{staticClass:"chat",attrs:{src:"../../../static/photo.png",mode:""}}),s("text",{staticClass:"text"},[t._v("微信支付")]),s("image",{directives:[{name:"show",rawName:"v-show",value:t.checkShow,expression:"checkShow"}],staticClass:"check",attrs:{src:"../../../static/check.png",mode:"",eventid:"lty-0"},on:{tap:t.check}}),s("image",{directives:[{name:"show",rawName:"v-show",value:!t.checkShow,expression:"!checkShow"}],staticClass:"check",attrs:{src:"../../../static/check_active.png",mode:"",eventid:"i6I-1"},on:{tap:t.check}})])])]),s("view",{staticClass:"footer"},[t._m(1),s("text",{staticClass:"button",attrs:{eventid:"lA1-2"},on:{tap:t.go_payEnd}},[t._v("去支付")])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"content"},[s("view",{staticClass:"top"},[s("text",{staticClass:"title"},[t._v("赚积分的车载盒子 驾驶智能器  包含激活码  一键定位")]),s("view",{staticClass:"sum"},[s("text",{staticClass:"money"},[t._v("1395元 x ")]),s("text",{staticClass:"count"},[t._v("1")])])]),s("view",{staticClass:"sum-count"},[s("view",{staticClass:"text"},[t._v("共"),s("text",{staticClass:"data"},[t._v("1 ")]),t._v("件")]),s("view",{staticClass:"heji"},[t._v("合计："),s("text",{staticClass:"mon"},[t._v("1395")]),t._v("元")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"title"},[this._v("支付："),e("text",{staticClass:"pay-money"},[this._v("￥1395.00")])])}]};e.a=a}},[63]);