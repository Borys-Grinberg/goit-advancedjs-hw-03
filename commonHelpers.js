import{a as d,S as h}from"./assets/vendor-3fb2cdeb.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const y="live_7zO2UtHss6WanH1oLQ1vnbzQS31rHHFk6zvi69lyordiqDagXpIxykJooBldDqh8";d.defaults.headers.common["x-api-key"]=y;function g(){return new Promise((r,e)=>{d.get("https://api.thecatapi.com/v1/breeds").then(o=>r(o.data)).catch(o=>e(o))})}function v(r){return new Promise((e,o)=>{const s=`https://api.thecatapi.com/v1/images/search?breed_ids=${r}`;d.get(s).then(t=>e(t.data)).catch(t=>o(t))})}const l=document.querySelector(".breed-select"),u=document.querySelector(".cat-info"),f=document.querySelector(".loader");let c;const m=new h({select:l});m.setData([]);l.addEventListener("change",function(){c=l.value,b(),(c?v(c):Promise.resolve()).then(e=>{if(e&&Array.isArray(e)&&e.length>0&&e[0].breeds&&e[0].breeds.length>0){const o=e[0].breeds[0];u.innerHTML=`
          <div class="cat-info-inner">
            <img src="${e[0].url}" alt="Cat Image" class="cat-image">
            <div class="cat-details">
              <h2>${o.name}</h2>
              <p class="description">${o.description}</p>
              <p><strong>Temperament:</strong> ${o.temperament}</p>
            </div>
          </div>
        `}else a("Oops! Unable to retrieve cat information. Please try again.")}).catch(e=>{console.error("Error:",e),a("Oops! Something went wrong! Try reloading the page!")}).finally(()=>{p()})});function b(){f.style.display="inline-block",u.style.display="none"}function p(){f.style.display="none",u.style.display="flex"}function a(r){iziToast.error({title:"Error",message:r,position:"topRight",timeout:5e3})}g().then(r=>{m.setData(r.map(e=>({text:e.name,value:e.id}))),p()}).catch(r=>{console.error("Error:",r),a("Oops! Something went wrong! Try reloading the page!")});
//# sourceMappingURL=commonHelpers.js.map