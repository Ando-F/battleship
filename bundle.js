(()=>{"use strict";var e={426:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(81),o=n.n(r),a=n(645),i=n.n(a)()(o());i.push([e.id,".hello {\n    color: red;\n}\n\n.cell {\n    width: 20px;\n    height: 20px;\n    border: 1px solid;\n}\n\n.board {\n    height: 220px;\n    width: 220px;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n}\n\nbody, html {\n    margin: 0;\n    height: 100%;\n}\n\n#boards {\n    width: 100%;\n    margin-top: 5%;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: space-evenly;\n    align-items: center;\n    flex-wrap: wrap;\n}\n\nbody {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.board-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}",""]);const s=i},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);r&&i[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),t.push(u))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},i=[],s=0;s<e.length;s++){var c=e[s],l=r.base?c[0]+r.base:c[0],u=a[l]||0,d="".concat(l," ").concat(u);a[l]=u+1;var f=n(d),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==f)t[f].references++,t[f].updater(p);else{var v=o(p,r);r.byIndex=s,t.splice(s,0,{identifier:d,updater:v,references:1})}i.push(d)}return i}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var s=n(a[i]);t[s].references--}for(var c=r(e,o),l=0;l<a.length;l++){var u=n(a[l]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}a=c}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,exports:{}};return e[r](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const e=()=>{const e=[];let t=[];for(let e=0;e<10;e++){t[e]=[];for(let n=0;n<10;n++)t[e][n]=0}let n={status:"on"};return{board:t,ships:e,placeShip:(n,r,o)=>{if(e.push(((e,t,n)=>{let r={value:0},o={};if(o[0]=n,"x"===t.value&&e>1)for(let t=1;t<=e;t++)o[t]={x:n.x+t,y:n.y};else if("y"===t.value&&e>1)for(let t=1;t<=e;t++)o[t]={x:n.x,y:n.y+t};let a={value:!1};const i=()=>{r.value===e&&(a.value=!0)};return{length:e,injuredDecks:r,coordinatesOnBoard:o,sunkStatus:a,hit:()=>{r.value+=1,i()},isSunk:i}})(n,r,o)),"y"===r.value)for(let e=o.y,r=0;r<n;e++,r++)t[o.x][e]=1;else if("x"===r.value)for(let e=o.x,r=0;r<n;e++,r++)t[e][o.y]=1},recieveAttack:r=>{if(1===t[r.x][r.y]){t[r.x][r.y]=2;for(let t=0;t<e.length;t++)for(let n=0;n<Object.keys(e[t].coordinatesOnBoard).length;n++)if(e[t].coordinatesOnBoard[n].x===r.x&&e[t].coordinatesOnBoard[n].y===r.y){e[t].hit();break}(()=>{n.status="off";for(let t=0;t<e.length;t++)if(!1===e[t].sunkStatus.value){n.status="on";break}})()}else t[r.x][r.y]=3},gameStatus:n}},t=(e,t,n)=>{for(let r=0;r<e.length;r++)for(let o=0;o<e[r].length;o++){const a=document.createElement("div");a.classList.add("cell"),a.classList.add(n),a.innerHTML=e[r][o],a.id=10*r+o,t.appendChild(a)}},r=(e,t,n)=>{e.addEventListener(t,(()=>{e.style.background=n}))};var o=n(379),a=n.n(o),i=n(795),s=n.n(i),c=n(569),l=n.n(c),u=n(565),d=n.n(u),f=n(216),p=n.n(f),v=n(589),y=n.n(v),h=n(426),m={};m.styleTagTransform=y(),m.setAttributes=d(),m.insert=l().bind(null,"head"),m.domAPI=s(),m.insertStyleElement=p(),a()(h.Z,m),h.Z&&h.Z.locals&&h.Z.locals;const x=document.getElementById("game-board");t(e().board,x,"my-board");const g=document.getElementById("enemy-game-board");t(e().board,g,"enemy-board"),document.querySelectorAll(".my-board").forEach((e=>{r(e,"mouseover","yellow"),r(e,"mouseout","white")}))})()})();