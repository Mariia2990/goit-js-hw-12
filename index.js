import{S as L,i as l,a as C}from"./assets/vendor-CRCB-GUD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();let y;function f(e){e.insertAdjacentHTML("afterbegin",'<span class="loader"></span>')}function d(){const e=document.querySelector(".loader");e&&e.remove()}function p(e){const t=document.querySelector(".gallery"),n=e.map(s=>`
      <a href="${s.largeImageURL}" class="gallery-link">
        <img class="img-gallery"
          src="${s.webformatURL}"
          alt="${s.tags}" 
          loading="lazy" />
        <ul class="list-wrapper">
          <li class="text-content"><b>Likes:</b> ${s.likes}</li>
          <li class="text-content"><b>Views:</b> ${s.views}</li>
          <li class="text-content"><b>Comments:</b> ${s.comments}</li>
          <li class="text-content"><b>Downloads:</b> ${s.downloads}</li>
        </ul>
      </a>
  `).join("");t.innerHTML=n,y?y.refresh():y=new L(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"})}function S(){const e=document.querySelector(".gallery a");if(e){const{height:t}=e.getBoundingClientRect(),n=document.querySelector(".list-wrapper"),{height:s}=n.getBoundingClientRect(),r=t+s;window.scrollBy({top:r*4,behavior:"smooth"})}}function q(){const e=document.querySelector(".gallery");e.innerHTML=""}function m(e){l.info({title:"Info",message:e,position:"topRight",backgroundColor:"red",messageColor:"white",titleColor:"white"})}const R="45922188-6c9bdbb7442dfc44aff321ea7",H="https://pixabay.com/api/";async function b(e,t=1,n=15){const s=new URLSearchParams({key:R,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:n}),r=`${H}?${s.toString()}`;try{const o=await C.get(r);return console.log("Total Hits:",o.data.totalHits),console.log("Current Page Results:",o.data.hits),o.data}catch(o){throw console.error("There was an error with the fetch operation:",o),o}}const v=document.querySelector(".search-form"),P=document.querySelector('[name="searchQuery"]'),w=document.querySelector(".gallery"),i=document.querySelector(".load-more");let u="",a=1,g=0,c=15;i.style.display="none";v.addEventListener("submit",async e=>{if(e.preventDefault(),u=P.value.trim(),!u){l.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}q(),i.style.display="none",f(w),a=1;try{const t=await b(u,a,c);if(d(),g=t.totalHits,!t||t.hits.length===0){m("Sorry, there are no images matching your search query. Please try again!");return}p(t.hits),t.hits.length>=c&&a*c<g&&(i.style.display="block")}catch(t){console.error("Error fetching images:",t),l.error({title:"Error",message:`Error: ${t.message}`,position:"topRight"})}finally{d()}});i.addEventListener("click",async()=>{if(a*c>=g){l.error({position:"topRight",message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"red",messageColor:"white",titleColor:"white"}),i.style.display="none";return}a+=1,f(w);try{const e=await b(u,a,c);if(d(),!e||e.hits.length===0){m("No more images found."),i.style.display="none";return}p(e.hits),S(),a*c>=g&&(i.style.display="none",l.error({position:"topRight",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"red",messageColor:"white",titleColor:"white"}))}catch(e){console.error("Error fetching images:",e),l.error({title:"Error",message:`Error: ${e.message}`,position:"topRight"})}finally{d()}});
//# sourceMappingURL=index.js.map
