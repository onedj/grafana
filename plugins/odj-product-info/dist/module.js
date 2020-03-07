define(["react","@grafana/data"],(function(t,e){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=2)}([function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e,n){"use strict";n.r(e);var r=function(){function t(t,e){this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this)),this.appModel||(this.appModel={});var n=this.appModel;n.jsonData||(n.jsonData={}),console.log("ProductInfoConfigCtrl",this)}return t.$inject=["$scope","$injector"],t.prototype.postUpdate=function(){var t;(null===(t=this.appModel)||void 0===t?void 0:t.enabled)?console.log("Post Update:",this):console.log("Not enabled...")},t.templateUrl="pages/config.html",t}(),o=function(){function t(t,e){console.log("ProductInfoPageCtrl:",this),this.pageInfo="ODJ Product"}return t.$inject=["$scope","$rootScope"],t.templateUrl="pages/product_info.html",t}(),a=n(1),i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function u(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}}var l=n(0),c=n.n(l),f=function(t){function e(e){return t.call(this,e)||this}return function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype.componentDidMount=function(){this.updateNav()},e.prototype.componentDidUpdate=function(t){this.props.query!==t.query&&this.props.query.tab!==t.query.tab&&this.updateNav()},e.prototype.updateNav=function(){var t,e,n=this.props,r=n.path,o=n.onNavChanged,a=n.query,i=n.meta,l=[];l.push({text:"Tab A",icon:"fa fa-fw fa-file-text-o",url:r+"?tab=A",id:"A"}),l.push({text:"Tab B",icon:"fa fa-fw fa-file-text-o",url:r+"?tab=B",id:"B"}),l.push({text:"Tab C",icon:"fa fa-fw fa-file-text-o",url:r+"?tab=C",id:"C"});var c=!1,f=a.tab||"B";try{for(var p=u(l),s=p.next();!s.done;s=p.next()){var d=s.value;d.active=!c&&f===d.id,d.active&&(c=!0)}}catch(e){t={error:e}}finally{try{s&&!s.done&&(e=p.return)&&e.call(p)}finally{if(t)throw t.error}}c||(l[0].active=!0);var h={text:"This is the Page title",img:i.info.logos.large,subTitle:"subtitle here",url:r,children:l};o({node:h,main:h})},e.prototype.render=function(){var t=this.props,e=t.path,n=t.query,r=t.meta;return c.a.createElement("div",null,"QUERY: ",c.a.createElement("pre",null,JSON.stringify(n)),c.a.createElement("br",null),c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement("a",{href:e+"?x=1"},"111")),c.a.createElement("li",null,c.a.createElement("a",{href:e+"?x=AAA"},"AAA")),c.a.createElement("li",null,c.a.createElement("a",{href:e+"?x=1&y=2&y=3"},"ZZZ"))),c.a.createElement("pre",null,JSON.stringify(r.jsonData)))},e}(l.PureComponent);n.d(e,"plugin",(function(){return p})),n.d(e,"ConfigCtrl",(function(){return r})),n.d(e,"ProductInfoPageCtrl",(function(){return o}));var p=(new a.AppPlugin).setRootPage(f)}])}));