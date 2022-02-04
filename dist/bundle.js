(()=>{"use strict";var e={426:(e,n,t)=>{t.d(n,{Z:()=>s});var r=t(81),a=t.n(r),o=t(645),i=t.n(o)()(a());i.push([e.id,".hello {\n    color: red;\n}\n\n.cell {\n    width: 20px;\n    height: 20px;\n    border: 1px solid;\n}\n\n.board {\n    height: 220px;\n    width: 220px;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n}\n\nbody, html {\n    margin: 0;\n    height: 100%;\n}\n\n#boards {\n    width: 100%;\n    margin-top: 5%;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: space-evenly;\n    align-items: center;\n    flex-wrap: wrap;\n}\n\nbody {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.board-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n#my-board-data {\n    display: flex;\n    align-items: center;\n}\n\n/*Axis block editing*/\n#axis {\n    display: flex;\n    justify-content: center;\n\n    width: 100%;\n\n    cursor: pointer;\n}\n\n#axis-name {\n    margin-right: 20px;\n}",""]);const s=i},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,a,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);r&&i[u[0]]||(void 0!==o&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=o),t&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=t):u[2]=t),a&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=a):u[4]="".concat(a)),n.push(u))}},n}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var o={},i=[],s=0;s<e.length;s++){var c=e[s],l=r.base?c[0]+r.base:c[0],u=o[l]||0,d="".concat(l," ").concat(u);o[l]=u+1;var f=t(d),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==f)n[f].references++,n[f].updater(p);else{var v=a(p,r);r.byIndex=s,n.splice(s,0,{identifier:d,updater:v,references:1})}i.push(d)}return i}function a(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,a){var o=r(e=e||[],a=a||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var s=t(o[i]);n[s].references--}for(var c=r(e,a),l=0;l<o.length;l++){var u=t(o[l]);0===n[u].references&&(n[u].updater(),n.splice(u,1))}o=c}}},569:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var a=void 0!==t.layer;a&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,a&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var o=t.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(r){var a=n[r];if(void 0!==a)return a.exports;var o=n[r]={id:r,exports:{}};return e[r](o,o.exports,t),o.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e=function(){for(var e=[],n=[],t=0;t<10;t++){n[t]=[];for(var r=0;r<10;r++)n[t][r]=0}var a={status:"on"};return{board:n,ships:e,placeShip:function(t,r,a){if(e.push(function(e,n,t){var r={value:0},a={};if(a[0]=t,"x"===n.value&&e>1)for(var o=1;o<=e;o++)a[o]={x:t.x+o,y:t.y};else if("y"===n.value&&e>1)for(var i=1;i<=e;i++)a[i]={x:t.x,y:t.y+i};var s={value:!1},c=function(){r.value===e&&(s.value=!0)};return{length:e,injuredDecks:r,coordinatesOnBoard:a,sunkStatus:s,hit:function(){r.value+=1,c()},isSunk:c}}(t,r,a)),"y"===r.value)for(var o=a.y,i=0;i<t;o++,i++)n[a.x][o]=1;else if("x"===r.value)for(var s=a.x,c=0;c<t;s++,c++)n[s][a.y]=1},recieveAttack:function(t){if(1===n[t.x][t.y]){n[t.x][t.y]=2;for(var r=0;r<e.length;r++)for(var o=0;o<Object.keys(e[r].coordinatesOnBoard).length;o++)if(e[r].coordinatesOnBoard[o].x===t.x&&e[r].coordinatesOnBoard[o].y===t.y){e[r].hit();break}!function(){a.status="off";for(var n=0;n<e.length;n++)if(!1===e[n].sunkStatus.value){a.status="on";break}}()}else n[t.x][t.y]=3},gameStatus:a}},n=function(e,n,t){for(var r=0;r<e.length;r++)for(var a=0;a<e[r].length;a++){var o=document.createElement("div");o.classList.add("cell"),o.classList.add(t),o.innerHTML=e[r][a],o.id=10*r+a,n.appendChild(o)}},r=function(e,n,t){e.addEventListener(n,(function(){e.style.background=t}))},a=t(379),o=t.n(a),i=t(795),s=t.n(i),c=t(569),l=t.n(c),u=t(565),d=t.n(u),f=t(216),p=t.n(f),v=t(589),y=t.n(v),m=t(426),h={};h.styleTagTransform=y(),h.setAttributes=d(),h.insert=l().bind(null,"head"),h.domAPI=s(),h.insertStyleElement=p(),o()(m.Z,h),m.Z&&m.Z.locals&&m.Z.locals;var x=document.getElementById("game-board");n(e().board,x,"my-board");var g,b,w,E=document.getElementById("enemy-game-board");n(e().board,E,"enemy-board"),document.querySelectorAll(".my-board").forEach((function(e){r(e,"mouseover","yellow"),r(e,"mouseout","white")})),g=0,b=document.getElementById("axis"),w=document.getElementById("axis-value"),b.addEventListener("click",(function(){g%2==0?w.innerHTML="x":g%2!=0&&(w.innerHTML="y"),g+=1}))})()})();