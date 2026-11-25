const seedMovies = [
 {id:"m01",title:"Theri",location:"Perambalur",theatre:"Krishna Theatre"},
 {id:"m02",title:"Baahubali 2",location:"Trichy",theatre:"Maris LA"},
 {id:"m03",title:"Spider",location:"Perambalur",theatre:"Raja Cinemas"},
 {id:"m04",title:"Spider-Man: Homecoming",location:"Perambalur",theatre:"Ram Cinemas"},
 {id:"m05",title:"KGF",location:"Thuraiyur",theatre:"LA Cinemas"},
 {id:"m06",title:"Vikram",location:"Thuraiyur",theatre:"LA Cinemas"},
 {id:"m07",title:"Sita Ramam",location:"Trichy",theatre:"Sona Meena"},
 {id:"m08",title:"Por Thozhil",location:"Trichy",theatre:"Sona Meena"},
 {id:"m09",title:"Avatar 2",location:"Trichy",theatre:"Maris LA"},
 {id:"m10",title:"Viduthalai Part 1",location:"Trichy",theatre:"Maris LA"},
 {id:"m11",title:"Dada",location:"Trichy",theatre:"Maris LA"},
 {id:"m12",title:"Good Bad Ugly",location:"Trichy",theatre:"Maris LA"},
 {id:"m13",title:"Godzilla vs Kong",location:"Trichy",theatre:"Maris LA"},
 {id:"m14",title:"Aadujeevitham",location:"Trichy",theatre:"Maris LA"},
 {id:"m15",title:"Jailer",location:"Trichy",theatre:"Maris LA",note:"Jailer (first film)"},
 {id:"m16",title:"Mark Antony",location:"Trichy",theatre:"MegaStar Cinemas"},
 {id:"m17",title:"GOAT",location:"Trichy",theatre:"MegaStar Cinemas"},
 {id:"m18",title:"LEO",location:"Trichy",theatre:"Cauvery Theatre",note:"One of two theatre viewings."},
 {id:"m19",title:"LEO",location:"Perambalur",theatre:"Ram Cinemas",note:"One of two theatre viewings."},
 {id:"m20",title:"Youth",location:"Perundurai",theatre:"Cosmos Cinemas"},
 {id:"m21",title:"Dhurandhar 2",location:"Perundurai",theatre:"Shakespeare"},
 {id:"m22",title:"Dhurandhar",location:"Erode",theatre:"Sri Sakthi Cinemas",note:"Dhurandhar (first film)"},
 {id:"m23",title:"With Love",location:"Erode",theatre:"Sri Sakthi Cinemas"},
 {id:"m24",title:"Michael",location:"Erode",theatre:"Sri Sakthi Cinemas"},
 {id:"m25",title:"Jana Nayagan",location:"Erode",theatre:"Sri Sakthi Cinemas"},
 {id:"m26",title:"Jailer 2",location:"Erode",theatre:"Sri Sakthi Cinemas"},
 {id:"m27",title:"Ramayana",location:"Erode",theatre:"Sri Sakthi Cinemas"}
];
const KEY="reellog_archive_v2";
let movies=loadMovies();
let activeMovie=null;
let currentView="grid";
const $=s=>document.querySelector(s);
const grid=$("#movieGrid"), dialog=$("#movieDialog"), detailDialog=$("#detailDialog");
function loadMovies(){try{const saved=localStorage.getItem(KEY);return saved?JSON.parse(saved):seedMovies.map(m=>({...m,poster:"",date:"",rating:"",note:m.note||""}));}catch{return seedMovies.map(m=>({...m,poster:"",date:"",rating:"",note:""}));}}
function persist(){localStorage.setItem(KEY,JSON.stringify(movies));}
function safe(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function posterMarkup(m){return m.poster?`<img class="poster-img" src="${safe(m.poster)}" alt="${safe(m.title)} poster" onerror="this.style.display='none';this.nextElementSibling.hidden=false"><div class="poster-placeholder" hidden><span class="placeholder-top">REELLOG ORIGINAL · ${safe(m.location.toUpperCase())}</span><strong>${safe(m.title)}</strong><span class="placeholder-bottom">A BIG SCREEN MEMORY ✦</span></div>`:`<div class="poster-placeholder"><span class="placeholder-top">REELLOG ORIGINAL · ${safe(m.location.toUpperCase())}</span><strong>${safe(m.title)}</strong><span class="placeholder-bottom">A BIG SCREEN MEMORY ✦</span></div>`;}
function formatDate(date){if(!date)return "DATE NOT ADDED";return new Date(date+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}).toUpperCase();}
function render(){
 const q=$("#searchInput").value.toLowerCase().trim(),loc=$("#locationFilter").value,sort=$("#sortFilter").value;
 const locations=[...new Set(movies.map(m=>m.location))].sort();
 const prev=loc;$("#locationFilter").innerHTML='<option value="">All locations</option>'+locations.map(x=>`<option value="${safe(x)}">${safe(x)}</option>`).join("");$("#locationFilter").value=locations.includes(prev)?prev:"";
 let filtered=movies.filter(m=>(!loc||m.location===loc)&&[m.title,m.location,m.theatre,m.note].join(" ").toLowerCase().includes(q));
 if(sort==="az")filtered.sort((a,b)=>a.title.localeCompare(b.title));
 else if(sort==="location")filtered.sort((a,b)=>a.location.localeCompare(b.location)||a.title.localeCompare(b.title));
 else filtered.sort((a,b)=>String(b.date||"").localeCompare(String(a.date||""))||String(b.id).localeCompare(String(a.id)));
 $("#movieCount").textContent=movies.length;$("#placeCount").textContent=new Set(movies.map(m=>m.location)).size;$("#theatreCount").textContent=new Set(movies.map(m=>m.theatre)).size;
 $("#resultCount").textContent=`${filtered.length} ${filtered.length===1?"experience":"experiences"}`;$("#filterName").textContent=loc?loc.toUpperCase():"ALL LOCATIONS";
 $("#emptyState").hidden=filtered.length>0;
 grid.classList.toggle("list-view",currentView==="list");
 grid.innerHTML=filtered.map((m,i)=>`<article class="movie-card" data-id="${safe(m.id)}" style="animation-delay:${Math.min(i*35,350)}ms">
 <div class="poster-wrap">${posterMarkup(m)}<div class="poster-shade"></div><span class="poster-badge">${m.date?formatDate(m.date):"THEATRE MEMORY"}</span></div>
 <div class="card-body"><div class="card-title-row"><h3 class="card-title">${safe(m.title)}</h3><span class="card-arrow">↗</span></div>
 <div class="card-meta"><span><b class="meta-pin">⌖</b>${safe(m.theatre)}</span><span><b class="meta-pin">◉</b>${safe(m.location)}</span></div>
 <div class="card-footer"><span>${m.date?formatDate(m.date):"DATE NOT ADDED"}</span><span class="rating">${m.rating?"★".repeat(Number(m.rating)):"✦ MEMORY"}</span></div></div></article>`).join("");
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2300);}
function openForm(movie=null){
 $("#movieForm").reset();$("#dialogTitle").textContent=movie?"Edit memory.":"Log a movie.";
 const f=$("#movieForm");f.elements.id.value=movie?.id||"";
 ["title","location","theatre","date","rating","poster","note"].forEach(k=>f.elements[k].value=movie?.[k]||"");
 dialog.showModal();
}
function showDetails(id){
 const m=movies.find(x=>String(x.id)===String(id));if(!m)return;activeMovie=m;
 $("#detailContent").innerHTML=`<div class="detail-content"><div>${m.poster?`<img class="detail-poster" src="${safe(m.poster)}" alt="${safe(m.title)} poster">`:`<div class="detail-poster poster-placeholder"><strong>${safe(m.title)}</strong></div>`}</div>
 <div class="detail-copy"><div class="overline">YOUR THEATRE MEMORY</div><h2>${safe(m.title)}</h2><p class="detail-location">⌖ ${safe(m.location)}</p><p class="detail-theatre">▣ ${safe(m.theatre)}</p><p class="detail-theatre">◷ ${m.date?formatDate(m.date):"Date not added"}</p><p class="detail-theatre">${m.rating?"★".repeat(Number(m.rating))+" · Your rating":"Not rated yet"}</p><p class="detail-note">${safe(m.note||"No personal note added yet. You can edit this memory to add one.")}</p><div class="detail-actions"><button class="edit-action" id="editCurrent">Edit memory</button><button id="deleteCurrent">Delete</button><button id="closeDetail">Close</button></div></div></div>`;
 detailDialog.showModal();
 $("#editCurrent").onclick=()=>{detailDialog.close();openForm(m);};
 $("#deleteCurrent").onclick=()=>{if(confirm(`Delete ${m.title} from your archive?`)){movies=movies.filter(x=>String(x.id)!==String(m.id));persist();detailDialog.close();render();toast("Memory deleted");}};
 $("#closeDetail").onclick=()=>detailDialog.close();
}
$("#openAddTop").onclick=$("#heroAdd").onclick=()=>openForm();
$("#closeDialog").onclick=()=>dialog.close();
$("#movieForm").addEventListener("submit",e=>{
 e.preventDefault();const f=e.currentTarget,d=Object.fromEntries(new FormData(f).entries());
 const movie={id:d.id||"m"+Date.now(),title:d.title.trim(),location:d.location.trim(),theatre:d.theatre.trim(),date:d.date,rating:d.rating,poster:d.poster.trim(),note:d.note.trim()};
 if(d.id){movies=movies.map(x=>String(x.id)===String(d.id)?movie:x);toast("Memory updated");}else{movies.unshift(movie);toast("Added to your cinema archive");}
 persist();dialog.close();render();
});
grid.addEventListener("click",e=>{const card=e.target.closest("[data-id]");if(card)showDetails(card.dataset.id);});
["searchInput","locationFilter","sortFilter"].forEach(id=>$("#"+id).addEventListener(id==="searchInput"?"input":"change",render));
$("#gridView").onclick=()=>{currentView="grid";$("#gridView").classList.add("selected");$("#listView").classList.remove("selected");render();};
$("#listView").onclick=()=>{currentView="list";$("#listView").classList.add("selected");$("#gridView").classList.remove("selected");render();};
$("#clearFilters").onclick=()=>{$("#searchInput").value="";$("#locationFilter").value="";render();};
$("#themeToggle").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("reellog_theme",document.body.classList.contains("light")?"light":"dark");};
if(localStorage.getItem("reellog_theme")==="light")document.body.classList.add("light");
document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();$("#searchInput").focus();}if(e.key==="Escape"){if(dialog.open)dialog.close();if(detailDialog.open)detailDialog.close();}});
render();
