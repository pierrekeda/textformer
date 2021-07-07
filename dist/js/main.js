(()=>{"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}var r=function(){function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["","textformer"],a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=a.charset,n=void 0===s?r.charsets.ALL:s,i=a.transition,o=void 0===i?r.transitions.linear:i,h=a.steps,c=void 0===h?5:h,u=a.stagger,l=void 0===u?1:u,f=a.loop,g=void 0!==f&&f;if(t(this,r),!e||!Array.isArray(e)||"string"!=typeof e[0])throw new TypeError('Parameter "texts" must be an array of strings');this.texts=e,Object.assign(this,{charset:n,transition:o,steps:c,stagger:l,loop:g}),this.build()}var a,s;return a=r,(s=[{key:"build",value:function(){this.maxLength=this.texts.reduce((function(t,e){return t.length>e.length?t.length:e.length})),this.frames=this.transition(this),this.finalFrame=this.frames.length-1,this.currentFrame=0,this.chars=this.texts[0].split(""),console.log(this.text)}},{key:"step",value:function(){this.currentFrame<this.finalFrame?(this.currentFrame++,this.update(),console.log(this.text)):0!=this.loop&&(this.loop--,this.currentFrame=0,this.update())}},{key:"update",value:function(){var t=this.frames[this.currentFrame];for(var e in t){var r=t[e];this.chars[r.i]=r.char}}},{key:"getRandomChar",value:function(){var t=this.charset,e=Math.floor(Math.random()*t.length);return t.charAt(e)}},{key:"text",get:function(){return this.chars.join("")}}])&&e(a.prototype,s),r}();r.charsets={UPPERCASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",DIGITS:"0123456789",SPECIAL:"!@#$%&?"},r.charsets.ALL=Object.values(r.charsets).join(""),r.transitions={linear:function(t){for(var e=[],r=t.texts,a=t.stagger,s=t.steps,n=t.maxLength,i=r.length-1,o=0;o<i;o++)for(var h=r[o],c=r[o+1]||r[c],u=0;u<n;u++)for(var l=u*a,f=l+s,g=h.charAt(u),v=c.charAt(u),m=l;m<=f;m++){e[m]||(e[m]=[]);var p=m-l,d=p===s?v:0===p?g:t.getRandomChar();e[m].push({i:u,char:d})}return e}};var a=new r(["ABCDE","VWXYZ"],{steps:3,stagger:1}),s=0,n=0,i=0;!function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;(i=100-((s=e)-n))<=0&&(a.step(),n=s+i),requestAnimationFrame(t)}()})();