import{r as e}from"./vendor-e28a5b6f.js";let t,r,a,o={data:""},i=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||o,s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",a="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?d(s,i):i+"{"+d(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=d(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=d.p?d.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},u=(e,t,r,a,o)=>{let i=p(e),u=c[i]||(c[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!c[u]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=s.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);c[u]=d(o?{["@keyframes "+u]:t}:t,r?"":"."+u)}let m=r&&c.g?c.g:null;return r&&(c.g=c[u]),((e,t,r,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(c[u],t,a,m),u};function m(e){let t=this||{},r=e.call?e(t.p):e;return u(r.unshift?r.raw?((e,t,r)=>e.reduce((e,a,o)=>{let i=t[o];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},""))(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,i(t.target),t.g,t.o,t.k)}m.bind({g:1});let f=m.bind({k:1});function y(e,o){let i=this||{};return function(){let s=arguments;function n(l,d){let c=Object.assign({},l),p=c.className||n.className;i.p=Object.assign({theme:r&&r()},c),i.o=/ *go\d+/.test(p),c.className=m.apply(i,s)+(p?" "+p:""),o&&(c.ref=d);let u=e;return e[0]&&(u=c.as||e,delete c.as),a&&u[0]&&a(c),t(u,c)}return o?o(n):n}}var g=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,h=(()=>{let e=0;return()=>(++e).toString()})(),b=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),v=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return v(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},x=[],w={toasts:[],pausedAt:void 0},E=e=>{w=v(w,e),x.forEach(e=>{e(w)})},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},k=e=>(t,r)=>{let a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||h()}))(t,e,r);return E({type:2,toast:a}),a.id},D=(e,t)=>k("blank")(e,t);D.error=k("error"),D.success=k("success"),D.loading=k("loading"),D.custom=k("custom"),D.dismiss=e=>{E({type:3,toastId:e})},D.remove=e=>E({type:4,toastId:e}),D.promise=(e,t,r)=>{let a=D.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?g(t.success,e):void 0;return o?D.success(o,{id:a,...r,...null==r?void 0:r.success}):D.dismiss(a),e}).catch(e=>{let o=t.error?g(t.error,e):void 0;o?D.error(o,{id:a,...r,...null==r?void 0:r.error}):D.dismiss(a)}),e};var O=(e,t)=>{E({type:1,toast:{id:e,height:t}})},j=()=>{E({type:5,time:Date.now()})},C=new Map,N=t=>{let{toasts:r,pausedAt:a}=((t={})=>{let[r,a]=e.useState(w),o=e.useRef(w);e.useEffect(()=>(o.current!==w&&a(w),x.push(a),()=>{let e=x.indexOf(a);e>-1&&x.splice(e,1)}),[]);let i=r.toasts.map(e=>{var r,a,o;return{...t,...t[e.type],...e,removeDelay:e.removeDelay||(null==(r=t[e.type])?void 0:r.removeDelay)||(null==t?void 0:t.removeDelay),duration:e.duration||(null==(a=t[e.type])?void 0:a.duration)||(null==t?void 0:t.duration)||$[e.type],style:{...t.style,...null==(o=t[e.type])?void 0:o.style,...e.style}}});return{...r,toasts:i}})(t);e.useEffect(()=>{if(a)return;let e=Date.now(),t=r.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(r<0))return setTimeout(()=>D.dismiss(t.id),r);t.visible&&D.dismiss(t.id)});return()=>{t.forEach(e=>e&&clearTimeout(e))}},[r,a]);let o=e.useCallback(()=>{a&&E({type:6,time:Date.now()})},[a]),i=e.useCallback((e,t)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:i}=t||{},s=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[r]);return e.useEffect(()=>{r.forEach(e=>{if(e.dismissed)((e,t=1e3)=>{if(C.has(e))return;let r=setTimeout(()=>{C.delete(e),E({type:4,toastId:e})},t);C.set(e,r)})(e.id,e.removeDelay);else{let t=C.get(e.id);t&&(clearTimeout(t),C.delete(e.id))}})},[r]),{toasts:r,handlers:{updateHeight:O,startPause:j,endPause:o,calculateOffset:i}}},z=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,A=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,I=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,P=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${A} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,T=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,F=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,H=f`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,S=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${H} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,_=y("div")`
  position: absolute;
`,L=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,R=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${R} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:t})=>{let{icon:r,type:a,iconTheme:o}=t;return void 0!==r?"string"==typeof r?e.createElement(U,null,r):r:"blank"===a?null:e.createElement(L,null,e.createElement(T,{...o}),"loading"!==a&&e.createElement(_,null,"error"===a?e.createElement(P,{...o}):e.createElement(S,{...o})))},B=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,Y=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,Z=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,G=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,J=e.memo(({toast:t,position:r,style:a,children:o})=>{let i=t.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,o]=b()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[B(r),Y(r)];return{animation:t?`${f(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||r||"top-center",t.visible):{opacity:0},s=e.createElement(q,{toast:t}),n=e.createElement(G,{...t.ariaProps},g(t.message,t));return e.createElement(Z,{className:t.className,style:{...i,...a,...t.style}},"function"==typeof o?o({icon:s,message:n}):e.createElement(e.Fragment,null,s,n))});!function(e,o,i,s){d.p=o,t=e,r=i,a=s}(e.createElement);var K=({id:t,className:r,style:a,onHeightUpdate:o,children:i})=>{let s=e.useCallback(e=>{if(e){let r=()=>{let r=e.getBoundingClientRect().height;o(t,r)};r(),new MutationObserver(r).observe(e,{subtree:!0,childList:!0,characterData:!0})}},[t,o]);return e.createElement("div",{ref:s,className:r,style:a},i)},Q=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,V=({reverseOrder:t,position:r="top-center",toastOptions:a,gutter:o,children:i,containerStyle:s,containerClassName:n})=>{let{toasts:l,handlers:d}=N(a);return e.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(a=>{let s=a.position||r,n=((e,t)=>{let r=e.includes("top"),a=r?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:b()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...a,...o}})(s,d.calculateOffset(a,{reverseOrder:t,gutter:o,defaultPosition:r}));return e.createElement(K,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?Q:"",style:n},"custom"===a.type?g(a.message,a):i?i(a):e.createElement(J,{toast:a,position:s}))}))};export{V as O};
