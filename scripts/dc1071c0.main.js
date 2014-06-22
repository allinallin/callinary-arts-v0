"use strict";var app=app||{ui:{emailModal:{}},trivia:{mta:{}},security:{}};app.security.decodeAddress=function(a){var b=a.replace(/[a-zA-Z]/g,function(a){return String.fromCharCode(("Z">=a?90:122)>=(a=a.charCodeAt(0)+13)?a:a-26)}),c=b.replace(/~/g,"@"),d=c.replace(/`/g,".");return d},app.ui.emailModal.show=function(a){var b=$(".modal"),c=$("input",b),d=$("a",b);b.addClass("active"),c.val(a).select(),d.attr("href","mailto:"+a)},app.ui.emailModal.hide=function(){var a=$(".modal");a.removeClass("active")},$(function(){"?goto=projects"===location.search&&app.ui.scrollTo("#projects"),$("[data-scroll-to]").on("click",function(a){a.preventDefault(),app.ui.scrollTo(this.getAttribute("data-scroll-to"));var b=$(a.target);if(b.hasClass("button")){var c=b.text(),d="Wooo yeah!";b.text(d),setTimeout(function(){b.text(c)},600)}}),$(function(){$("img.lazy").length&&$("img.lazy").show().lazyload({threshold:500,effect:"fadeIn"})}),$("[data-email-modal-toggle]").on("click",function(){var a=$(this).attr("data-email-modal-toggle"),b=app.security.decodeAddress(a);app.ui.emailModal.show(b)}),$(".modal").on("click","input",function(){$(this).select()}),$(".background-overlay, .icon",".modal").on("click",function(){app.ui.emailModal.hide()}),$(document).keyup(function(a){27===a.keyCode&&app.ui.emailModal.hide()})}),app.ui.scrollTo=function(a){var b=$(a),c=b.offset().top;$("html,body").animate({scrollTop:c},600,"easeInQuad")},app.ui.greeting=function(){function a(){b(d>=17?"Good evening!":d>=12?"Good afternoon!":d>=5?"Good morning!":"Hello there!")}function b(a){document.querySelector(".greeting").innerHTML=a}var c=new Date,d=c.getHours();return{init:a}}(),$("body").hasClass("page-home")&&app.ui.greeting.init(),app.trivia.mta=function(){function a(a){var b=a.value.toString().toUpperCase(),g=c.indexOf(b);b.length&&g>-1&&(e[g].innerHTML=b,e[g].setAttribute("data-color",d[g]),a.value="",f.setAttribute("data-animation",!1))}function b(){c="1234567ACEBDFMGJZLSNQR",d=["red","red","red","green","green","green","purple","blue","blue","blue","orange","orange","orange","orange","lime","brown","brown","gray","gray","yellow","yellow","yellow"]}var c,d,e=document.querySelectorAll(".mta .circle"),f=document.querySelector(".mta .circles");return{init:b,checkInput:a}}(),$("body").hasClass("page-home")&&app.trivia.mta.init(),app.trivia.offRoad=function(){function a(a){var b=c[a.toLowerCase()];void 0!==b&&f.text(b.description).addClass("active").attr("data-valid",b.value)}function b(){c={a:{value:!1,description:"NOPE. Rice was made in China."},b:{value:!1,description:"NOPE. Noodles were made in China."},c:{value:!0,description:"YES! Fortune cookies have origins in Japan and were first produced in California."},d:{value:!1,description:"NOPE. The first alcoholic beverage was found in China."}},$("input",d).on("change",function(){e.removeClass("checked"),$(this).closest(".button").addClass("checked"),a($(this).val())})}var c,d=$(".trivia.off-road"),e=$(".button",d),f=$(".message",d);return{init:b}}(),$("body").hasClass("page-home")&&app.trivia.offRoad.init();var app=app||{ui:{emailModal:{}},trivia:{mta:{}},security:{}},gearSvg='<svg version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="120.1px" height="120.1px" viewBox="0 0 120.1 120.1" style="enable-background:new 0 0 120.1 120.1;" xml:space="preserve" ><style type="text/css"><![CDATA[ .st0{opacity:0.3;fill:#FFFFFF;}.st1{clip-path:url(#SVGID_2_);fill:#8FB7F7;}]]></style><g><defs><path id="SVGID_1_" d="M117.1,65.1c-2.7,31.4-30.4,54.7-61.8,52c-31.4-2.7-54.7-30.4-52-61.8C6,23.9,33.7,0.6,65.1,3.3 C96.6,6,119.9,33.7,117.1,65.1z"/></defs><clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_" style="overflow:visible;"/></clipPath><path class="st1" d="M101,72.4c-6.7,22.5-30.4,35.4-53,28.6c-22.5-6.7-35.3-30.4-28.6-53c6.7-22.5,30.4-35.4,53-28.6 C94.9,26.1,107.8,49.9,101,72.4z"/><polygon class="st1" points="66.6,-13.5 77.3,27.4 116.8,12.6 95.5,49.1 133.9,66.6 93.1,77.3 107.9,116.9 71.4,95.5 53.9,133.9 43.2,93.1 3.6,107.9 25,71.4 -13.5,53.9 27.4,43.2 12.6,3.6 49.1,25 "/></g><path class="st0" d="M117.3,63.1c0-1.4,0-2.8-0.1-4.1L102,52c-0.6-3.2-1.6-6.2-2.9-9.1l5.4-9.2C99.1,29,92.4,26,84.9,25.4 c-19.5-1.7-36.8,13.5-38.5,33.7c-1.7,20.3,12.7,38.1,32.3,39.7c7.5,0.6,14.6-1.2,20.7-4.8l-3.7-10c1.8-2.6,3.2-5.5,4.4-8.5l16.2-4.2 c0.3-1.3,0.6-2.6,0.8-4c0.1-0.7,0.2-1.3,0.2-2c0,0,0-0.1,0-0.1C117.2,64.4,117.2,63.8,117.3,63.1z"/></svg>';app.ui.physicsEngine=function(){function a(){Physics({timestep:4},function(a){function b(){i=window.innerWidth,j=window.innerHeight,l=i*j;var b=i>p?n:o,d=a._bodies.length;if(h.el.width=i,h.el.height=j,m=k>l&&i>p?Physics.aabb(0,0,i,k/i):Physics.aabb(0,0,i,j),g.setAABB(m),d>b)for(var e=d;e>=b;e--)a.removeBody(a._bodies[e]);else b>d&&(clearInterval(r),f());if(d>=b)for(var e=a._bodies.length-1;e>=0;e--){var q=a._bodies[e];q.treatment="dynamic",c(q)}}function c(a){setTimeout(function(){a.treatment="static"},1e4)}function d(a,b){return Math.random()*(b-a)+a|0}function e(){var b;switch(d(0,2)){case 0:b=Physics.body("circle",{x:.9*i,y:50,vx:d(-5,5)/100,vy:d(0,5)/10,mass:2,angle:d(0,2*Math.PI),radius:50,restitution:.3,styles:{fillStyle:"#268bd2",angleIndicator:"#155479"},angularVelocity:d(-5,5)/1e3,view:v[d(0,v.length)]});break;case 1:b=Physics.body("convex-polygon",{vertices:s,x:.9*i,y:0,vx:d(-5,5)/100,vy:d(0,5)/10,mass:2,angle:d(0,2*Math.PI),restitution:.3,styles:{fillStyle:"#859900",angleIndicator:"#414700"},angularVelocity:d(-5,5)/1e3,view:w[d(0,w.length)]})}a.add(b),setTimeout(function(){b.treatment="static"},1e4)}function f(){r=setInterval(function(){var b=i>p?n:o;a._bodies.length>b-2&&clearInterval(r),e()},1e3)}var g,h,i=window.innerWidth,j=window.innerHeight,k=344400,l=i*j,m=Physics.aabb(0,0,i,j),n=20,o=10,p=768,q=null,r=null;k>l&&i>p&&(m=Physics.aabb(0,0,i,k/i)),h=Physics.renderer("canvas",{el:"fizzx",width:i,height:j}),a.add(h),a.on("step",function(){a.render()}),g=Physics.behavior("edge-collision-detection",{aabb:m,restitution:.2,cof:.8}),window.addEventListener("resize",function(){q&&clearTimeout(q),q=setTimeout(b,100)},!0);var s=[{x:0,y:97},{x:56,y:0},{x:112,y:97}],t=(document.querySelector(".gearBlue"),document.querySelector(".gearRed"),document.querySelector(".gearGreen"),document.querySelector(".gearPurple"),document.querySelector(".gearYellow")),u=(document.querySelector(".triangleGreen"),document.querySelector(".triangleRed"),document.querySelector(".triangleBlue"),document.querySelector(".trianglePurple"),document.querySelector(".triangleYellow")),v=[t],w=[u];f();var x=Physics.behavior("attractor",{order:0,strength:.002});a.on({"interact:poke":function(b){x.position(b),a.add(x)},"interact:move":function(a){x.position(a)},"interact:release":function(){a.remove(x)}}),a.add([Physics.behavior("interactive",{el:h.el}),Physics.behavior("constant-acceleration"),Physics.behavior("body-impulse-response"),Physics.behavior("body-collision-detection"),Physics.behavior("sweep-prune"),g]),Physics.util.ticker.on(function(b){a.step(b)}),Physics.util.ticker.start()})}return{init:a}}(),window.onload=function(){app.ui.physicsEngine.init()};