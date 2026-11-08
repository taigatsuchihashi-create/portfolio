function t(t,e,i){return Math.max(t,Math.min(e,i))}var e=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let i=!1;if(this.duration&&this.easing){this.currentTime+=e;const s=t(0,this.currentTime/this.duration,1);i=s>=1;const o=i?1:this.easing(s);this.value=this.from+(this.to-this.from)*o}else this.lerp?(this.value=function(t,e,i,s){return function(t,e,i){return(1-i)*t+i*e}(t,e,1-Math.exp(-i*s))}(this.value,this.to,60*this.lerp,e),Math.round(this.value)===this.to&&(this.value=this.to,i=!0)):(this.value=this.to,i=!0);i&&this.stop(),this.onUpdate?.(this.value,i)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i,duration:s,easing:o,onStart:n,onUpdate:r}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,n?.(),this.onUpdate=r}};var i=class{constructor(t,e,{autoResize:i=!0,debounce:s=250}={}){this.wrapper=t,this.content=e,i&&(this.debouncedResize=function(t,e){let i;return function(...s){let o=this;clearTimeout(i),i=setTimeout((()=>{i=void 0,t.apply(o,s)}),e)}}(this.resize,s),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},s=class{events={};emit(t,...e){let i=this.events[t]||[];for(let t=0,s=i.length;t<s;t++)i[t]?.(...e)}on(t,e){return this.events[t]?.push(e)||(this.events[t]=[e]),()=>{this.events[t]=this.events[t]?.filter((t=>e!==t))}}off(t,e){this.events[t]=this.events[t]?.filter((t=>e!==t))}destroy(){this.events={}}},o=100/6,n={passive:!1},r=class{constructor(t,e={wheelMultiplier:1,touchMultiplier:1}){this.element=t,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,n),this.element.addEventListener("touchstart",this.onTouchStart,n),this.element.addEventListener("touchmove",this.onTouchMove,n),this.element.addEventListener("touchend",this.onTouchEnd,n)}touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new s;on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,n),this.element.removeEventListener("touchstart",this.onTouchStart,n),this.element.removeEventListener("touchmove",this.onTouchMove,n),this.element.removeEventListener("touchend",this.onTouchEnd,n)}onTouchStart=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})};onTouchMove=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.options.touchMultiplier,o=-(i-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})};onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})};onWheel=t=>{let{deltaX:e,deltaY:i,deltaMode:s}=t;e*=1===s?o:2===s?this.window.width:1,i*=1===s?o:2===s?this.window.height:1,e*=this.options.wheelMultiplier,i*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:t})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}},l=t=>Math.min(1,1.001-Math.pow(2,-10*t)),Lenis=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;__rafID=null;isTouching;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new e;emitter=new s;dimensions;virtualScroll;constructor({wrapper:t=window,content:e=document.documentElement,eventsTarget:s=t,smoothWheel:o=!0,syncTouch:n=!1,syncTouchLerp:h=.075,touchInertiaExponent:a=1.7,duration:c,easing:p,lerp:d=.1,infinite:u=!1,orientation:m="vertical",gestureOrientation:v=("horizontal"===m?"both":"vertical"),touchMultiplier:g=1,wheelMultiplier:S=1,autoResize:w=!0,prevent:f,virtualScroll:y,overscroll:E=!0,autoRaf:T=!1,anchors:b=!1,autoToggle:z=!1,allowNestedScroll:_=!1,__experimental__naiveDimensions:L=!1}={}){window.lenisVersion="1.3.11",t&&t!==document.documentElement||(t=window),"number"==typeof c&&"function"!=typeof p?p=l:"function"==typeof p&&"number"!=typeof c&&(c=1),this.options={wrapper:t,content:e,eventsTarget:s,smoothWheel:o,syncTouch:n,syncTouchLerp:h,touchInertiaExponent:a,duration:c,easing:p,lerp:d,infinite:u,gestureOrientation:v,orientation:m,touchMultiplier:g,wheelMultiplier:S,autoResize:w,prevent:f,virtualScroll:y,overscroll:E,autoRaf:T,anchors:b,autoToggle:z,allowNestedScroll:_,__experimental__naiveDimensions:L},this.dimensions=new i(t,e,{autoResize:w}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new r(s,{touchMultiplier:g,wheelMultiplier:S}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}onScrollEnd=t=>{t instanceof CustomEvent||"smooth"!==this.isScrolling&&!1!==this.isScrolling||t.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};onTransitionEnd=t=>{if(t.propertyName.includes("overflow")){const t=this.isHorizontal?"overflow-x":"overflow-y",e=getComputedStyle(this.rootElement)[t];["hidden","clip"].includes(e)?this.internalStop():this.internalStart()}};setScroll(t){this.isHorizontal?this.options.wrapper.scrollTo({left:t,behavior:"instant"}):this.options.wrapper.scrollTo({top:t,behavior:"instant"})}onClick=t=>{const e=t.composedPath().find((t=>t instanceof HTMLAnchorElement&&(t.getAttribute("href")?.startsWith("#")||t.getAttribute("href")?.startsWith("/#")||t.getAttribute("href")?.startsWith("./#"))));if(e){const t=e.getAttribute("href");if(t){const e="object"==typeof this.options.anchors&&this.options.anchors?this.options.anchors:void 0;let i=`#${t.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(t)&&(i=0),this.scrollTo(i,e)}}};onPointerDown=t=>{1===t.button&&this.reset()};onVirtualScroll=t=>{if("function"==typeof this.options.virtualScroll&&!1===this.options.virtualScroll(t))return;const{deltaX:e,deltaY:i,event:s}=t;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:i,event:s}),s.ctrlKey)return;if(s.lenisStopPropagation)return;const o=s.type.includes("touch"),n=s.type.includes("wheel");this.isTouching="touchstart"===s.type||"touchmove"===s.type;const r=0===e&&0===i;if(this.options.syncTouch&&o&&"touchstart"===s.type&&r&&!this.isStopped&&!this.isLocked)return void this.reset();const l="vertical"===this.options.gestureOrientation&&0===i||"horizontal"===this.options.gestureOrientation&&0===e;if(r||l)return;let h=s.composedPath();h=h.slice(0,h.indexOf(this.rootElement));const a=this.options.prevent;if(h.find((t=>t instanceof HTMLElement&&("function"==typeof a&&a?.(t)||t.hasAttribute?.("data-lenis-prevent")||o&&t.hasAttribute?.("data-lenis-prevent-touch")||n&&t.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.checkNestedScroll(t,{deltaX:e,deltaY:i})))))return;if(this.isStopped||this.isLocked)return void(s.cancelable&&s.preventDefault());if(!(this.options.syncTouch&&o||this.options.smoothWheel&&n))return this.isScrolling="native",this.animate.stop(),void(s.lenisStopPropagation=!0);let c=i;"both"===this.options.gestureOrientation?c=Math.abs(i)>Math.abs(e)?i:e:"horizontal"===this.options.gestureOrientation&&(c=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||0===this.animatedScroll&&i>0||this.animatedScroll===this.limit&&i<0))&&(s.lenisStopPropagation=!0),s.cancelable&&s.preventDefault();const p=o&&this.options.syncTouch,d=o&&"touchend"===s.type;d&&(c=Math.sign(this.velocity)*Math.pow(Math.abs(this.velocity),this.options.touchInertiaExponent)),this.scrollTo(this.targetScroll+c,{programmatic:!1,...p?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(null!==this._resetVelocityTimeout&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent)this._preventNextNativeScrollEvent=!1;else if(!1===this.isScrolling||"native"===this.isScrolling){const t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-t,this.direction=Math.sign(this.animatedScroll-t),this.isStopped||(this.isScrolling="native"),this.emit(),0!==this.velocity&&(this._resetVelocityTimeout=setTimeout((()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()}),400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.options.autoToggle?this.rootElement.style.removeProperty("overflow"):this.internalStart())}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.options.autoToggle?this.rootElement.style.setProperty("overflow","clip"):this.internalStop())}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=t=>{const e=t-(this.time||t);this.time=t,this.animate.advance(.001*e),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))};scrollTo(e,{offset:i=0,immediate:s=!1,lock:o=!1,duration:n=this.options.duration,easing:r=this.options.easing,lerp:h=this.options.lerp,onStart:a,onComplete:c,force:p=!1,programmatic:d=!0,userData:u}={}){if(!this.isStopped&&!this.isLocked||p){if("string"==typeof e&&["top","left","start"].includes(e))e=0;else if("string"==typeof e&&["bottom","right","end"].includes(e))e=this.limit;else{let t;if("string"==typeof e?t=document.querySelector(e):e instanceof HTMLElement&&e?.nodeType&&(t=e),t){if(this.options.wrapper!==window){const t=this.rootElement.getBoundingClientRect();i-=this.isHorizontal?t.left:t.top}const s=t.getBoundingClientRect();e=(this.isHorizontal?s.left:s.top)+this.animatedScroll}}if("number"==typeof e){if(e+=i,e=Math.round(e),this.options.infinite){if(d){this.targetScroll=this.animatedScroll=this.scroll;const t=e-this.animatedScroll;t>this.limit/2?e-=this.limit:t<-this.limit/2&&(e+=this.limit)}}else e=t(0,e,this.limit);if(e===this.targetScroll)return a?.(this),void c?.(this);if(this.userData=u??{},s)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},void requestAnimationFrame((()=>{this.dispatchScrollendEvent()}));d||(this.targetScroll=e),"number"==typeof n&&"function"!=typeof r?r=l:"function"==typeof r&&"number"!=typeof n&&(n=1),this.animate.fromTo(this.animatedScroll,e,{duration:n,easing:r,lerp:h,onStart:()=>{o&&(this.isLocked=!0),this.isScrolling="smooth",a?.(this)},onUpdate:(t,e)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=t-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=t,this.setScroll(this.scroll),d&&(this.targetScroll=t),e||this.emit(),e&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame((()=>{this.dispatchScrollendEvent()})),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame((()=>{this._preventNextNativeScrollEvent=!1}))}checkNestedScroll(t,{deltaX:e,deltaY:i}){const s=Date.now(),o=t._lenis??={};let n,r,l,h,a,c,p,d;const u=this.options.gestureOrientation;if(s-(o.time??0)>2e3){o.time=Date.now();const e=window.getComputedStyle(t);o.computedStyle=e;const i=e.overflowX,s=e.overflowY;if(n=["auto","overlay","scroll"].includes(i),r=["auto","overlay","scroll"].includes(s),o.hasOverflowX=n,o.hasOverflowY=r,!n&&!r)return!1;if("vertical"===u&&!r)return!1;if("horizontal"===u&&!n)return!1;a=t.scrollWidth,c=t.scrollHeight,p=t.clientWidth,d=t.clientHeight,l=a>p,h=c>d,o.isScrollableX=l,o.isScrollableY=h,o.scrollWidth=a,o.scrollHeight=c,o.clientWidth=p,o.clientHeight=d}else l=o.isScrollableX,h=o.isScrollableY,n=o.hasOverflowX,r=o.hasOverflowY,a=o.scrollWidth,c=o.scrollHeight,p=o.clientWidth,d=o.clientHeight;if(!n&&!r||!l&&!h)return!1;if(!("vertical"!==u||r&&h))return!1;if(!("horizontal"!==u||n&&l))return!1;let m,v,g,S,w,f;if("horizontal"===u)m="x";else if("vertical"===u)m="y";else{0!==e&&n&&l&&(m="x"),0!==i&&r&&h&&(m="y")}if(!m)return!1;if("x"===m)v=t.scrollLeft,g=a-p,S=e,w=n,f=l;else{if("y"!==m)return!1;v=t.scrollTop,g=c-d,S=i,w=r,f=h}return(S>0?v<g:v>0)&&w&&f}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){const t=this.options.wrapper;return this.isHorizontal?t.scrollX??t.scrollLeft:t.scrollY??t.scrollTop}get scroll(){return this.options.infinite?(t=this.animatedScroll,e=this.limit,(t%e+e)%e):this.animatedScroll;var t,e}get progress(){return 0===this.limit?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(t){this._isScrolling!==t&&(this._isScrolling=t,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(t){this._isStopped!==t&&(this._isStopped=t,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(t){this._isLocked!==t&&(this._isLocked=t,this.updateClassName())}get isSmooth(){return"smooth"===this.isScrolling}get className(){let t="lenis";return this.options.autoToggle&&(t+=" lenis-autoToggle"),this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),"smooth"===this.isScrolling&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};globalThis.Lenis=Lenis,globalThis.Lenis.prototype=Lenis.prototype;//# sourceMappingURL=lenis.min.js.map;
window.HERO_GLYPH={"ch": "遊", "size": 1000, "glyph": "M389.5 900.0Q352.6 896.8 320.5 883.7Q288.4 870.5 264.2 841.1Q229.5 791.6 201.1 738.4Q172.6 685.3 135.8 636.8H137.9L155.8 651.6V655.8L185.3 681.1Q211.6 714.7 232.6 750.5Q253.7 786.3 278.9 821.1Q308.4 841.1 340.0 849.5Q371.6 857.9 409.5 855.8Q502.1 845.3 596.8 839.5Q691.6 833.7 773.7 788.4Q803.2 754.7 828.9 716.3Q854.7 677.9 862.1 633.7L864.2 651.6Q858.9 675.8 854.2 698.9Q849.5 722.1 849.5 749.5H844.2L842.1 771.6H836.8Q840.0 781.1 836.3 787.4Q832.6 793.7 829.5 801.1H822.1L817.9 821.1L812.6 830.5L800.0 843.2L792.6 845.3L790.5 850.5H785.3V855.8Q691.6 885.3 591.1 888.9Q490.5 892.6 389.5 900.0ZM378.9 710.5 340.0 690.5 337.9 683.2 288.4 661.1Q281.1 651.6 280.0 640.5Q278.9 629.5 278.9 616.8Q301.1 543.2 352.6 480.0Q404.2 416.8 404.2 333.7H398.9L371.6 346.3L369.5 350.5L327.4 372.6L320.0 383.2L275.8 397.9Q246.3 392.6 216.8 387.9Q187.4 383.2 163.2 368.4L157.9 350.5H167.4L189.5 355.8Q249.5 343.2 301.1 312.6Q352.6 282.1 406.3 254.7L411.6 240.0H416.8L418.9 212.6Q416.8 186.3 414.2 160.5Q411.6 134.7 393.7 114.7L369.5 102.1L396.8 100.0L411.6 107.4Q431.6 131.6 440.0 161.1Q448.4 190.5 450.5 223.2Q468.4 225.3 486.8 226.3Q505.3 227.4 516.8 242.1H514.7V249.5H520.0V254.7L512.6 257.9L500.0 269.5L485.3 274.7V280.0L475.8 282.1V287.4L461.1 291.6V296.8L435.8 318.9L424.2 377.9H428.4L433.7 370.5L542.1 262.1H546.3V257.9H551.6V252.6L601.1 215.8V210.5Q628.4 190.5 656.3 173.7Q684.2 156.8 718.9 153.7L735.8 161.1L743.2 197.9L741.1 210.5H735.8L731.6 230.5H726.3L721.1 242.1H713.7L709.5 249.5L682.1 284.2H676.8L669.5 298.9H665.3L647.4 341.1L702.1 402.1H711.6Q726.3 397.9 742.1 397.9Q757.9 397.9 773.7 397.9L814.7 414.7L825.3 424.2L829.5 436.8L820.0 471.6L810.5 473.7L807.4 488.4L788.4 508.4L777.9 528.4L766.3 537.9L757.9 552.6L728.4 572.6V565.3Q746.3 537.9 752.1 507.4Q757.9 476.8 763.2 444.2H743.2L716.8 454.7Q713.7 506.3 705.3 554.2Q696.8 602.1 676.8 646.3Q669.5 655.8 660.0 658.4Q650.5 661.1 637.9 658.9L588.4 633.7L586.3 626.3L573.7 622.1Q571.6 606.3 565.3 594.2Q558.9 582.1 561.1 565.3Q564.2 537.9 575.3 515.8Q586.3 493.7 603.2 473.7L660.0 427.4V416.8Q647.4 392.6 628.9 369.5Q610.5 346.3 615.8 313.7Q635.8 282.1 656.3 251.1Q676.8 220.0 689.5 186.3L680.0 183.2V188.4Q650.5 208.4 622.1 230.5Q593.7 252.6 568.4 276.8L531.6 304.2L529.5 311.6L512.6 321.1L500.0 338.9L490.5 348.4H485.3V353.7L468.4 370.5H463.2L453.7 385.3L435.8 405.3H431.6Q413.7 451.6 413.7 506.8Q413.7 562.1 411.6 616.8Q413.7 638.9 417.4 660.0Q421.1 681.1 426.3 703.2ZM391.6 661.1 393.7 653.7 389.5 614.7V508.4L391.6 469.5H386.3Q362.1 503.2 338.9 538.9Q315.8 574.7 310.5 618.9L320.0 644.2L389.5 663.2ZM647.4 574.7Q660.0 550.5 666.3 523.2Q672.6 495.8 669.5 466.3H660.0Q647.4 471.6 635.3 481.6Q623.2 491.6 613.7 503.2Q606.3 513.7 600.0 525.8Q593.7 537.9 595.8 552.6L608.4 574.7L630.5 582.1Z", "strokes": [{"d": "M378.1 102.8 L380.5 103.3 L384.4 104.0 L389.1 104.9 L393.8 106.6 L398.4 109.2 L402.6 113.0 L406.4 117.2 L409.7 121.9 L412.5 126.6 L414.8 131.2 L416.8 135.9 L418.8 140.6 L420.5 145.3 L421.7 150.0 L422.7 154.7 L423.6 159.4 L424.7 164.1 L425.7 168.8 L426.4 173.4 L427.1 178.1 L428.0 182.8 L429.0 187.5 L430.0 192.2 L430.7 196.9 L431.2 201.6 L431.2 206.2 L431.6 210.9 L432.1 215.6 L432.6 220.3 L432.8 225.0 L432.8 229.7 L433.0 234.4 L434.4 239.1 L437.0 243.8 L441.0 248.3 L445.3 251.4 L450.0 252.8 L454.7 252.1 L459.4 250.5 L464.1 249.1 L468.8 248.4 L473.4 248.4 L478.1 248.4 L482.8 247.9 L487.5 247.4 L492.2 246.9 L496.9 246.9 L501.6 247.9 L506.2 249.5 L509.4 250.9", "w": 65.1, "len": 51}, {"d": "M444.4 257.8 L443.0 259.6 L440.1 262.5 L436.8 266.1 L433.5 270.3 L430.4 275.0 L426.4 279.2 L421.9 282.8 L417.2 285.9 L412.5 289.1 L408.0 292.7 L404.7 296.1 L402.8 298.4", "w": 80.8, "len": 13}, {"d": "M170.3 359.7 L172.7 360.9 L176.6 362.5 L181.2 364.1 L185.9 364.9 L190.6 365.8 L195.3 366.5 L200.0 367.0 L204.7 367.2 L209.4 367.2 L214.1 367.5 L218.8 367.5 L223.4 367.5 L228.1 367.2 L232.8 367.2 L237.5 367.2 L242.2 367.2 L246.9 367.0 L251.6 366.5 L256.2 366.0 L260.9 365.6 L265.6 365.3 L270.3 364.2 L275.0 362.7 L279.7 360.8 L284.4 358.9 L289.1 356.6 L293.8 353.6 L298.4 350.5 L303.1 347.4 L307.8 344.6 L312.5 342.0 L317.2 339.2 L321.9 336.6 L326.6 334.0 L331.2 331.6 L335.9 329.2 L340.6 326.2 L345.3 323.1 L350.0 320.1 L354.7 317.5 L359.4 315.3 L364.1 312.8 L368.8 310.6 L373.4 308.9 L378.1 307.5 L382.8 306.4 L387.5 305.4 L392.2 304.3 L396.9 303.8 L401.6 304.9 L406.2 308.0 L410.8 312.5 L413.9 317.2 L415.5 321.9 L415.6 326.6 L415.5 331.2 L414.9 335.9 L414.4 340.6 L414.1 345.3 L413.9 350.0 L413.4 354.7 L412.8 359.4 L412.2 364.1 L411.6 368.8 L411.1 373.4 L410.9 378.1 L410.9 382.8 L411.8 387.5 L412.3 392.2 L412.3 396.9 L411.1 401.6 L409.7 406.2 L408.3 410.9 L406.9 415.6 L405.7 420.3 L404.7 425.0 L403.5 429.7 L401.9 434.4 L400.3 439.1 L399.0 443.8 L397.4 448.1 L394.6 451.6 L390.6 454.2 L385.9 456.2 L381.2 459.0 L376.9 462.7 L373.1 467.2 L369.6 471.9 L366.1 476.6 L362.7 481.2 L359.2 485.9 L355.7 490.6 L352.3 495.3 L349.0 500.0 L345.8 504.7 L342.7 509.4 L339.6 514.1 L336.5 518.8 L333.3 523.4 L330.2 528.1 L327.3 532.8 L324.5 537.5 L321.9 542.2 L319.3 546.9 L316.8 551.6 L314.4 556.2 L312.2 560.9 L309.7 565.6 L307.8 570.3 L306.1 575.0 L304.9 579.7 L303.3 584.4 L301.7 589.1 L300.0 593.8 L298.8 598.4 L297.7 603.1 L297.2 607.8 L296.4 612.5 L295.8 617.2 L295.0 621.9 L294.8 626.6 L295.0 631.2 L296.0 635.9 L297.9 640.6 L300.5 645.3 L304.0 649.7 L308.0 653.0 L312.5 655.4 L317.2 657.1 L321.9 658.9 L326.6 660.4 L331.2 661.8 L335.9 663.4 L340.6 665.3 L345.3 667.5 L350.0 670.3 L354.7 672.9 L359.4 675.3 L364.1 677.1 L368.8 678.5 L373.4 679.7 L378.1 680.6 L382.8 681.6 L387.5 682.3 L392.2 682.1 L396.7 680.0 L400.3 676.4 L402.4 671.9 L403.1 667.2 L402.8 662.5 L402.3 657.8 L401.7 653.1 L401.6 648.4 L401.6 643.8 L401.6 639.1 L401.0 634.4 L400.5 629.7 L400.0 625.0 L400.0 620.3 L399.5 615.6 L399.0 610.9 L398.4 606.2 L398.4 601.6 L398.4 596.9 L398.4 592.2 L398.6 587.5 L399.1 582.8 L399.7 578.1 L400.0 573.4 L400.0 568.8 L400.0 564.1 L400.0 559.4 L400.0 554.7 L400.0 550.0 L400.0 545.3 L400.0 540.6 L400.0 535.9 L400.0 531.2 L400.0 526.6 L400.0 521.9 L400.0 517.2 L400.0 512.5 L400.0 507.8 L400.0 503.1 L400.0 498.4 L400.0 493.8 L400.5 489.1 L401.0 484.4 L401.6 479.7 L401.6 475.0 L401.6 470.3 L401.6 465.6 L401.6 460.9 L401.0 457.0 L400.6 454.7", "w": 76.2, "len": 196}, {"d": "M418.8 390.6 L421.1 390.0 L425.0 389.1 L429.7 387.3 L434.0 384.7 L438.2 381.1 L442.2 376.6 L446.2 371.9 L450.3 367.2 L454.7 363.0 L459.4 358.9 L464.1 354.7 L468.8 350.0 L472.9 345.3 L477.1 341.1 L481.2 337.0 L485.9 332.8 L490.5 328.1 L494.6 323.4 L498.8 318.8 L503.1 314.2 L507.8 310.2 L512.5 306.6 L516.8 302.8 L521.0 298.4 L525.2 293.8 L529.7 289.6 L534.4 285.4 L539.1 281.4 L543.8 277.3 L548.4 273.1 L553.1 269.3 L557.8 265.1 L562.5 260.9 L567.2 256.6 L571.9 252.4 L576.6 248.8 L581.2 245.1 L585.9 241.5 L590.6 237.7 L595.3 233.9 L600.0 230.2 L604.3 226.2 L608.5 222.4 L612.7 218.6 L617.2 215.1 L621.9 211.5 L626.6 207.8 L631.2 204.2 L635.9 200.7 L640.6 197.4 L645.3 194.3 L650.0 191.1 L654.7 188.2 L659.4 185.1 L664.1 181.8 L668.8 178.3 L673.4 175.7 L678.1 174.1 L682.8 173.3 L687.5 172.6 L692.2 172.0 L696.9 172.4 L701.6 174.5 L705.7 178.1 L708.5 182.8 L709.5 187.5 L709.5 192.2 L708.9 196.9 L708.3 201.6 L706.9 206.2 L705.2 210.9 L702.6 215.6 L699.3 220.3 L696.0 225.0 L692.7 229.7 L689.8 234.4 L686.6 239.1 L683.5 243.8 L680.6 248.4 L677.6 253.1 L674.3 257.8 L670.8 262.5 L666.8 266.8 L663.2 271.0 L659.9 275.2 L656.8 279.7 L653.5 284.4 L650.2 289.1 L647.4 293.8 L645.0 298.4 L642.4 303.1 L639.8 307.8 L637.2 312.5 L634.7 317.2 L632.5 321.9 L631.1 326.6 L630.7 331.2 L631.4 335.9 L632.1 340.6 L633.0 345.3 L634.5 350.0 L637.2 354.7 L640.5 359.4 L644.3 364.1 L647.9 368.8 L651.7 373.4 L655.4 378.1 L659.0 382.8 L662.7 387.5 L666.0 392.2 L669.4 396.9 L672.2 401.6 L674.3 406.2 L675.7 410.9 L677.1 415.6 L679.5 420.3 L683.0 424.3 L687.5 426.4 L692.2 426.6 L696.9 425.7 L701.6 424.8 L706.2 424.1 L710.9 423.3 L715.6 422.6 L720.3 422.0 L725.0 421.9 L729.7 421.9 L734.4 421.5 L739.1 421.0 L743.8 420.5 L748.4 420.3 L753.1 420.7 L757.8 421.2 L762.5 422.0 L767.2 422.7 L771.9 424.0 L776.4 426.2 L780.2 429.9 L783.2 434.4 L785.2 439.1 L785.6 443.8 L785.1 448.4 L783.7 453.1 L783.2 457.8 L782.5 462.5 L781.6 467.2 L779.9 471.9 L778.1 476.6 L776.0 481.2 L774.1 485.9 L771.9 490.6 L770.0 495.3 L768.2 500.0 L766.8 504.7 L765.3 509.4 L763.4 514.1 L761.1 518.8 L758.7 523.4 L756.2 528.1 L753.8 532.8 L751.6 537.5 L749.3 542.2 L746.2 546.9 L742.5 551.6 L738.4 556.2 L734.2 560.9 L732.0 563.3", "w": 65.3, "len": 168}, {"d": "M685.9 432.8 L685.4 435.2 L683.3 439.1 L679.7 442.9 L675.0 445.7 L670.3 447.4 L665.6 448.8 L660.9 450.2 L656.2 451.6 L651.6 453.1 L646.9 455.4 L642.2 458.2 L637.5 461.5 L632.8 464.9 L628.1 468.6 L623.4 472.6 L618.8 476.2 L614.1 480.2 L609.4 484.4 L605.2 489.1 L601.4 493.8 L598.3 498.4 L595.3 503.1 L592.7 507.8 L589.9 512.5 L587.7 517.2 L585.4 521.9 L584.0 526.6 L582.6 531.2 L581.9 535.9 L581.1 540.6 L580.4 545.3 L579.9 550.0 L579.2 554.7 L578.6 559.4 L578.1 564.1 L578.5 568.8 L579.5 573.4 L581.4 578.1 L583.9 582.8 L586.5 587.5 L589.2 592.2 L592.7 596.2 L596.9 599.1 L601.6 601.2 L606.2 603.1 L610.9 605.0 L615.6 606.6 L620.3 607.8 L625.0 608.7 L629.7 609.7 L634.4 610.8 L639.1 611.6 L643.8 611.1 L648.4 609.4 L653.1 606.4 L657.8 602.8 L662.3 598.4 L665.8 593.8 L668.2 589.1 L670.0 584.4 L671.9 579.7 L673.8 575.0 L675.3 570.3 L676.7 565.6 L678.1 560.9 L679.3 556.2 L680.4 551.6 L681.4 546.9 L682.5 542.2 L683.5 537.5 L684.2 532.8 L685.1 528.1 L685.6 523.4 L686.5 518.8 L687.0 514.1 L687.5 509.4 L687.5 504.7 L687.7 500.0 L688.2 495.3 L688.7 490.6 L689.1 485.9 L689.1 481.2 L689.1 476.6 L689.1 471.9 L689.2 467.2 L689.8 462.5 L690.3 457.8 L690.6 453.1 L690.6 448.4 L690.1 443.8 L689.8 441.4", "w": 76.5, "len": 92}, {"d": "M145.6 646.9 L147.7 649.2 L150.5 653.1 L154.2 657.8 L158.0 662.5 L162.0 667.2 L166.1 671.9 L170.3 676.6 L174.7 681.2 L178.5 685.9 L181.8 690.6 L185.1 695.3 L188.2 700.0 L191.3 704.7 L194.3 709.4 L197.4 714.1 L200.3 718.8 L203.1 723.4 L205.7 728.1 L208.5 732.8 L211.5 737.5 L214.4 742.2 L217.2 746.9 L219.8 751.6 L222.6 756.2 L225.3 760.9 L228.1 765.6 L230.7 770.3 L233.5 775.0 L236.5 779.7 L239.4 784.4 L242.4 789.1 L245.3 793.8 L248.4 798.4 L251.6 803.1 L254.9 807.8 L258.0 812.5 L261.3 817.2 L264.6 821.9 L268.2 826.6 L272.2 831.2 L276.6 835.6 L281.2 839.4 L285.9 842.7 L290.6 846.0 L295.3 849.1 L300.0 852.1 L304.7 854.7 L309.4 856.9 L314.1 858.9 L318.8 860.9 L323.4 863.0 L328.1 864.8 L332.8 866.1 L337.5 867.4 L342.2 868.9 L346.9 869.8 L351.6 870.8 L356.2 871.9 L360.9 872.9 L365.6 873.4 L370.3 874.0 L375.0 874.5 L379.7 875.0 L384.4 875.2 L389.1 875.7 L393.8 876.2 L398.4 876.2 L403.1 875.7 L407.8 875.2 L412.5 875.0 L417.2 875.0 L421.9 875.0 L426.6 875.0 L431.2 874.5 L435.9 874.0 L440.6 873.4 L445.3 873.3 L450.0 872.7 L454.7 872.2 L459.4 871.9 L464.1 871.9 L468.8 871.9 L473.4 871.5 L478.1 871.0 L482.8 870.5 L487.5 870.3 L492.2 869.8 L496.9 869.3 L501.6 868.8 L506.2 868.6 L510.9 868.1 L515.6 867.5 L520.3 867.2 L525.0 867.2 L529.7 867.2 L534.4 867.2 L539.1 866.7 L543.8 866.1 L548.4 865.6 L553.1 865.6 L557.8 865.6 L562.5 865.6 L567.2 865.1 L571.9 864.6 L576.6 864.1 L581.2 864.1 L585.9 863.5 L590.6 863.0 L595.3 862.5 L600.0 862.5 L604.7 862.5 L609.4 862.0 L614.1 861.5 L618.8 860.9 L623.4 860.9 L628.1 860.6 L632.8 860.1 L637.5 859.5 L642.2 858.9 L646.9 858.3 L651.6 857.6 L656.2 857.1 L660.9 856.4 L665.6 855.6 L670.3 854.5 L675.0 853.6 L679.7 852.6 L684.4 851.9 L689.1 850.9 L693.8 850.0 L698.4 849.0 L703.1 847.7 L707.8 846.4 L712.5 845.0 L717.2 843.6 L721.9 842.2 L726.6 840.6 L731.2 839.2 L735.9 837.8 L740.6 836.5 L745.3 835.1 L750.0 833.7 L754.7 831.4 L759.4 828.6 L764.1 825.3 L768.8 822.7 L773.4 820.0 L778.1 817.2 L782.8 814.1 L787.5 810.4 L792.0 806.2 L795.5 801.6 L798.3 796.9 L800.3 792.2 L803.1 787.7 L806.6 783.5 L810.4 779.3 L813.9 775.0 L816.5 770.3 L818.4 765.6 L820.1 760.9 L822.6 756.2 L825.2 751.6 L827.4 746.9 L829.2 742.2 L831.8 737.5 L834.4 732.8 L836.5 728.1 L837.8 723.4 L839.2 718.8 L840.8 714.1 L842.0 709.4 L843.4 704.7 L844.8 700.0 L846.4 695.3 L847.9 690.6 L849.5 685.9 L850.9 681.2 L852.1 676.6 L853.3 671.9 L854.7 667.2 L856.2 662.5 L857.6 657.8 L858.7 653.1 L859.2 648.4 L859.4 644.5 L859.4 642.2", "w": 69.6, "len": 188}]};window.SECTION_GLYPHS={"about": "M900 888Q794 866 683 850Q572 834 488 749L487 742L480 738Q435 691 400 637Q366 582 316 545L300 547L292 541L286 531L258 597H253Q240 626 225 653Q210 680 195 709L179 724L161 757L152 765H147L141 774H137L133 782L120 786L89 811L65 816L52 809L50 795L78 757L87 747H91L120 711H123L149 663L156 659Q181 597 203 533Q225 470 240 403Q234 397 230 386Q227 376 225 367L227 360L225 351L240 339L266 267L260 231L271 229L273 214H276L282 192L300 187Q308 171 311 152Q314 133 314 112L342 128Q348 143 355 161Q361 178 361 199L400 210L402 216L411 224V233L405 253L395 258Q390 271 384 286Q379 301 381 320L385 332L381 335L376 356L372 347H364L342 372H337L335 385H332L324 420Q335 428 333 441Q332 454 337 465Q374 483 406 514Q437 545 465 578V582H469V588L478 593L526 651L546 671V676L559 678V684Q649 747 753 779Q858 811 950 869H945V873H939V881H943V883H939L915 881V888H910L903 885Z", "works": "M610 950 609 948 659 900 658 888 613 885 610 887 552 879 530 882 524 880V877L504 879L493 881L483 880L466 885L455 881V884H451L440 881V886H435V881L418 882L375 893V898H377L347 900L348 906Q313 909 281 921Q249 933 219 943L206 938L188 922L185 911L176 904L158 895V891H165V886L157 871H163V869V871H169L172 858Q183 859 192 855Q201 852 214 849L236 850Q242 842 253 844Q264 847 273 840Q278 822 283 803Q288 785 284 765Q264 721 232 681Q200 641 204 584H215L270 611L273 620L286 626Q316 662 341 699Q365 736 361 785L345 823L357 822Q397 815 437 811Q477 808 520 806L743 812L751 808L759 812V803L785 796L800 801L811 795L819 800V805L895 819V826L906 824V827L918 833L922 844L898 855L887 865L888 871L863 879V886H849L834 885L832 887L829 885L797 888V881L780 879L771 882L754 880L752 888Q730 890 710 895Q690 901 671 907V912L662 913V919Q650 928 637 937Q624 946 610 950ZM434 762 429 749 423 751 422 746H416V739L402 737L395 710L397 698L394 684Q400 640 399 595Q398 551 396 508Q395 464 376 429Q358 394 333 364L328 360L327 355L347 348V345H358Q389 353 418 366Q448 380 471 408Q481 418 480 433Q480 448 481 461Q477 478 472 497Q466 515 469 535L475 534L507 526V524H510L518 526L522 518L558 515Q576 524 594 525Q613 525 630 530L636 544L619 547V554L623 558L592 577L593 588L547 590L504 584L461 611L455 711L461 739H459L458 748L443 755L440 762ZM78 639Q120 499 183 361Q246 222 306 86V97H302L304 103L312 102Q317 93 322 83Q327 73 327 59H321V50H329L333 59L329 67L345 75Q344 66 352 64Q359 61 364 60V71H373L390 67L445 93V96H443L444 104H446V118H444L445 132L508 184V190L538 211L541 220Q592 261 648 289Q705 317 759 354V359Q770 363 781 372Q791 381 800 390L803 401L818 406L823 423L832 426L833 432L839 430H837L819 426V443L833 451H828L796 427Q737 390 675 360Q613 329 550 299V293Q530 285 514 272Q498 258 478 245L475 237H470L410 181H396L382 210L379 201H373L371 210L363 214L360 222L317 264L286 304L279 306L231 377L221 389H215L203 416H197L178 450H172L169 459H163L148 494H144L140 507L135 508V517H129Q120 549 107 579Q94 609 78 639Z", "tools": "M317 925 311 923 300 904 281 903 271 906V909H269L258 906L237 912Q203 876 183 830Q162 784 161 731L169 724V721H174L194 730L247 680L257 669L296 620H301Q318 588 332 558Q345 529 353 492L345 493Q325 502 301 509Q278 516 255 519L242 517V502L245 491H237L183 513L181 517H175Q173 506 164 495Q155 484 155 471L160 459L177 440Q187 442 195 434Q202 427 210 421L213 415L229 406L231 411L216 418V422L206 437L213 436Q233 427 254 423Q274 420 293 413L301 414L359 379L360 371Q356 363 348 355Q341 348 344 335L363 274L392 262L453 274L455 281Q443 292 439 307Q435 323 437 341H442L471 368L479 367L540 343L542 327L534 323Q555 324 572 312Q588 300 609 301Q635 315 663 324Q690 333 715 348L708 352V360L696 367L694 372L652 373L651 383Q619 389 592 395Q564 400 544 416Q588 491 660 535Q731 580 802 612L885 648V653Q900 656 914 660Q928 665 941 673L943 677L949 676L931 677L932 683L950 689L921 685L919 688L903 684L902 681L853 676V681L862 687L865 716Q866 727 860 734Q854 740 849 748L833 753V761H852V763L842 774L825 791L810 795V801Q791 815 766 820Q742 825 718 830L682 825L679 794L680 781L674 774L681 770Q679 760 683 754Q687 747 691 739Q707 734 722 728Q737 722 746 705L748 697Q728 691 704 688Q680 685 655 685L648 689L618 675L613 665Q636 656 660 649Q684 642 710 641V633H699L687 626L650 606L643 598L606 580V576Q592 568 576 555Q561 542 548 530Q529 508 513 484Q497 460 484 435H479L412 463L392 508H387Q377 542 359 572Q341 601 326 632L312 651L318 650L319 656H324L347 645V652H351L352 658Q391 664 428 667Q466 671 498 695Q508 703 510 713Q511 723 513 736L478 789L451 808V814L421 850H416V861L410 866L403 882L395 886V890Q377 900 363 909Q348 919 327 919ZM594 885 584 878Q577 862 566 849Q555 837 555 822V760Q552 734 552 706Q552 677 544 652L546 651L558 659V653L556 649H562L603 681Q617 708 625 739Q634 769 636 802L634 810H640L643 847Q635 849 636 856Q636 862 636 870L609 874L595 864ZM280 817V815L289 792L297 791L298 803L296 813L302 811Q323 808 340 800Q357 792 372 776Q376 766 384 756Q392 746 391 734H383Q358 740 334 747Q310 754 286 766L274 718L282 714L281 702L273 703V700L274 689L270 690L225 724L223 729L203 744L211 748V754L216 753L226 771L240 775L263 808L278 821ZM142 402Q114 357 89 311Q64 265 50 215L68 224V219L61 214H65L113 249V254L142 276Q161 296 177 317Q192 339 198 364L195 374L205 392H197L186 388L168 391V389L155 387L150 399ZM232 390Q222 379 215 363Q209 347 207 328L211 306L208 300L213 284Q222 272 233 268Q245 264 257 264L288 191H280L190 227V232H184Q182 222 182 208Q182 194 175 185L182 181Q182 170 184 162Q186 153 194 145Q209 142 223 133Q237 124 249 116L263 138H277L297 130L306 115L335 111L356 120V124H368L385 136L392 144L397 167H399V171L366 235H372L383 224V227Q374 246 360 262Q347 279 334 294L317 312H312L313 325L300 332V339L260 377H241Q242 383 240 387Q238 390 232 390ZM522 319Q491 274 489 218Q486 161 474 106H482L481 102H483L494 108Q525 150 542 192Q560 234 571 281L568 302L548 311L533 304L527 317L524 315ZM621 249V246L610 223L611 208H615V200L611 184Q613 174 620 165Q626 155 636 147L661 128Q640 126 619 122Q597 118 580 105L576 98Q604 87 635 83Q666 79 700 77L711 79L726 75L782 100L784 107H789L792 124L786 146H781L776 160L768 162V167L755 174Q755 178 750 178Q745 178 739 178Q738 186 734 194Q730 202 734 213L724 224Q702 235 676 241Q650 247 621 249Z", "analysis": "M751 950Q724 880 722 800Q719 721 713 642L715 637Q712 574 710 508Q709 442 695 384L675 380L587 417Q586 476 567 528Q548 580 524 630H518Q511 653 499 676Q486 698 465 719L457 720L450 695L460 693Q484 622 492 546Q500 469 506 391Q500 379 500 362Q500 346 493 333H488L467 344V340L483 318L477 307H480L488 311V307H490V305L520 264Q541 228 561 188Q580 147 596 108L591 107V104L602 93H610L612 85H627V79L650 75Q668 81 683 89Q698 96 712 103V113L710 121L687 134L645 176H641V181H635L620 201L584 226L580 232H576V238L566 248H561L548 269Q535 273 528 283Q522 293 511 303V311L550 329L587 306L600 332L596 348H602Q671 319 744 293Q816 268 887 248L942 270H940V278H942V280Q908 303 872 311Q836 319 803 339L799 349H794V354H789V359L791 382L789 397L791 407L785 444L788 465L782 560L786 573L782 580L785 626Q780 689 770 751Q761 812 760 875L762 882L760 897L763 942ZM282 839 273 833Q254 805 239 776Q225 747 230 709L232 679L230 671H232L243 676Q251 669 250 658Q249 646 249 636L247 626L249 605H242Q229 628 216 650Q203 672 187 695L180 701L159 738L146 739Q133 722 121 706Q109 689 109 667L120 651H126Q152 583 172 511Q192 439 205 365H198L127 399Q110 384 91 369Q72 353 58 332H68V328H66H81L91 330Q132 319 169 301Q206 282 246 263L259 243L261 138L244 50L257 58V50L277 66L290 79V84H295L319 112Q332 133 332 157Q331 180 333 203L327 238L330 246L382 262L386 272L370 282L366 290L333 307L331 312L319 314Q307 355 302 397Q296 439 293 482H297L327 451H331L359 414L366 412L398 371H403L413 357V362L386 404H380Q349 459 311 511Q273 562 282 634Q286 682 294 728Q303 773 310 822L302 831ZM215 574Q228 562 239 548Q251 534 249 517L239 515L205 576H212Z", "approach": "M696 893Q558 883 434 826Q311 768 172 756L145 760L138 750L127 731L116 722L114 707L120 696H126V690L148 686L165 691L178 685L188 687Q200 683 208 679Q216 674 225 666Q231 658 232 646Q234 634 234 623Q214 590 190 557Q165 524 157 486L148 484Q131 492 113 496Q94 499 74 498Q66 491 59 486Q52 480 50 473V466H51L72 474Q95 463 117 449Q138 435 160 419Q163 412 164 406Q165 400 168 393L177 391L182 383L218 380Q231 388 246 392Q260 397 278 399L282 407L298 411V414L278 416L271 428Q266 432 263 435Q259 438 253 435V439L241 446Q228 459 222 475Q216 490 215 512L243 545L254 559L271 588H275Q284 599 287 611Q290 623 289 638Q287 652 284 666Q281 680 268 688L250 699L237 700V705Q408 772 586 816Q763 860 950 867Q893 885 829 888Q764 891 702 894L700 892ZM663 770 642 759V755L636 750L619 724L603 722Q569 725 540 730Q510 736 474 733Q474 728 470 725Q467 721 463 723L458 729H455L431 719L419 706V702L412 701L398 681V672Q407 644 410 614Q412 584 416 554L410 512L388 485L424 486Q448 491 470 503Q492 516 515 526Q527 523 542 521Q556 518 571 518Q577 521 586 522Q595 523 597 532L583 538L573 549L524 552L517 548L508 551L500 548Q491 557 491 569Q490 582 489 596L502 597L522 591L525 584L545 583V578L568 576Q577 584 589 587Q600 589 612 591V603L590 605L587 614L573 616L569 624Q550 635 536 652Q522 669 509 683L498 705L517 706Q538 700 562 700Q586 700 610 701Q612 685 620 672Q628 659 626 643L608 515L587 497L581 474L568 473V478Q560 478 552 481Q544 485 537 487L535 492L502 494L497 493L480 448Q499 443 521 436Q542 429 560 417V412Q575 404 591 396Q607 388 623 387L645 392L652 391Q673 403 694 415Q715 427 736 436V438L732 446H725L723 453H716L705 532L706 556L703 568L705 582L703 590L704 605L702 609L706 667L704 669L706 752L704 756L672 763L670 767ZM487 657Q491 648 496 640Q501 633 501 622L484 616L481 650L485 658ZM440 441V436Q457 420 470 403Q482 386 492 366L487 356L480 352L524 348Q538 350 550 356Q562 362 575 370L576 381L552 388V392Q522 395 495 412Q467 429 440 441ZM325 384 306 372 266 328 267 312 299 308Q304 313 309 315Q314 316 321 316Q353 312 385 301Q416 291 443 274V269Q452 262 461 259Q470 256 480 256Q496 261 508 271Q520 280 536 281Q573 271 614 266Q655 260 691 252L702 246L702 243H704L712 247L728 244Q746 255 763 263Q781 270 800 277L802 287L810 289V297L785 298L779 313L753 312L678 305Q661 307 646 314Q631 321 612 325L610 322V319L617 307L598 306Q581 311 566 320Q550 329 527 324L512 321L412 351V356Q392 372 370 376Q348 381 325 384ZM527 258V256L560 225H565Q583 200 600 174Q616 148 622 118L603 111L604 108L651 106L699 130V134L705 139L719 163Q704 173 689 177Q674 180 658 182L655 189Q637 195 622 205Q607 215 588 221L585 226L565 236V241Q555 247 546 252Q537 256 527 258ZM232 244Q226 236 219 235Q211 234 205 232L203 224L192 222L181 211L182 207L175 204V199H171L139 144L144 142Q182 151 216 167Q251 183 280 209L285 231L261 232V227L251 226L248 241ZM407 241 380 227 378 215H373L374 211H370Q365 197 358 182Q351 166 350 150L359 136L367 137L408 170L425 166V171L418 192L431 207L433 220L445 228L443 229L430 227L425 229L417 224L415 228H410V237L413 239Z", "contact": "M186 934V928H180V926Q158 924 138 909Q118 895 97 887Q87 848 75 810Q63 773 50 734L66 747V751L113 786L152 686L171 684L178 686V678H184L207 684L225 639H230Q236 668 238 696Q240 723 249 749H238Q217 749 201 740Q184 730 167 717L165 708H158Q160 723 156 737Q152 751 147 764Q139 812 161 847Q184 882 193 921H197V928L188 932V934ZM613 905V900L605 885L590 882L583 885L570 864H572V855Q564 838 556 821Q548 803 538 788L527 786L478 840Q467 842 460 849Q452 855 441 853V848Q460 827 478 804Q496 780 512 754V736L501 712L491 710L483 723H478L452 760Q443 762 439 770Q434 777 423 775L415 734Q436 697 455 660Q475 624 488 585H483L462 608L441 618V616L467 579H473Q493 546 514 513Q535 480 546 443H540Q509 454 474 461Q439 467 410 488Q397 475 396 458Q395 441 391 426Q454 410 508 371Q561 332 613 288L616 279L624 277L626 262H609L583 266L572 264L527 266L512 253Q551 236 595 228Q639 220 686 220L689 178L682 175Q663 184 643 185Q624 186 603 186Q583 184 561 181Q540 178 525 165L522 158Q566 152 611 142Q655 132 702 134Q728 139 753 149Q777 160 801 175V180Q788 199 779 220Q770 240 764 264H760L754 283L730 316H725L717 329L712 337H708L704 350H712L728 345V339L736 337V339L757 342V337H767Q780 350 798 354Q816 358 833 365L835 376L833 387H827V391L801 395L793 391Q747 397 702 405Q658 413 618 428L626 441L611 470L590 493H585L583 501L557 517V525L574 546L557 579H561Q570 572 578 568Q587 564 600 564Q609 566 617 566Q626 566 634 574V600Q613 645 591 688Q570 730 543 773Q553 788 569 801Q585 814 600 825H609L616 822Q637 780 646 733Q655 686 658 637L650 618L639 616V613H642V605L655 600L658 561L642 546Q621 543 604 537Q587 530 570 525V520H587Q618 525 650 529Q682 533 708 548L717 525L730 509L747 470L741 467L751 465Q754 457 759 457Q764 457 773 457L825 480L827 488L835 491V504L807 527L786 538L783 543Q764 548 750 560Q736 572 721 579L710 650L754 691V697L767 702L799 734L809 743V749Q842 767 877 787Q911 807 945 827L950 848L945 864H934Q887 848 843 827Q799 807 757 777L754 770L741 762L697 708Q684 757 659 802Q634 848 624 900ZM527 734V728Q543 699 557 668Q570 637 577 603H574L543 621L538 632L520 650Q514 663 509 673Q504 684 507 699L520 734ZM314 668Q309 663 302 661Q296 660 288 660L283 652H272L240 618V613L272 608Q290 611 304 617Q318 624 335 632L337 645L327 660L318 663L316 668ZM134 574 115 559 110 514 134 491 173 457H178L188 434H184Q167 447 151 453Q134 460 115 467L105 480H95Q87 465 82 449Q76 434 74 417L79 397L102 384V378H108L110 371H118L121 361L132 352L134 345L141 342Q173 296 199 245Q225 193 230 136L214 82L217 74L214 66H217Q233 87 256 108Q279 128 292 152V180Q283 210 266 237Q249 264 230 290H225L165 374H173L207 355V350L217 348V345Q243 326 270 308Q296 290 316 266H337L365 277L368 296L355 301L337 326L329 329L322 342L314 345L298 368Q272 391 254 419Q236 447 217 475H223L266 449L272 428L285 426Q301 430 316 436Q332 441 345 449L350 467H348V475L318 486V491H309L301 473L277 462L238 507H233L227 517L217 527L180 559ZM551 387 637 363V352L618 339L658 326L665 298H660Q645 305 629 314Q613 322 598 332L583 345H577V350L520 387L517 391H514V397H522Z", "yu": "M376 950Q334 946 298 932Q262 917 235 884Q196 828 164 768Q132 708 90 654H93L113 671V675L146 704Q176 742 199 782Q223 822 251 861Q284 884 320 893Q356 903 398 900Q502 888 609 882Q716 875 808 824Q841 787 870 743Q899 700 907 650L910 671Q904 698 898 724Q893 750 893 781H887L885 806H879Q882 816 878 823Q874 830 871 839H862L858 861L852 872L838 886L829 888L827 894H821V900Q716 933 602 938Q489 942 376 950ZM364 737 320 714 318 706 262 681Q254 671 253 658Q251 646 251 631Q276 549 334 478Q392 406 392 313H386L356 327L353 332L306 357L298 369L248 385Q215 379 181 374Q148 369 121 352L115 332H126L151 338Q218 324 276 289Q334 255 395 224L401 208H406L409 177Q406 147 403 118Q401 89 380 67L353 52L384 50L401 58Q423 86 432 119Q442 152 444 189Q464 191 485 192Q506 193 519 210H517V218H522V224L514 228L500 241L483 247V252L473 255V261L456 266V271L428 296L415 363H419L425 354L547 232H552V228H558V222L614 180V174Q644 152 676 133Q707 114 746 110L765 119L774 160L771 174H765L761 197H755L749 210H740L736 218L705 257H699L691 274H686L666 321L727 390H738Q755 385 772 385Q790 385 808 385L854 404L866 415L871 429L860 468L849 470L846 487L824 509L813 532L800 543L790 559L757 582V573Q777 543 784 508Q790 474 796 437H774L744 449Q740 507 731 561Q721 615 699 665Q691 675 680 678Q669 681 655 679L599 650L597 642L583 637Q581 620 573 606Q566 592 569 573Q572 543 585 518Q597 493 616 470L680 418V406Q666 379 645 353Q624 327 630 290Q653 255 676 220Q699 185 713 147L702 144V149Q669 172 637 197Q605 222 577 249L536 280L533 288L514 299L500 319L489 329H483V335L464 354H459L448 371L428 393H423Q403 446 403 508Q403 570 401 631Q403 656 407 680Q411 704 417 729ZM378 681 380 673 376 629V509L378 466H372Q345 504 319 544Q293 584 287 634L298 662L376 684ZM666 584Q680 557 687 526Q694 495 691 462H680Q666 468 652 479Q639 491 628 504Q620 515 612 529Q605 543 608 559L622 584L647 592Z"};
/* 槌橋泰雅 ポートフォリオ：動き
   見せ場：最初の画面で大字「遊」を草書で一画ずつ書く（墨が飛び、最後に落款）。字は押すともう一度書く。
   そのほか：なめらかなスクロール（Lenis）・節の見出しの朱の一線・図版は襖が開く・筆先のカーソル。
   動きを減らす設定のときは、全部最後の形で止めて見せる。 */
(function(){
  var doc = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  doc.classList.add('js');
  window.__appReady = true;

  /* ---------- アドレスのコピー ---------- */
  var btn = document.getElementById('copy'), mail = document.getElementById('mail');
  if(btn && mail){
    var label = btn.innerHTML;
    btn.addEventListener('click', function(){
      var txt = mail.textContent.trim();
      function done(m){ btn.innerHTML = m; btn.classList.add('done'); setTimeout(function(){ btn.innerHTML = label; btn.classList.remove('done'); }, 1900); }
      function fallback(){
        try{ var r = document.createRange(); r.selectNodeContents(mail); var s = getSelection(); s.removeAllRanges(); s.addRange(r); done('選択<br>しました'); }
        catch(e){ done('手で<br>コピー'); }
      }
      if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function(){ done('コピー<br>しました'); }).catch(fallback);
      else fallback();
    });
  }

  /* ---------- なめらかなスクロール ---------- */
  var lenis = null;
  if(!reduce && window.Lenis){
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
    window.__lenis = lenis;
    (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(0);
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var id = a.getAttribute('href'); var el = id.length > 1 ? document.querySelector(id) : document.body;
        if(!el) return; e.preventDefault(); lenis.scrollTo(el, { offset: id === '#top' ? 0 : -64, duration: 1.4 });
        history.replaceState(null, '', id);
      });
    });
  }
  function onScroll(fn){ if(lenis) lenis.on('scroll', fn); addEventListener('scroll', fn, { passive: true }); fn(); }

  /* ---------- ヘッダーと目次 ---------- */
  var hd = document.querySelector('.hd');
  var navLinks = [].slice.call(document.querySelectorAll('.nav a'));
  var secs = navLinks.map(function(a){ return document.querySelector(a.getAttribute('href')); });
  onScroll(function(){
    var y = scrollY;
    if(hd) hd.classList.toggle('solid', y > 40);
    var cur = -1;
    secs.forEach(function(s, i){ if(s && s.getBoundingClientRect().top < innerHeight * 0.35) cur = i; });
    navLinks.forEach(function(a, i){ a.classList.toggle('on', i === cur); });
  });

  /* ---------- 節の見出しの朱の一線（筆で引いた形） ---------- */
  function brushPath(seed){
    var r = seed, rnd = function(){ r = (r * 9301 + 49297) % 233280; return r / 233280; };
    var n = 24, top = [], bot = [];
    for(var i = 0; i <= n; i++){
      var t = i / n, x = 2 + t * 196;
      var w = (t < .08 ? t / .08 : t > .8 ? Math.max(.12, (1 - t) / .2) : 1) * (5.2 + rnd() * 1.6);
      var c = 8 + Math.sin(t * 2.4 + seed) * 1.2 - t * 1.4;
      top.push(x.toFixed(1) + ' ' + (c - w / 2 - rnd() * .8).toFixed(1));
      bot.unshift(x.toFixed(1) + ' ' + (c + w / 2 + rnd() * .8).toFixed(1));
    }
    return 'M' + top.join(' L') + ' L' + bot.join(' L') + 'Z';
  }
  document.querySelectorAll('.rule').forEach(function(el, i){
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 200 16'); s.setAttribute('preserveAspectRatio', 'none'); s.setAttribute('class', 'rule'); s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<path d="' + brushPath(i * 37 + 11) + '"/>';
    el.replaceWith(s);
  });

  /* ---------- 図版を襖の枠に入れる ---------- */
  document.querySelectorAll('.media figure').forEach(function(f){
    var img = f.querySelector('img'); if(!img || img.parentElement.classList.contains('fr')) return;
    var fr = document.createElement('div'); fr.className = 'fr'; img.replaceWith(fr); fr.appendChild(img);
  });

  /* ---------- 節の扉の大字（薄い墨）。少し遅れて動く ---------- */
  var SG = window.SECTION_GLYPHS || {}, wms = [];
  Object.keys(SG).forEach(function(id){
    var sec = document.getElementById(id); if(!sec || !sec.classList.contains('band')) return;
    var w = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    w.setAttribute('viewBox', '0 0 1000 1000'); w.setAttribute('class', 'wm'); w.setAttribute('aria-hidden', 'true'); w.setAttribute('focusable', 'false');
    w.innerHTML = '<path d="' + SG[id] + '"/>'; sec.insertBefore(w, sec.firstChild); wms.push(w);
  });
  if(!reduce && wms.length) onScroll(function(){
    wms.forEach(function(w){ var r = w.parentNode.getBoundingClientRect(); if(r.bottom < 0 || r.top > innerHeight) return;
      w.style.transform = 'translateY(' + ((r.top - innerHeight * .3) * -0.12).toFixed(1) + 'px)'; });
  });

  /* ---------- 出てくる動き ---------- */
  var revT = [].slice.call(document.querySelectorAll('.work .body, .about .txt, .tl, .ba > h4, .ba > p, .card, .contact, #analysis .in > p, #analysis .in > .links, footer .in'));
  revT.forEach(function(el){ el.classList.add('rev'); });
  document.querySelectorAll('.grid4').forEach(function(g){ [].slice.call(g.children).forEach(function(c, i){ c.style.setProperty('--d', (i * 0.1) + 's'); }); });
  document.querySelectorAll('.media').forEach(function(g){ [].slice.call(g.children).forEach(function(c, i){ c.style.setProperty('--d', (i * 0.14) + 's'); }); });
  var targets = revT.concat([].slice.call(document.querySelectorAll('.sh, .media figure')));
  if(reduce || !('IntersectionObserver' in window)){
    targets.forEach(function(el){ el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    targets.forEach(function(el){ io.observe(el); });
    // 保険：観測が働かない環境では全部見せる
    setTimeout(function(){ if(!targets.some(function(el){ return el.classList.contains('is-visible'); })) targets.forEach(function(el){ el.classList.add('is-visible'); }); }, 3000);
  }

  /* ---------- 年表の墨の線はスクロールに合わせて伸びる ---------- */
  var tl = document.querySelector('.tl');
  if(tl && !reduce) onScroll(function(){
    var r = tl.getBoundingClientRect(), k = (innerHeight * 0.8 - r.top) / r.height;
    tl.style.setProperty('--tlp', Math.max(0, Math.min(1, k)).toFixed(3));
  });

  /* ---------- 数字が数え上がる ---------- */
  function countUp(el){
    var n = parseInt(el.getAttribute('data-count'), 10), suf = el.getAttribute('data-suffix') || '', fin = isFinite(n) ? n.toLocaleString('ja-JP') + suf : el.textContent;
    if(!isFinite(n) || reduce) return;
    var t0 = null, dur = 900;
    (function step(t){ if(t0 === null) t0 = t; var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(n * e).toLocaleString('ja-JP') + suf; if(k < 1) requestAnimationFrame(step); else el.textContent = fin; })(performance.now());
  }

  /* ---------- スクロール演出と墨のカーソル（GSAP・WebGL）は、読み込みが落ち着いてから別のファイルで ---------- */
  (function(){
    var load = function(){ var sc = document.createElement('script'); sc.src = 'assets/motion.js?v=0e58327c'; sc.async = true; document.body.appendChild(sc); };
    var idle = function(){ ('requestIdleCallback' in window) ? requestIdleCallback(load, { timeout: 3000 }) : setTimeout(load, 800); };
    if(document.readyState === 'complete') idle(); else addEventListener('load', idle);
  })();

  /* ---------- 大字「遊」を書く ---------- */
  var G = window.HERO_GLYPH, sho = document.querySelector('.sho');
  var h1 = document.querySelector('h1.vt'), foot = document.querySelector('.hero-foot'), hanko = document.querySelector('.hanko'), hero = document.querySelector('.hero');
  // 見出しを1文字ずつに（<br> は残す）
  if(h1){
    var i = 0, frag = document.createDocumentFragment();
    [].slice.call(h1.childNodes).forEach(function(node){
      if(node.nodeType === 1){ frag.appendChild(node.cloneNode(true)); return; }
      node.textContent.split('').forEach(function(c){
        var sp = document.createElement('span'); sp.className = 'ch'; sp.textContent = c; sp.style.setProperty('--d', (i++ * 0.045) + 's'); frag.appendChild(sp);
      });
    });
    h1.innerHTML = ''; h1.appendChild(frag);
  }
  function finishText(){
    if(h1) h1.classList.add('go');
    if(foot) foot.classList.add('go');
    document.querySelectorAll('.stats [data-count]').forEach(function(el, k){ setTimeout(function(){ countUp(el); }, 350 + k * 90); });
  }
  if(!G || !sho){ finishText(); return; }
  setTimeout(finishText, 9000);   // 保険：演出が途中で止まっても本文は必ず見せる
  var shaku = sho.querySelector('.shaku');

  var NS = 'http://www.w3.org/2000/svg', S = G.size;
  var svg = sho.querySelector('svg');
  svg.setAttribute('viewBox', '0 0 ' + S + ' ' + S);
  var defs = '<defs>' +
    '<filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9"/></filter>' +
    '<filter id="bleed" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="60" result="d"/><feGaussianBlur in="d" stdDeviation="16"/></filter>' +
    '<mask id="yuM" maskUnits="userSpaceOnUse" x="0" y="0" width="' + S + '" height="' + S + '"><rect width="' + S + '" height="' + S + '" fill="#000"/><g id="yuStrokes" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"></g><rect id="yuAll" width="' + S + '" height="' + S + '" fill="#fff" opacity="0"/></mask>' +
    '</defs>';
  svg.innerHTML = defs +
    '<g class="wash" filter="url(#bleed)"><path d="' + G.glyph + '"/></g>' +
    '<path class="glyph" d="' + G.glyph + '" mask="url(#yuM)" filter="url(#rough)"/>';
  var wash = svg.querySelector('.wash'), gStrokes = svg.querySelector('#yuStrokes'), all = svg.querySelector('#yuAll');
  var strokes = G.strokes.map(function(s){
    var p = document.createElementNS(NS, 'path'); p.setAttribute('d', s.d); p.setAttribute('stroke-width', s.w);
    gStrokes.appendChild(p); var L = p.getTotalLength(); p.style.strokeDasharray = L + ' ' + (L + 10); p.style.strokeDashoffset = L;
    return { el: p, L: L, w: s.w };
  });

  /* 墨の飛沫（キャンバス）：飛んで、止まったら紙に残る */
  var cv = sho.querySelector('canvas'), ctx = cv.getContext('2d'), dpr = Math.min(2, devicePixelRatio || 1);
  var stain = document.createElement('canvas'), sctx = stain.getContext('2d');
  var drops = [], leaf = [], W = 0, H = 0, scale = 1, off = 0;
  function size(){
    dpr = Math.min(2, devicePixelRatio || 1);
    var r = cv.getBoundingClientRect(), nw = Math.round(r.width * dpr), nh = Math.round(r.height * dpr);
    if(nw === cv.width && nh === cv.height) return;
    var keep = null;
    if(stain.width){ keep = document.createElement('canvas'); keep.width = stain.width; keep.height = stain.height; keep.getContext('2d').drawImage(stain, 0, 0); }
    W = r.width; H = r.height;
    [cv, stain].forEach(function(c){ c.width = nw; c.height = nh; });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if(keep) sctx.drawImage(keep, 0, 0, W, H);
    scale = (W / 1.44) / S; off = W * (0.22 / 1.44);
    kick();
  }
  size(); addEventListener('resize', size);
  function toPx(x, y){ return [off + x * scale, off + y * scale]; }
  function ink(a){ return 'rgba(27,25,22,' + a + ')'; }
  function splash(x, y, power, dir){
    var n = Math.round(4 + power * 14);
    for(var k = 0; k < n; k++){
      var big = Math.pow(Math.random(), 2.8), ang = (dir != null ? dir + (Math.random() - .5) * 2.2 : Math.random() * 6.283);
      var sp = (1 + Math.random() * 6) * (1.15 - big) * (0.5 + power) * scale * 2;
      drops.push({ x: x, y: y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, r: (0.8 + big * 7.5) * scale * 2.4 * (0.6 + power * .6), life: 0, a: .82 + Math.random() * .18 });
    }
  }
  function stamp(d){
    sctx.fillStyle = ink(d.a);
    var sp = Math.hypot(d.vx, d.vy), ang = Math.atan2(d.vy, d.vx);
    sctx.save(); sctx.translate(d.x, d.y); sctx.rotate(ang);
    sctx.beginPath(); sctx.ellipse(0, 0, d.r * (1 + Math.min(1.6, sp * .05)), d.r * .85, 0, 0, 6.283); sctx.fill();
    if(d.r > 3 && Math.random() < .5){ sctx.beginPath(); sctx.arc(d.r * 1.4, d.r * .3, d.r * .35, 0, 6.283); sctx.fill(); }
    sctx.restore();
  }
  for(var q = 0; q < 6; q++) leaf.push({ x: Math.random(), y: Math.random(), s: 1.2 + Math.random() * 2, rot: Math.random() * 6, vr: (Math.random() - .5) * .01, vy: .00004 + Math.random() * .00008, ph: Math.random() * 6, on: 0 });
  var running = false, heroVisible = true;
  if('IntersectionObserver' in window) new IntersectionObserver(function(es){ heroVisible = es[0].isIntersecting; if(heroVisible) kick(); }).observe(hero || sho);
  function frame(){
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(stain, 0, 0, W, H);
    for(var k = drops.length - 1; k >= 0; k--){
      var d = drops[k]; d.life++; d.x += d.vx; d.y += d.vy; d.vx *= .86; d.vy = d.vy * .86 + .05 * scale;
      if(Math.hypot(d.vx, d.vy) < .25 || d.life > 50){ stamp(d); drops.splice(k, 1); continue; }
      ctx.fillStyle = ink(d.a); ctx.beginPath(); ctx.arc(d.x, d.y, d.r * .8, 0, 6.283); ctx.fill();
    }
    // 金箔：ゆっくり漂う
    var t = performance.now() / 1000;
    leaf.forEach(function(l){
      if(l.on <= 0) return; l.y -= l.vy * 16; l.rot += l.vr; if(l.y < -.05) l.y = 1.05;
      var x = l.x * W, y = l.y * H, a = l.on * (.35 + .25 * Math.sin(t * 1.3 + l.ph));
      ctx.save(); ctx.translate(x + Math.sin(t * .6 + l.ph) * 8, y); ctx.rotate(l.rot); var ls = Math.min(1, W / 900); ctx.scale(ls, ls);
      ctx.fillStyle = 'rgba(168,135,58,' + a.toFixed(3) + ')';
      ctx.beginPath(); ctx.moveTo(-l.s, -l.s * .4); ctx.lineTo(l.s * .7, -l.s * .7); ctx.lineTo(l.s, l.s * .3); ctx.lineTo(-l.s * .3, l.s * .8); ctx.closePath(); ctx.fill(); ctx.restore();
    });
    if(running || drops.length || (heroVisible && leaf.some(function(l){ return l.on > 0; }))) requestAnimationFrame(frame); else frameOn = false;
  }
  var frameOn = false;
  function kick(){ if(!frameOn){ frameOn = true; requestAnimationFrame(frame); } }

  function ease(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  var playId = 0, speed = 1;
  try{ if(localStorage.getItem('yuSeen')) speed = 2.6; localStorage.setItem('yuSeen', '1'); }catch(e){}
  function play(){
    var id = ++playId; running = true; kick();
    if(hanko) hanko.classList.remove('on');
    if(shaku) shaku.classList.remove('on');
    all.style.transition = 'none'; all.setAttribute('opacity', '0');
    strokes.forEach(function(s){ s.el.style.strokeDashoffset = s.L; });
    sctx.clearRect(0, 0, W, H); drops.length = 0;
    wash.style.transition = 'none'; wash.style.opacity = 0;
    leaf.forEach(function(l){ l.on = 0; });
    var k = 0;
    function next(){
      if(id !== playId) return;
      if(k >= strokes.length){ return end(); }
      var s = strokes[k], dur = (260 + s.L * 0.9) / speed, t0 = performance.now(), start = s.el.getPointAtLength(0), p0 = toPx(start.x, start.y);
      var pa = s.el.getPointAtLength(Math.min(s.L, 30)), dir0 = Math.atan2(pa.y - start.y, pa.x - start.x) + Math.PI;
      splash(p0[0], p0[1], k === 0 ? .6 : .5, dir0);   // 打ち込み：筆を置いた所から、来た向きへ墨が散る
      (function step(now){
        if(id !== playId) return;
        var u = Math.min(1, (now - t0) / dur), e = ease(u), len = s.L * e;
        s.el.style.strokeDashoffset = (s.L - len).toFixed(1);
        var pt = s.el.getPointAtLength(len), px = toPx(pt.x, pt.y);
        if(Math.random() < .06) splash(px[0], px[1], .02, null);       // 筆先のしぶき（まれに）
        if(u < 1) requestAnimationFrame(step);
        else { var pe = s.el.getPointAtLength(s.L), pb = s.el.getPointAtLength(Math.max(0, s.L - 30));
          splash(toPx(pe.x, pe.y)[0], toPx(pe.x, pe.y)[1], .35, Math.atan2(pe.y - pb.y, pe.x - pb.x));   // 払い
          k++; setTimeout(next, 70 / speed); }
      })(t0);
    }
    function end(){
      all.style.transition = 'opacity .5s'; all.setAttribute('opacity', '1');       // 筆が届かなかった細部も最後に現れる
      wash.style.transition = 'opacity 1.6s ease-out'; wash.style.opacity = .13;
      setTimeout(function(){
        if(id !== playId) return;
        if(hanko){ hanko.classList.add('on'); }
        if(hero){ hero.classList.remove('shake'); void hero.offsetWidth; hero.classList.add('shake'); }
        var hb = hanko ? hanko.getBoundingClientRect() : null, cb = cv.getBoundingClientRect();
        if(hb){ var hx = hb.left + hb.width / 2 - cb.left, hy = hb.top + hb.height / 2 - cb.top; splash(hx, hy, .25, null); }
        leaf.forEach(function(l, j){ setTimeout(function(){ if(id !== playId) return; l.on = 1; kick(); }, 200 + j * 90); });
        if(shaku) shaku.classList.add('on');
        running = false; kick();
        finishText();
      }, 260);
    }
    setTimeout(next, 450 / speed);
  }
  if(reduce){
    strokes.forEach(function(s){ s.el.style.strokeDashoffset = 0; }); all.setAttribute('opacity', '1'); wash.style.opacity = .13;
    if(hanko) hanko.classList.add('on'); if(shaku) shaku.classList.add('on'); finishText();
  } else {
    var started = false;
    function go(){ if(started) return; started = true; try{ play(); }catch(e){ all.setAttribute('opacity', '1'); finishText(); } }
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(go); setTimeout(go, 1200);
  }
  sho.addEventListener('click', function(){ if(!reduce) play(); });

  /* 字はスクロールで少し遅れて上がり、薄れる */
  if(!reduce) onScroll(function(){
    var y = scrollY, h = innerHeight;
    if(y > h * 1.2) return;
    sho.style.transform = 'translateY(' + (y * 0.18).toFixed(1) + 'px)';
    sho.style.opacity = Math.max(0, 1 - y / (h * 0.9)).toFixed(3);
  });

  /* ---------- カーソル：筆先と、すぐ消える墨の跡 ---------- */
  if(fine && !reduce){
    var tr = document.createElement('canvas'); tr.id = 'trail'; tr.setAttribute('aria-hidden', 'true');
    var tip = document.createElement('div'); tip.className = 'tip'; tip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tr); document.body.appendChild(tip);
    var tc = tr.getContext('2d'), pts = [], mx = -99, my = -99, lastT = 0, live = false;
    function tsize(){ dpr = Math.min(2, devicePixelRatio || 1); tr.width = innerWidth * dpr; tr.height = innerHeight * dpr; tc.setTransform(dpr, 0, 0, dpr, 0, 0); }
    tsize(); addEventListener('resize', tsize);
    addEventListener('pointermove', function(e){
      if(e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY; tip.style.transform = 'translate(' + mx + 'px,' + my + 'px)'; tip.classList.add('on');
      var t = e.target && e.target.closest ? e.target.closest('a,button') : null; tip.classList.toggle('hot', !!t);
      var now = performance.now(), last = pts[pts.length - 1];
      var v = last ? Math.hypot(mx - last.x, my - last.y) / Math.max(1, now - last.t) : 0;
      pts.push({ x: mx, y: my, t: now, w: Math.max(1.2, 7 - v * 3.2) });
      if(!live){ live = true; requestAnimationFrame(draw); }
    }, { passive: true });
    document.addEventListener('pointerleave', function(){ tip.classList.remove('on'); });
    function draw(now){
      tc.clearRect(0, 0, innerWidth, innerHeight);
      while(pts.length && now - pts[0].t > 520) pts.shift();
      for(var k = 1; k < pts.length; k++){
        var a = pts[k - 1], b = pts[k], age = 1 - (now - b.t) / 520;
        tc.strokeStyle = 'rgba(27,25,22,' + (age * 0.22).toFixed(3) + ')'; tc.lineWidth = b.w * age; tc.lineCap = 'round';
        tc.beginPath(); tc.moveTo(a.x, a.y); tc.lineTo(b.x, b.y); tc.stroke();
      }
      if(pts.length > 1) requestAnimationFrame(draw); else { live = false; tc.clearRect(0, 0, innerWidth, innerHeight); }
    }
  }
})();
