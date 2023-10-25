import{r as m,f as R,j as u,a,b as U,d as I,F as j}from"./app-166299ad.js";import{U as V}from"./User-474e615a.js";import G from"./LoadingQuiz-0cd98bbe.js";import H from"./MulitplePilihan-7cc3ac0c.js";import O from"./YesNo-e7ea9b77.js";import Q from"./SubmitData-00bf8646.js";import"./sweetalert2.all-33719a40.js";function X({target:y,kecamatan:L}){const[P,F]=m.useState(!1),[n,g]=m.useState([]);m.useState([]);const[w,x]=m.useState([]),[C,D]=m.useState(null),[N,M]=m.useState(null),S=m.useRef(null);m.useEffect(()=>{R.get(`https://d2d.binamuda.com/api/all-quiz/${y.id}`).then(i=>{let e=i.data.soal_general;console.log("dataObj",e),i.data.soal_kecamatan.forEach(c=>{e.push(c)}),g(e),F(!0)}).catch(i=>{console.log("err",i)})},[]);const z=()=>{S.current.click()},B=i=>{if(i.target.files.length){D(i.target.files[0]);const e=new FileReader;e.readAsDataURL(i.target.files[0]),e.onload=function(c){let p=c.target.result;M(p)}}},A=(i,e,c)=>{console.log("soal",e);let p=[],h=null;e.skip_soal&&(n.map((l,s)=>{var r,t,f,d;p.push(l),l.id===e.id&&(((r=n[s+1])==null?void 0:r.skip_soal_id)!==e.id&&((t=e.skip_soal)==null?void 0:t.skip_if_yes_no)!==i?l.skip_soal_many.forEach(o=>{p.push(o)}):((f=n[s+1])==null?void 0:f.skip_soal_id)===e.id&&((d=e.skip_soal)==null?void 0:d.skip_if_yes_no)===i&&(h=n.filter(o=>o.skip_soal_id!==e.id)))}),g(h||p));let _={soal_id:e.id,pilihan_id:null,yes_no:i},v=null;if(w.map(l=>{l.soal_id===e.id&&(v=e.id)}),v){let l=w.map(s=>s.soal_id===v?{...s,yes_no:i}:s);l.map((s,r)=>{var t,f;s.soal_id===((t=e.skip_soal)==null?void 0:t.skip_soal_id)&&i===((f=e.skip_soal)==null?void 0:f.skip_if_yes_no)&&(l=l.filter(d=>{var o;return d.soal_id!==((o=e.skip_soal)==null?void 0:o.id)}))}),x(l)}else x(l=>[...l,_])},E=(i,e,c)=>{let p=[],h=null,_=e;e.skip_soal&&(console.log("item.skip_soal",e.skip_soal),n.map((s,r)=>{var t,f,d,o;p.push(s),s.id===_.id&&(((t=n[r+1])==null?void 0:t.skip_soal_id)!==_.id&&((f=_.skip_soal)==null?void 0:f.skip_if_pilihan_id)!==i?s.skip_soal_many.forEach(k=>{p.push(k)}):((d=n[r+1])==null?void 0:d.skip_soal_id)===_.id&&((o=_.skip_soal)==null?void 0:o.skip_if_pilihan_id)===i&&(h=n.filter(k=>k.skip_soal_id!==_.id)))}),g(h||p));let v={soal_id:e.id,pilihan_id:i,yes_no:null},l=null;if(w.map(s=>{s.soal_id===e.id&&(l=e.id)}),l){let s=w.map(t=>t.soal_id===l?{...t,pilihan_id:i}:t),r=e;s.map((t,f)=>{var d,o;t.soal_id===((d=r.skip_soal)==null?void 0:d.skip_soal_id)&&i===((o=r.skip_soal)==null?void 0:o.skip_if_pilihan_id)&&(s=s.filter(k=>{var b;return console.log("itemData",k),k.soal_id!==((b=r.skip_soal)==null?void 0:b.id)}))}),x(s)}else x(s=>[...s,v])};return u(V,{children:[a(U,{title:"Mulai Survey"}),u("div",{className:"bg-slate-200 min-h-screen",children:[a("div",{className:"bg-yellow-600 h-36 w-full rounded-b-3xl",children:u(I,{href:"/list-survey",className:"flex items-center px-3 pt-2",children:[a("div",{className:"text-white",children:a("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:a("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"})})}),a("div",{className:"text-white ml-3",children:u("div",{className:"",children:["Survey Kec. ",L.nama]})})]})}),u("div",{className:"px-3 -mt-24 pb-32",children:[!P&&a(G,{}),n.map(i=>u("div",{className:"bg-white rounded-lg p-3 mb-4",children:[a("div",{className:"font-medium",children:i.title}),a("div",{className:"text-sm",children:i.subtitle}),a("div",{className:"mt-4",children:i.yes_no>0?a(O,{TempSoal:i,callbackData:(e,c)=>{A(e,c)}}):a(j,{children:a(H,{TempSoal:i,callBack:(e,c)=>{E(e,c)}})})})]},i.id)),a("input",{type:"file",ref:S,className:"",hidden:!0,accept:"image/*",capture:"camera",onChange:B}),a("div",{onClick:z,className:"flex flex-col items-center justify-center h-32 w-full bg-white rounded-lg mt-6",children:N?a("img",{src:N,alt:"",className:"h-32 mx-auto object-contain  text-center"}):u(j,{children:[a("div",{className:"bg-yellow-600 text-white h-14 w-14 flex justify-center items-center rounded-full",children:u("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:[a("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"}),a("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"})]})}),a("div",{className:"mt-2 text-sm",children:"Foto Bersama"})]})}),a("div",{className:"mt-4",children:a(Q,{pilihan:w,soal:n,foto:C,target_id:y.id})})]})]})]})}export{X as default};