require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([9],[,,,,,,,,,,,,,function(t,e,n){"use strict";var i=s(n(1)),o=s(n(14));function s(t){return t&&t.__esModule?t:{default:t}}new i.default(o.default).$mount()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(16),o=n.n(i),s=n(17);var u=function(t){n(15)},a=n(0)(o.a,s.a,u,"data-v-18e1fafc",null);e.default=a.exports},function(t,e){},function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{time:3,height:0,mySet:""}},mounted:function(){this.go_index(),this.getbodyHeight()},methods:{getbodyHeight:function(){var e=this;t.getSystemInfo({success:function(t){e.height=t.screenHeight}})},go_index_new:function(){t.reLaunch({url:"../component/component"}),clearTimeout(this.mySet)},go_index:function(){var e=this;setInterval(function(){e.time-=1},1e3),e.mySet=setTimeout(function(){t.reLaunch({url:"../component/component"})},3e3)}}}}).call(e,n(2).default)},function(t,e,n){"use strict";var i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("view",[e("view",{staticClass:"animate_img"},[e("image",{style:{height:this.height+"px"},attrs:{src:"../../static/qidong.png",mode:""}}),e("text",{staticClass:"tiaoz",attrs:{eventid:"WYP-0"},on:{tap:this.go_index_new}},[this._v(this._s(this.time)+"跳过")])])])},staticRenderFns:[]};e.a=i}],[13]);