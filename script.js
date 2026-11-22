const IMGS=["imagenes/pagina-1.jpg", "imagenes/pagina-2.jpg", "imagenes/pagina-3.jpg", "imagenes/pagina-4.jpg", "imagenes/pagina-5.jpg", "imagenes/pagina-6.jpg", "imagenes/pagina-7.jpg", "imagenes/pagina-8.jpg", "imagenes/pagina-9.jpg"],T=[["Cuento para dormir", "Una noche tranquila, Olivia salió al jardín con su amiga la oca. Todo el cielo parecía estar esperándola."], ["", "Una golondrina cruzó volando entre los pinos. —¿A dónde irá tan tarde? —susurró Olivia, y levantó la mano para saludarla."], ["", "Detrás de la colina asomó una luna enorme, redonda y dorada, como una galleta gigante. Olivia contuvo la respiración."], ["", "Un conejito de nube se sentó a su lado. Juntos miraron la lunita en forma de sonrisa. —Cada noche cambia un poquito —dijo Olivia—, pero siempre vuelve."], ["", "Entonces llegó el zorro con su bufanda y su libro de cuentos. —¿Quieren que les lea uno? —preguntó, con una voz suave como una manta."], ["", "Poco después, el oso, la ratona y sus amigos pusieron una mesa bajo la luna: sopa calentita, pan con miel y muchas risas. Nadie tenía sueño todavía… casi nadie."], ["", "La golondrina volvió para despedirse. Olivia sintió que el mundo era enorme y amable, y que siempre habría algo nuevo por descubrir."], ["", "Desde ese día, Olivia guardó sus recuerdos como tesoros y siguió explorando, con el corazón siempre abierto a las maravillas del mundo. Y cuando se dormía cada noche, soñaba con su próxima gran aventura."], ["Fin", "Dulces sueños, pequeño explorador."]];let i=0,timer=null,full="";
const $=id=>document.getElementById(id),pic=$("pic"),txt=$("txt"),ttl=$("ttl");
const st=$("stars");for(let k=0;k<45;k++){const s=document.createElement("i");s.className="s";s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*3}s;opacity:${.4+Math.random()*.6}`;st.appendChild(s)}
const dots=$("dots");T.forEach((_,k)=>{const b=document.createElement("button");b.className="d";b.setAttribute("aria-label","Ir a la página "+(k+1));b.onclick=()=>go(k);dots.appendChild(b)});
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
function type(){txt.textContent=full}
function go(n){i=Math.max(0,Math.min(T.length-1,n));pic.classList.add("out");chime();
 setTimeout(()=>{pic.src=IMGS[i];pic.classList.remove("out")},reduce?0:300);
 ttl.textContent=T[i][0];full=T[i][1];type();
 $("prev").disabled=i==0;$("next").disabled=i==T.length-1;
 [...dots.children].forEach((d,k)=>d.classList.toggle("on",k==i))}
$("prev").onclick=()=>go(i-1);$("next").onclick=()=>go(i+1);

addEventListener("keydown",e=>{if(e.key=="ArrowRight"||e.key==" ")go(i+1);if(e.key=="ArrowLeft")go(i-1)});
let x0=null;addEventListener("touchstart",e=>x0=e.touches[0].clientX,{passive:true});
addEventListener("touchend",e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)go(i+(d<0?1:-1));x0=null});
let AC,master,on=true,tid,k=0,idx=2,nxt=0;const SC=[261.63,293.66,329.63,392,440,523.25,587.33,659.25];
function note(f,t,v,d){const o=AC.createOscillator(),o2=AC.createOscillator(),g=AC.createGain(),g2=AC.createGain();o.frequency.value=f;o2.frequency.value=f*4;g2.gain.value=.12;o.connect(g);o2.connect(g2);g2.connect(g);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+d);g.connect(master);o.start(t);o2.start(t);o.stop(t+d);o2.stop(t+d)}
function initAudio(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}master=AC.createGain();master.gain.value=.5;const dl=AC.createDelay(1),fb=AC.createGain(),wet=AC.createGain();dl.delayTime.value=.34;fb.gain.value=.38;wet.gain.value=.4;master.connect(AC.destination);master.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(AC.destination);nxt=AC.currentTime+.1;
 tid=setInterval(()=>{while(nxt<AC.currentTime+.6){if(on){if(k%3==0)note(SC[[0,2,4][(k/3|0)%3]]/2,nxt,.35,3);idx=Math.max(0,Math.min(7,idx+[-1,0,1,2,-2][Math.random()*5|0]));if(Math.random()<.8)note(SC[idx],nxt,.3,2.2)}nxt+=.62;k++}},200)}
function chime(){if(!AC||!on)return;const t=AC.currentTime;[784,1046.5,1318.5].forEach((f,j)=>note(f,t+j*.09,.25,1.6))}
const first=e=>{if(e.target.closest&&e.target.closest("#snd"))return;initAudio();if(AC&&AC.state=="suspended")AC.resume();removeEventListener("pointerdown",first);removeEventListener("keydown",first)};
addEventListener("pointerdown",first);addEventListener("keydown",first);
$("snd").onclick=()=>{if(!AC){initAudio();return}on=!on;$("snd").textContent=on?"🔊":"🔇"};
pic.src=IMGS[0];go(0);
