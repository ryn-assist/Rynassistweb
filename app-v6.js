const CHARACTER = "https://raw.githubusercontent.com/ryn-assist/Rynassistweb/main/assets/ryn-assist-banner.webp";

const DEFAULT_PAYMENTS = [
  {id:1,name:"QRIS",detail:"Scan QR untuk pembayaran",icon:"⌁"},
  {id:2,name:"GoPay",detail:"Nomor pembayaran akan ditampilkan",icon:"G"},
  {id:3,name:"DANA",detail:"Nomor pembayaran akan ditampilkan",icon:"D"},
  {id:4,name:"Transfer Bank",detail:"Detail rekening akan ditampilkan",icon:"♡"}
];

const DEFAULT_PRICES = [
  {id:1,name:"Paket 7 Hari",price:15000,tag:"7 DAYS",detail:"Akses premium 7 hari"},
  {id:2,name:"Paket 30 Hari",price:45000,tag:"30 DAYS",detail:"Akses premium 30 hari"},
  {id:3,name:"Paket 90 Hari",price:100000,tag:"90 DAYS",detail:"Akses premium 90 hari"},
  {id:4,name:"Paket 1 Tahun",price:250000,tag:"1 YEAR",detail:"Akses premium 1 tahun"}
];

function load(key,fallback){
  try{
    const value=JSON.parse(localStorage.getItem(key));
    return value || fallback;
  }catch(e){ return fallback; }
}

let payments=load("ryn_payments",DEFAULT_PAYMENTS);
let prices=load("ryn_prices",DEFAULT_PRICES);

function save(){
  localStorage.setItem("ryn_payments",JSON.stringify(payments));
  localStorage.setItem("ryn_prices",JSON.stringify(prices));
}

function rupiah(n){
  return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(n)||0);
}

function nav(active){
  return '<header class="nav shell">'+
    '<a href="#/" class="brand"><span class="brand-mark">✦</span><span>RYN ASSIST<small>STORE • DIGITAL</small></span></a>'+
    '<nav class="navlinks">'+
      '<a class="'+(active==="home"?"active":"")+'" href="#/">Beranda</a>'+
      '<a class="'+(active==="payment"?"active":"")+'" href="#/payment">Payment</a>'+
      '<a class="'+(active==="harga"?"active":"")+'" href="#/harga">Daftar Harga</a>'+
      '<a class="'+(active==="refund"?"active":"")+'" href="#/refund">Refund</a>'+
    '</nav>'+
    '<a class="primary" href="#/admin">Admin</a>'+
  '</header>';
}

function footer(){
  return '<footer class="footer shell">♡ Ryn Assist • Digital Store • 2026</footer>';
}

function home(){
  document.querySelector("#app").innerHTML=
    nav("home")+
    '<main>'+
      '<section class="hero shell"><div class="hero-copy"><span class="eyebrow">✦ RYN ASSIST • DIGITAL STORE</span><h1>Simple, cute,<br><span>made for you.</span></h1><p>Semua kebutuhan toko digital Ryn Assist dalam satu tempat. Cek payment, lihat daftar harga, atau hitung refund tanpa berpindah website.</p><div class="hero-actions"><a class="primary" href="#/harga">Lihat Daftar Harga →</a><a class="ghost" href="#/refund">Kalkulator Refund</a></div></div><div class="hero-banner"><img src="'+CHARACTER+'" alt="Ryn Assist banner"></div></section>'+
      '<section class="section shell"><div class="section-head"><span class="eyebrow">MENU UTAMA</span><h2>Pilih yang kamu butuhkan</h2><p>Tiga menu utama, tetap di website yang sama dan nyaman dibuka dari HP.</p></div>'+
        '<div class="cards">'+
          '<a class="card menu-card" href="#/payment"><div class="icon">💳</div><h3>Payment</h3><p>Lihat metode pembayaran dan detail rekening yang tersedia.</p></a>'+
          '<a class="card menu-card" href="#/harga"><div class="icon">🛍️</div><h3>Daftar Harga</h3><p>Lihat paket dan harga produk digital Ryn Assist.</p></a>'+
          '<a class="card menu-card" href="#/refund"><div class="icon">🧮</div><h3>Kalkulator Refund</h3><p>Hitung estimasi refund secara otomatis.</p></a>'+
        '</div>'+
      '</section>'+
    '</main>'+
    footer();
}

function payment(){
  const cards=payments.map(function(x){
    return '<div class="card payment-item"><div class="payment-icon">'+x.icon+'</div><div><h3>'+x.name+'</h3><span class="muted">'+x.detail+'</span></div><div class="value"><strong>TERSEDIA</strong><span class="muted">Ryn Assist</span></div></div>';
  }).join("");
  document.querySelector("#app").innerHTML=
    nav("payment")+
    '<main class="page shell"><div class="page-title"><div><span class="eyebrow">PAYMENT</span><h1>Metode Pembayaran</h1><p>Pilih metode pembayaran yang tersedia.</p></div><a class="ghost" href="#/">← Beranda</a></div>'+
    '<div class="payment-grid">'+cards+'</div></main>'+footer();
}

function harga(){
  const cards=prices.map(function(x){
    return '<div class="card price-item"><span class="tag">'+x.tag+'</span><h3>'+x.name+'</h3><div class="price">'+rupiah(x.price)+'</div><p class="muted">'+x.detail+'</p><a class="primary" href="#/payment">Bayar Sekarang</a></div>';
  }).join("");
  document.querySelector("#app").innerHTML=
    nav("harga")+
    '<main class="page shell"><div class="page-title"><div><span class="eyebrow">DAFTAR HARGA</span><h1>Pilih Paket</h1><p>Data contoh ini nantinya bisa kamu edit dari Admin.</p></div><a class="ghost" href="#/">← Beranda</a></div>'+
    '<div class="price-grid">'+cards+'</div></main>'+footer();
}

function refund(){
  document.querySelector("#app").innerHTML=
    nav("refund")+
    '<main class="page shell">'+
      '<div class="page-title"><div><span class="eyebrow">REFUND</span><h1>Kalkulator Refund</h1><p>Hitung total refund otomatis berdasarkan sisa durasi dan service fee.</p></div><a class="ghost" href="#/">← Beranda</a></div>'+
      '<section class="card calc">'+
        '<div class="form-grid">'+
          '<div class="field"><label>Harga Beli</label><input id="buy" type="number" min="0" placeholder="8000"></div>'+
          '<div class="field"><label>Total Durasi Premium (hari)</label><input id="total" type="number" min="1" placeholder="30"></div>'+
          '<div class="field"><label>Sudah Digunakan (hari)</label><input id="used" type="number" min="0" placeholder="6"></div>'+
          '<div class="field"><label>Service Fee Otomatis</label><input id="feeDisplay" type="text" value="—" readonly></div>'+
        '</div>'+
        '<div class="result"><div><span class="muted">Estimasi Total Refund</span><br><strong id="refundResult">Rp0</strong></div><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="primary" id="calculateRefund">Hitung Refund ♡</button><button class="ghost" id="resetRefund">Reset</button></div></div>'+
        '<div class="refund-rules">'+
          '<div class="rules-title"><span>✦</span><span>REFUND RULES</span><span>✦</span></div>'+
          '<div class="refund-rule"><span>✧ Pemakaian 4–7 hari</span><b>Service Fee 0,8</b></div>'+
          '<div class="refund-rule"><span>✧ Pemakaian 8–30 hari</span><b>Service Fee 0,7</b></div>'+
          '<div class="formula-box"><b>Rumus:</b> Harga beli × sisa durasi ÷ total durasi premium × Service Fee = Total Refund</div>'+
        '</div>'+
      '</section>'+
    '</main>'+footer();

  const b=document.querySelector("#buy");
  const t=document.querySelector("#total");
  const u=document.querySelector("#used");
  const f=document.querySelector("#feeDisplay");
  const r=document.querySelector("#refundResult");

  function getFee(used){
    if(used>=4 && used<=7) return 0.8;
    if(used>=8 && used<=30) return 0.7;
    return null;
  }

  function calc(){
    const buy=Number(b.value);
    const total=Number(t.value);
    const used=Number(u.value);

    if(!buy || !total || used<0){
      f.value="—";
      r.textContent="Rp0";
      return;
    }

    if(used>total){
      f.value="Durasi tidak valid";
      r.textContent="Rp0";
      return;
    }

    const fee=getFee(used);
    if(fee===null){
      f.value="—";
      r.textContent="Rp0";
      return;
    }

    f.value=String(fee).replace(".",",");
    r.textContent=rupiah((buy*(total-used)/total)*fee);
  }

  document.querySelector("#calculateRefund").addEventListener("click",calc);
  [b,t,u].forEach(function(el){el.addEventListener("input",calc);});
  document.querySelector("#resetRefund").addEventListener("click",function(){
    b.value="";
    t.value="";
    u.value="";
    f.value="—";
    r.textContent="Rp0";
  });
}

function admin(){
  document.querySelector("#app").innerHTML=
    nav("")+
    '<main class="page shell"><div class="page-title"><div><span class="eyebrow">ADMIN</span><h1>Kelola Toko</h1><p>Prototype admin mobile-first. Data sementara tersimpan di browser.</p></div><a class="ghost" href="#/">← Beranda</a></div>'+
    '<div class="card"><div class="admin-tabs"><button class="tab active" data-tab="payment">Payment</button><button class="tab" data-tab="harga">Daftar Harga</button></div><div id="adminContent"></div></div></main>'+footer();

  document.querySelectorAll("[data-tab]").forEach(function(btn){
    btn.addEventListener("click",function(){
      document.querySelectorAll("[data-tab]").forEach(function(x){x.classList.remove("active");});
      btn.classList.add("active");
      renderAdmin(btn.dataset.tab);
    });
  });

  renderAdmin("payment");
}

function renderAdmin(tab){
  const box=document.querySelector("#adminContent");
  const arr=tab==="payment"?payments:prices;

  box.innerHTML='<div style="display:flex;justify-content:flex-end;margin-bottom:10px"><button class="primary" id="add">+ Tambah</button></div>';

  if(arr.length){
    box.innerHTML+=arr.map(function(x){
      return '<div class="admin-row"><div><strong>'+x.name+'</strong><div class="muted">'+(tab==="payment"?x.detail:rupiah(x.price))+'</div></div><div class="admin-actions"><button class="ghost" data-edit="'+x.id+'">Edit</button><button class="danger" data-delete="'+x.id+'">Hapus</button></div></div>';
    }).join("");
  }else{
    box.innerHTML+='<div class="empty">Belum ada data.</div>';
  }

  document.querySelector("#add").addEventListener("click",function(){editItem(tab,null);});

  box.querySelectorAll("[data-edit]").forEach(function(btn){
    btn.addEventListener("click",function(){editItem(tab,Number(btn.dataset.edit));});
  });

  box.querySelectorAll("[data-delete]").forEach(function(btn){
    btn.addEventListener("click",function(){
      if(confirm("Hapus data ini?")){
        if(tab==="payment") payments=payments.filter(function(x){return x.id!==Number(btn.dataset.delete);});
        else prices=prices.filter(function(x){return x.id!==Number(btn.dataset.delete);});
        save();
        admin();
      }
    });
  });
}

function editItem(tab,id){
  const arr=tab==="payment"?payments:prices;
  const item=arr.find(function(x){return x.id===id;})||{};
  const name=prompt("Nama",item.name||"");
  if(!name) return;

  if(tab==="payment"){
    const detail=prompt("Detail pembayaran",item.detail||"");
    if(!detail) return;
    const next={id:id||Date.now(),name:name,detail:detail,icon:item.icon||"♡"};
    if(id) payments=payments.map(function(x){return x.id===id?next:x;});
    else payments.push(next);
  }else{
    const price=Number(prompt("Harga (angka)",item.price||45000));
    if(!price) return;
    const detail=prompt("Deskripsi",item.detail||"Paket digital")||"Paket digital";
    const tag=prompt("Tag",item.tag||"NEW")||"NEW";
    const next={id:id||Date.now(),name:name,price:price,detail:detail,tag:tag};
    if(id) prices=prices.map(function(x){return x.id===id?next:x;});
    else prices.push(next);
  }

  save();
  admin();
}

function route(){
  const p=location.hash.replace("#/","")||"home";
  const routes={home:home,payment:payment,harga:harga,refund:refund,admin:admin};
  (routes[p]||home)();
}

window.addEventListener("hashchange",route);
route();
