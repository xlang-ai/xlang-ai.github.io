(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[548],{7589:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/publications",function(){return n(1261)}])},1261:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return b},default:function(){return j}});var i=n(5893),a=n(7294),s=n(9008),l=n.n(s),r=n(5675),o=n.n(r),c=n(2581),d=["size","color"];function h(e){var t=e.size,n=void 0===t?24:t,i=e.color,s=(0,c.Kd)(e,d);return a.createElement("svg",(0,c.gY)({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-star",width:n,height:n,viewBox:"0 0 24 24",stroke:void 0===i?"currentColor":i,strokeWidth:"2",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},s),a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),a.createElement("path",{d:"M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"}))}var g=["size","color"];function x(e){var t=e.size,n=void 0===t?24:t,i=e.color,s=(0,c.Kd)(e,g);return a.createElement("svg",(0,c.gY)({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-download",width:n,height:n,viewBox:"0 0 24 24",stroke:void 0===i?"currentColor":i,strokeWidth:"2",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},s),a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),a.createElement("path",{d:"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"}),a.createElement("polyline",{points:"7 11 12 16 17 11"}),a.createElement("line",{x1:"12",y1:"4",x2:"12",y2:"16"}))}let u={Grounding:"code generation and semantic parsing",ToolUse:"LLM + tool use",PoweredAgents:"LLM-powered agents",EfficientLLMs:"efficient and generalizable LLMs",InteractiveSystems:"dialog and interactive systems",Robotics:"LLM + Robotics"},p=()=>(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{className:"text-2xl mb-6",children:"Research"}),(0,i.jsx)("p",{className:"leading-7",children:"At the XLANG Lab, our research centers on constructing language model agents that convert language instructions into executable actions within real-world contexts. This encompasses databases (data agent), web applications (plugins/web agent), physical world interactions (robotic agent), and involves techniques like LLM + tool utilization, code generation, semantic parsing, interactive systems, and beyond."})]}),f=e=>{let{papers:t}=e,[n,s]=(0,a.useState)(null),[l,r]=(0,a.useState)(t);return(0,a.useEffect)(()=>{r(t.filter(e=>!n||e.category.includes(n)))},[n]),(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{className:"text-2xl font-[500] mb-6",children:"Papers"}),(0,i.jsx)("div",{className:"flex gap-3 flex-wrap",children:Object.entries(u).map(e=>{let[t,a]=e;return(0,i.jsx)("div",{className:"border border-[1.5px] border-[#7A7A7A] text-[#7A7A7A] rounded-lg py-1 px-3 text-xs cursor-pointer",style:n===t?{borderColor:"#0156AC",color:"#0156AC"}:{},onClick:()=>{t===n?s(null):s(t)},children:a},t)})}),(0,i.jsx)("div",{className:"flex flex-col mt-10",children:l.map(e=>(0,i.jsx)(m,{paper:e},e.title))})]})},m=e=>{let{paper:t}=e,[n,s]=(0,a.useState)(),[l,r]=(0,a.useState)();return(0,a.useEffect)(()=>{t.codeLink&&(async()=>{let e=await w(t.codeLink);s(e)})(),t.huggingfaceModel&&(async()=>{let e=await v(t.huggingfaceModel);r(e)})()},[n,t.codeLink,t.huggingfaceModel]),(0,i.jsx)("div",{className:"border-t border-b border-black/30 py-6",children:(0,i.jsxs)("div",{className:"sm:flex gap-4",children:[t.image?(0,i.jsx)("div",{className:"relative min-w-[180px] max-sm:h-48 h-32 rounded-lg overflow-hidden my-auto shadow-xl",children:(0,i.jsx)(o(),{src:t.image,alt:t.title,fill:!0,style:{objectFit:"cover",objectPosition:"center"}})}):(0,i.jsx)("div",{className:"min-w-[180px] max-sm:h-48 h-32 rounded bg-[#D9D9D9]"}),(0,i.jsxs)("div",{className:"flex flex-col w-full",children:[(0,i.jsx)("h1",{className:"text-lg font-[500]",children:t.title}),(0,i.jsx)("p",{className:"text-[#727272] text-xs font-[500]",children:t.authors}),t.publication&&(0,i.jsx)("p",{className:"italic text-xs font-[500]",children:t.publication}),(0,i.jsxs)("div",{className:"flex justify-end items-center w-full gap-3 font-[500] text-xs",children:[void 0!==l&&t.huggingfaceModel[0]&&(0,i.jsxs)("a",{href:"https://huggingface.co/".concat(t.huggingfaceModel[0]),target:"_blank",className:"flex items-center gap-1",children:[(0,i.jsx)(x,{size:12}),l]}),void 0!==n&&t.codeLink&&(0,i.jsxs)("a",{href:t.codeLink,target:"_blank",className:"flex items-center gap-1",children:[(0,i.jsx)(h,{size:12}),n]}),t.paperLink&&(0,i.jsx)("a",{href:t.paperLink,target:"_blank",children:"paper"}),t.codeLink&&(0,i.jsx)("a",{href:t.codeLink,target:"_blank",children:"code"}),t.blogLink&&(0,i.jsx)("a",{href:t.blogLink,target:"_blank",children:"page"}),t.twitterLink&&(0,i.jsx)("a",{href:t.twitterLink,target:"_blank",children:"twitter"})]})]})]})})},w=async e=>{let t=e.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)/);try{let e=await fetch("https://api.github.com/repos/".concat(t[1],"/").concat(t[2])),n=await e.json();if(void 0!==n.stargazers_count)return n.stargazers_count;return}catch(e){console.error(e);return}},v=async e=>{let t=0;for(let n of e){let e="https://huggingface.co/api/models/".concat(n,"?expand[]=downloadsAllTime");try{let n=await fetch(e),i=await n.json();(null==i?void 0:i.downloadsAllTime)&&(t+=i.downloadsAllTime)}catch(e){console.error(e)}}return t};var b=!0,j=e=>{let{papers:t,talks:n}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(l(),{children:[(0,i.jsx)("title",{children:"XLANG Lab | Research"}),(0,i.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/favicon/white-on-green/apple-touch-icon.png"}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon/white-on-green/favicon-32x32.png"}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon/white-on-green/favicon-16x16.png"}),(0,i.jsx)("link",{rel:"manifest",href:"/favicon/white-on-green/site.webmanifest"})]}),(0,i.jsx)("div",{className:"w-full pt-20 sm:pt-36 pb-10 bg-[#D9D9D9]/20",children:(0,i.jsxs)("div",{className:"page-x-width flex flex-col gap-8 sm:gap-6",children:[(0,i.jsx)(p,{}),(0,i.jsx)(f,{papers:t})]})})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=7589)}),_N_E=e.O()}]);