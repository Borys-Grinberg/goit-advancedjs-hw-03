import{a as d,S as m,i as h}from"./assets/vendor-f43a0b7f.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();d.defaults.headers.common["x-api-key"]="live_7zO2UtHss6WanH1oLQ1vnbzQS31rHHFk6zvi69lyordiqDagXpIxykJooBldDqh8";function l(){s(".loader")}function u(){c(".loader")}function s(e){document.querySelector(e).classList.remove("hidden")}function c(e){document.querySelector(e).classList.add("hidden")}function f(){s(".error"),setTimeout(()=>{c(".error")},5e3)}function p(){return l(),c(".cat-info"),c(".error"),d.get("https://api.thecatapi.com/v1/breeds").then(e=>(u(),s(".breed-select"),new m({select:".breed-select",placeholder:"Select a breed",data:e.data.map(o=>({text:o.name,value:o.id}))}),e.data)).catch(e=>{throw console.error("Error fetching cat breeds:",e),f(),e})}function y(e){l(),c(".breed-select"),c(".cat-info"),c(".error");const o=`https://api.thecatapi.com/v1/images/search?breed_ids=${e}`;return d.get(o).then(n=>(u(),s(".cat-info"),n.data)).catch(n=>{throw console.error("Error fetching cat by breed:",n),f(),n})}document.addEventListener("DOMContentLoaded",async function(){const e=document.querySelector(".breed-select"),o=document.querySelector(".cat-info"),n=document.querySelector(".loader");try{const i=await p();e.addEventListener("change",async function(){const t=e.value;n.style.display="inline-block";const r=await y(t);n.style.display="none",o.innerHTML=`
        <img src="${r[0].url}" alt="Cat Image" class="cat-image">
        <div class="cat-details">
          <h2>${r[0].breeds[0].name}</h2>
          <p class="description">${r[0].breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${r[0].breeds[0].temperament}</p>
        </div>
      `})}catch(i){console.error("Error:",i),g("Oops! Something went wrong! Try reloading the page!")}});function g(e){h.error({title:"Error",message:e,position:"topRight",timeout:5e3})}
//# sourceMappingURL=commonHelpers.js.map