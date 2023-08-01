import{q as ee,r as l,W as ae,j as i,F as m,a,b as te,g as le,f as p}from"./app-645698a3.js";import{u as ne}from"./index-39540c9b.js";import{S as c}from"./sweetalert2.all-784aa3b4.js";import{K as ie}from"./ktp-0d6f75bf.js";import{L as oe}from"./LoadingPage-110594e1.js";const se="/build/assets/foto-diri-boy-31ef6e7f.png",re="/build/assets/foto-diri-girl-170c394c.jpg";function ve({session:D,provinsi:_,calon:ce}){const{errors:b}=ee().props,k=l.useRef(null),x=l.useRef(null),v=l.useRef(null);l.useEffect(()=>{console.log("errors",b)},[b]);const{data:u,setData:w,post:de,processing:me}=ae({nama:null,alamat:null}),[F,L]=l.useState(null),[C,A]=l.useState(null),[R,j]=l.useState([]),[T,U]=l.useState([]),[B,E]=l.useState([]),[o,f]=l.useState({provinsi_id:0,kota_id:0,kecamatan_id:0,desa_id:0}),[y,G]=l.useState(null),[N,J]=l.useState(null),[S,$]=l.useState(null),[P,I]=l.useState(null),[K,q]=l.useState(null),[W,s]=l.useState(!1),[g,H]=l.useState(0),{coords:r,isGeolocationAvailable:ue,isGeolocationEnabled:fe}=ne({positionOptions:{enableHighAccuracy:!0}});l.useEffect(()=>{L(r==null?void 0:r.latitude),A(r==null?void 0:r.longitude)},[r]);const[ge,d]=l.useState(!1);l.useEffect(()=>{navigator.geolocation.getCurrentPosition(e=>{d(!0)},e=>{d(!1)}),navigator.permissions.query({name:"geolocation"}).then(e=>{e.state==="denied"&&d(!1)})},[]),l.useState(!1);const O=()=>{k.current.click()},z=e=>{if(e.target.files.length){J(e.target.files[0]);const t=new FileReader;t.readAsDataURL(e.target.files[0]),t.onload=function(n){let h=n.target.result;q(h)}}},M=e=>{if(e.target.files.length){$(e.target.files[0]);const t=new FileReader;t.readAsDataURL(e.target.files[0]),t.onload=function(n){let h=n.target.result;I(h)}}},Q=()=>{if(s(!0),!u.nama||!u.alamat)c.fire({icon:"info",title:"Data tidak lengkap"}),s(!1);else{navigator.geolocation.getCurrentPosition(t=>{d(!0)},t=>{d(!1)});let e=null;if(o.provinsi_id?o.kota_id?o.kecamatan_id&&o.desa_id?y||(e="Tanggal Lahir"):e="Kecamatan":e="Kota":e="Provinsi",e)c.fire({icon:"info",title:`Silahkan Lengkapi ${e}`,text:"Data Anda Belum Lengkap"}),s(!1);else if(!N)c.fire({icon:"info",title:"Silahkan Upload KTP",text:"Data Anda Belum Lengkap"}),s(!1);else if(g===0)c.fire({icon:"info",title:"Silahkan Pilih Jenis Kelamin",text:"Data Anda Belum Lengkap"}),s(!1);else if(!S)c.fire({icon:"info",title:"Silahkan Upload Foto Diri Anda",text:"Data Anda Belum Lengkap"}),s(!1);else if(!v.current.checked)c.fire({icon:"info",title:"Silahkan setujui pernyataan anda sebagai relawan"}),s(!1);else{s(!0);const t=new FormData;t.append("nama",u.nama),t.append("alamat",u.alamat),t.append("provinsi",o.provinsi_id),t.append("kota",o.kota_id),t.append("desa",o.desa_id),t.append("kecamatan",o.kecamatan_id),t.append("tanggal_lahir",y),t.append("latitude",F),t.append("longitude",C),t.append("foto_ktp",N),t.append("foto_diri",S),t.append("jenis_kelamin",g),le.post("/addRelawan",t)}}},V=e=>{let t=e.target.value;f({...o,provinsi_id:t}),t>0&&p.get(`/listKota?provinsi=${t}`).then(n=>{j(n.data.data)}).catch(n=>{console.log("err",n)})},X=e=>{let t=e.target.value;f({...o,kota_id:t}),t>0&&p.get(`/listKecamatan?kota=${t}`).then(n=>{U(n.data.data)}).catch(n=>{console.log("err",n)})},Y=e=>{let t=e.target.value;f({...o,kecamatan_id:t}),t>0&&p.get(`/listDesa?kecamatan=${t}`).then(n=>{E(n.data.data)}).catch(n=>{console.log("err",n)})},Z=e=>{let t=e.target.value;console.log("value",t),f({...o,desa_id:t})};return i(m,{children:[a(te,{title:"Relawan"}),i("div",{className:"md:w-1/3  mx-auto w-full relative",children:[W&&a(oe,{}),a("div",{className:"bg-yellow-600 h-36 w-full rounded-b-3xl p-3 font-semibold text-white",children:"Daftar Relawan"}),i("div",{className:"min-h-screen  flex justify-center flex-col items-center px-3 bg-white -mt-24 rounded-t-2xl pb-8",children:[D.success&&a("div",{className:"bg-yellow-100 w-full rounded-lg px-2 text-sm mb-4",children:a("div",{className:"font-medium w-full py-2  block",children:"Berhasil simpan data"})}),i("label",{className:"block w-full mt-4",children:[a("span",{className:"after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700",children:"Nama"}),a("input",{type:"text",name:"nama",onChange:e=>w("nama",e.target.value),className:"mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1",placeholder:"masukan nama"})]}),i("label",{className:"block w-full mt-6",children:[a("span",{className:"after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700",children:"Tanggal Lahir"}),a("input",{type:"date",name:"tanggal",onChange:e=>G(e.target.value),className:"mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1",placeholder:"masukan nama"})]}),a("label",{htmlFor:"provinsi",className:"block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6",children:"Jenis Kelamin"}),i("select",{id:"provinsi",onChange:e=>H(e.target.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    ",children:[a("option",{value:0,children:"Pilih jenis kelamin"}),a("option",{value:"Laki-laki",children:"Laki-laki"}),a("option",{value:"Perempuan",children:"Perempuan"})]}),i("label",{className:"block w-full mt-6",children:[a("span",{className:"after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700",children:"Alamat"}),a("input",{type:"text",name:"nik",onChange:e=>w("alamat",e.target.value),className:"mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1",placeholder:"masukan nama"})]}),a("label",{htmlFor:"provinsi",className:"block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6",children:"Pilih Provinsi"}),i("select",{id:"provinsi",onChange:V,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    ",children:[a("option",{value:0,children:"Pilih provinsi"}),_.map(e=>a("option",{value:e.id_provinsi,children:e.nama},e.id))]}),a("label",{htmlFor:"kota",className:"block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6",children:"Pilih Kota/Kabupaten"}),i("select",{id:"kota",onChange:X,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    ",children:[a("option",{value:0,children:"Pilih kota"}),R.map(e=>a("option",{value:e.id_kota,children:e.nama},e.id))]}),a("label",{htmlFor:"kecamatan",className:"block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6",children:"Pilih Kecamatan"}),i("select",{id:"kecamatan",onChange:Y,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    ",children:[a("option",{value:0,children:"Pilih Kecamatan"}),T.map(e=>a("option",{value:e.id_kecamatan,children:e.nama},e.id))]}),a("label",{htmlFor:"desa",className:"block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6",children:"Pilih Desa"}),i("select",{id:"desa",onChange:Z,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    ",children:[a("option",{value:0,children:"Pilih Desa"}),B.map(e=>a("option",{value:e.id,children:e.nama},e.id))]}),a("label",{htmlFor:"KTP",className:"block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6",children:"Upload KTP"}),i("div",{className:"text-center",onClick:O,children:[K?a("img",{src:K,className:"w-1/2 h-auto mx-auto rounded-lg",alt:""}):a("img",{src:ie,className:"w-1/2 h-auto mx-auto",alt:""}),a("div",{className:"mt-2 text-sm",children:"Klik untuk upload KTP"}),a("input",{type:"file",ref:k,className:"",hidden:!0,accept:"image/*",onChange:z})]}),a("label",{htmlFor:"KTP",className:"block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6",children:"Upload Foto Diri"}),i("div",{className:"text-center",onClick:()=>x.current.click(),children:[P?a(m,{children:a("img",{src:P,className:"w-1/2 h-auto mx-auto",alt:""})}):a(m,{children:g==="Laki-laki"?a(m,{children:a("img",{src:se,className:"w-1/2 h-auto mx-auto",alt:""})}):a(m,{children:a("img",{src:re,className:"w-1/2 h-auto mx-auto",alt:""})})}),a("div",{className:"mt-2 text-sm",children:"Klik untuk upload Foto Diri"}),a("input",{type:"file",ref:x,className:"",hidden:!0,accept:"image/*",onChange:M})]}),a("div",{className:"mt-4",children:i("div",{className:"bg-yellow-50 p-3 rounded-lg",children:[a("div",{className:"",children:"Dengan menyetujui ini anda telah bersedia dan terdaftar sebagai relawan Prayudha Septiadi Wijaya."}),i("div",{className:"flex items-center mt-2",children:[a("input",{id:"checked-checkbox",type:"checkbox",ref:v,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "}),a("label",{for:"checked-checkbox",className:"ml-2 text-sm font-medium text-gray-900 ",children:"Saya Setuju"})]})]})}),a("div",{className:" text-center w-full mt-3",children:a("div",{className:"mt-4 bg-yellow-600 text-center py-2  px-10 rounded-lg text-white w-full",onClick:Q,children:"Daftar"})})]})]})]})}export{ve as default};