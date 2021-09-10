(()=>{"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var n=function(){function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.from,o=e.to,i=e.steps,a=e.stagger,s=e.charset,u=e.align,l=e.fill;t(this,n),Object.assign(this,{from:r,to:o,steps:i,stagger:a,charset:s}),this.length=Math.max(r.length,o.length),this.align(u,l),this.build(),this.reset()}var r,o;return r=n,(o=[{key:"align",value:function(t,e){if(t){var n=this.to.length-this.from.length;if(0!==n){for(var r=n>0?"from":"to",o=this[r],i=[],a=Math.abs(n),s=0;s<a;s++)i.push(e||this.getRandomChar());this[r]=t(o,i.join(""))}}}},{key:"build",value:function(){this.changes=[],console.warn("Abstract class")}},{key:"getRandomChar",value:function(){var t=this.charset,e=Math.floor(Math.random()*t.length);return t.charAt(e)}},{key:"getCharAtFrame",value:function(t,e){var n=this.changes[t],r=n.filter((function(t){return t.frame===e}))[0];if(!r){var o=n[0].frame,i=n[n.length-1].frame,a=e>i?i:o;r=n.filter((function(t){return t.frame===a}))[0]}return r.char}},{key:"reset",value:function(){this.progress=0}},{key:"update",value:function(){for(var t=this.frame,e=[],n=0,r=this.length;n<r;n++)e.push(this.getCharAtFrame(n,t));this.text=e.join("")}},{key:"frame",get:function(){return this._frame},set:function(t){t!==this._frame&&(this._frame=t,this.update())}},{key:"progress",get:function(){return this._progress},set:function(t){this._progress=t,this.frame=Math.round(this.totalFrames*t)}}])&&e(r.prototype,o),n}();function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}n.charsets={UPPERCASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",DIGITS:"0123456789",SYMBOLS:"!@#$%&?"},n.charsets.LOWERCASE=n.charsets.UPPERCASE.toLowerCase(),n.charsets.ALL=Object.values(n.charsets).join(""),n.aligns={NONE:!1,LEFT:function(t,e){return t+e},CENTER:function(t,e){var n=e.length,r=Math.floor(n/2);return e.substring(0,r)+t+e.substring(r,n)},RIGHT:function(t,e){return e+t}};var l=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(c,t);var e,n,r,l,f=(r=c,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=u(r);if(l){var n=u(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return s(this,t)});function c(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o(this,c),f.call(this,t)}return e=c,(n=[{key:"build",value:function(){for(var t=[],e=this.length,n=this.from,r=this.to,o=this.steps,i=this.stagger,a=0;a<e;a++){var s=[],u=a*i,l=u+o,f=n.charAt(a),c=r.charAt(a);s.push({frame:u,char:f});for(var h=u+1;h<l;h++){var p=this.getRandomChar();s.push({frame:h,char:p})}s.push({frame:l,char:c}),t[a]=s}this.changes=t,this.totalFrames=(e-1)*i+o}}])&&i(e.prototype,n),c}(n);function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var h=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.textform,r=e.duration,o=e.onBegin,i=e.onChange,a=e.onComplete;f(this,t),Object.assign(this,{textform:n,duration:r,onBegin:o,onChange:i,onComplete:a})}var e,n;return e=t,(n=[{key:"animate",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.textform,n=this.onChange,r=this.onComplete,o=this.duration;this.time||(this.time=t);var i=t-this.time;if(i>o)return e.progress=1,r&&r.call(),cancelAnimationFrame(this.animationFrame);var a=e.frame;e.progress=i/o,e.frame!==a&&n&&n.call(),this.requestAnimationFrame()}},{key:"requestAnimationFrame",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(){this.animationFrame=requestAnimationFrame(this.animate.bind(this))}))},{key:"play",value:function(){var t=this.onBegin;t&&t.call(),this.time=0,this.requestAnimationFrame()}},{key:"stop",value:function(){cancelAnimationFrame(this.animationFrame)}}])&&c(e.prototype,n),t}();function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var m=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.mode,o=void 0===r?t.modes.rightward:r,i=e.autoPlay,a=void 0===i||i,s=e.from,u=void 0===s?"Hello":s,l=e.to,f=void 0===l?"Textformer":l,c=e.steps,h=void 0===c?5:c,g=e.stagger,m=void 0===g?3:g,d=e.charset,y=void 0===d?n.charsets.ALL:d,v=e.align,b=void 0===v?n.aligns.NONE:v,C=e.fill,w=void 0===C?" ":C,O=e.duration,k=void 0===O?3e3:O,x=e.onBegin,E=e.onChange,A=e.onComplete;p(this,t),Object.assign(this,{mode:o,autoPlay:a,options:{from:u,to:f,steps:h,stagger:m,charset:y,align:b,fill:w},playerOptions:{duration:k,onBegin:x,onChange:E,onComplete:A}}),this.build()}var e,r;return e=t,(r=[{key:"build",value:function(){if(this.mode.prototype instanceof n==0)throw new Error("Please select a mode from Texformer.modes");var t=new this.mode(this.options);this.textform=t,this.autoPlay&&(this.playerOptions.textform=t,this.player=new h(this.playerOptions),this.play())}},{key:"play",value:function(){this.player.play()}},{key:"replay",value:function(){this.player.stop(),this.textform.reset(),this.player.play()}},{key:"progress",get:function(){return this.textform.progress},set:function(t){this.textform.progress=t}},{key:"text",get:function(){return this.textform.text}}])&&g(e.prototype,r),t}();m.modes={rightward:l};const d=dat.gui;var y=document.querySelector("#demo-text"),v=new m({onChange:C});function b(){v.build()}function C(){y.textContent=v.text}function w(){"string"==typeof v.options.align&&(v.options.align=n.aligns[v.options.align]),v.options.fill.length>0&&(v.options.fill=v.options.fill.charAt(0)),b()}v.options.align="NONE";var O=new d.GUI,k=O.addFolder("Texts");k.add(v.options,"from").onChange(b),k.add(v.options,"to").onChange(b),k.add(v.options,"align",Object.keys(n.aligns)).onChange(w),k.add(v.options,"fill").onChange(w),k.open();var x=O.addFolder("Textform");x.add(v.options,"charset",n.charsets).onChange(b),x.add(v.options,"steps",1,60).step(1).onChange(b),x.add(v.options,"stagger",0,30).step(1).onChange(b),x.open();var E=O.addFolder("Animation");E.add(v.playerOptions,"duration",100,5e3).step(50).onChange(b),E.add(v,"progress",0,1).step(.001).onChange(C).listen(),E.add(v,"replay"),E.open()})();