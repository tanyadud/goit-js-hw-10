import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as m,i as f}from"./assets/vendor-9808d4ac.js";const o=document.querySelector("[data-start]"),r=document.querySelector("#datetime-picker"),h=document.querySelector("span[data-days]"),p=document.querySelector("span[data-hours]"),y=document.querySelector("span[data-minutes]"),S=document.querySelector("span[data-seconds]");o.disabled=!0;let d;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=e[0];t<=new Date?(f.error({message:"Please choose a date in the future",icon:"icon-error",backgroundColor:"#FC5A5A",message:"Please choose a date in the future",messageColor:"#FAFAFB",messageSize:"16px",position:"topCenter",close:!1}),o.disabled=!0):(d=t,o.disabled=!1)}};m("#datetime-picker",b);o.addEventListener("click",e=>{const t=setInterval(()=>{o.disabled=!0,r.disabled=!0;const s=d-Date.now(),a=C(s);s<=0?(clearInterval(t),r.disabled=!1,o.disabled=!0):(h.textContent=n(a.days),p.textContent=n(a.hours),y.textContent=n(a.minutes),S.textContent=n(a.seconds))},1e3)});function C(e){const c=Math.floor(e/864e5),i=Math.floor(e%864e5/36e5),u=Math.floor(e%864e5%36e5/6e4),l=Math.floor(e%864e5%36e5%6e4/1e3);return{days:c,hours:i,minutes:u,seconds:l}}function n(e){let t=String(e);return t.length<2?t.padStart(2,"0"):t}
//# sourceMappingURL=commonHelpers.js.map
