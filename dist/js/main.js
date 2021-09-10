(()=>{"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var n=function(){function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.from,o=e.to,a=e.steps,i=e.stagger,s=e.charset;t(this,n),Object.assign(this,{from:r,to:o,steps:a,stagger:i,charset:s}),this.length=r.length>o.length?r.length:o.length,this.build(),this.reset()}var r,o;return r=n,(o=[{key:"build",value:function(){this.changes=[],console.warn("Abstract class")}},{key:"getRandomChar",value:function(){var t=this.charset,e=Math.floor(Math.random()*t.length);return t.charAt(e)}},{key:"getCharAtFrame",value:function(t,e){var n=this.changes[t],r=n.filter((function(t){return t.frame===e}))[0];if(!r){var o=n[0].frame,a=n[n.length-1].frame,i=e>a?a:o;r=n.filter((function(t){return t.frame===i}))[0]}return r.char}},{key:"reset",value:function(){this.progress=0}},{key:"update",value:function(){for(var t=this.frame,e=[],n=0,r=this.length;n<r;n++)e.push(this.getCharAtFrame(n,t));this.text=e.join("")}},{key:"frame",get:function(){return this._frame},set:function(t){t!==this._frame&&(this._frame=t,this.update())}},{key:"progress",get:function(){return this._progress},set:function(t){this._progress=t,this.frame=Math.round(this.totalFrames*t)}}])&&e(r.prototype,o),n}();function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}n.charsets={UPPERCASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",DIGITS:"0123456789",SYMBOLS:"!@#$%&?"},n.charsets.LOWERCASE=n.charsets.UPPERCASE.toLowerCase(),n.charsets.ALL=Object.values(n.charsets).join("");var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(h,t);var e,n,r,c,f=(r=h,c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=u(r);if(c){var n=u(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return s(this,t)});function h(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o(this,h),f.call(this,t)}return e=h,(n=[{key:"build",value:function(){for(var t=[],e=this.length,n=this.from,r=this.to,o=this.steps,a=this.stagger,i=0;i<e;i++){var s=[],u=i*a,c=u+o,f=n.charAt(i),h=r.charAt(i);s.push({frame:u,char:f});for(var l=u+1;l<c;l++){var p=this.getRandomChar();s.push({frame:l,char:p})}s.push({frame:c,char:h}),t[i]=s}this.changes=t,this.totalFrames=(e-1)*a+o}}])&&a(e.prototype,n),h}(n);function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var l=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.textform,r=e.duration,o=e.onBegin,a=e.onChange,i=e.onComplete;f(this,t),Object.assign(this,{textform:n,duration:r,onBegin:o,onChange:a,onComplete:i})}var e,n;return e=t,(n=[{key:"animate",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.textform,n=this.onChange,r=this.onComplete,o=this.duration;this.time||(this.time=t);var a=t-this.time;if(a>o)return e.progress=1,r&&r.call(),cancelAnimationFrame(this.animationFrame);var i=e.frame;e.progress=a/o,e.frame!==i&&n&&n.call(),this.requestAnimationFrame()}},{key:"requestAnimationFrame",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(){this.animationFrame=requestAnimationFrame(this.animate.bind(this))}))},{key:"play",value:function(){var t=this.onBegin;t&&t.call(),this.time=0,this.requestAnimationFrame()}},{key:"stop",value:function(){cancelAnimationFrame(this.animationFrame)}}])&&h(e.prototype,n),t}();function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var y=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.mode,o=void 0===r?t.modes.rightward:r,a=e.autoPlay,i=void 0===a||a,s=e.from,u=void 0===s?"":s,c=e.to,f=void 0===c?"Textformer":c,h=e.steps,l=void 0===h?5:h,m=e.stagger,y=void 0===m?3:m,g=e.charset,d=void 0===g?n.charsets.ALL:g,v=e.duration,b=void 0===v?3e3:v,C=e.onBegin,w=e.onChange,O=e.onComplete;p(this,t),Object.assign(this,{mode:o,autoPlay:i,options:{from:u,to:f,steps:l,stagger:y,charset:d},playerOptions:{duration:b,onBegin:C,onChange:w,onComplete:O}}),this.build()}var e,r;return e=t,(r=[{key:"build",value:function(){if(this.mode.prototype instanceof n==0)throw new Error("Please select a mode from Texformer.modes");var t=new this.mode(this.options);this.textform=t,this.autoPlay&&(this.playerOptions.textform=t,this.player=new l(this.playerOptions),this.play())}},{key:"play",value:function(){this.player.play()}},{key:"replay",value:function(){this.player.stop(),this.textform.reset(),this.player.play()}},{key:"progress",get:function(){return this.textform.progress},set:function(t){this.textform.progress=t}},{key:"text",get:function(){return this.textform.text}}])&&m(e.prototype,r),t}();y.modes={rightward:c};const g=dat.gui;var d=document.querySelector("#demo-text"),v=new y({onChange:C});function b(){v.build()}function C(){d.textContent=v.text}var w=new g.GUI,O=w.addFolder("Textform");O.add(v.options,"charset",n.charsets).onChange(b),O.add(v.options,"from").onChange(b),O.add(v.options,"to").onChange(b),O.add(v.options,"steps",1,60).step(1).onChange(b),O.add(v.options,"stagger",0,30).step(1).onChange(b),O.open();var k=w.addFolder("Animation");k.add(v.playerOptions,"duration",100,5e3).step(50).onChange(b),k.add(v,"progress",0,1).step(.001).onChange(C).listen(),k.add(v,"replay"),k.open()})();