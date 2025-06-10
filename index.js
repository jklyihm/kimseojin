<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Interactive Gallery – Unified</title>
  <style>
    /* ─── RESET ─── */
    *{margin:0;padding:0;box-sizing:border-box;}
    html,body{width:100%;height:100%;scroll-behavior:smooth;font-family:sans-serif;overflow:hidden;}

    /* ─── PAGE BACKGROUNDS ─── */
    body.index-page,body.default-page{background:#FF1818;position:relative;}
    body.abang-page{background:#ffffff;overflow-x:hidden;overflow-y:auto;position:relative;}
    body.tree-page{background:#89ae3a;overflow:auto;position:relative;}
    body.human-page{background:#FF0000;overflow:auto;position:relative;}
    body.darl-page{background:#004f4f;color:#fff;overflow-x:hidden;overflow-y:auto;position:relative;}
    body.gitar-page{background:#2C3E50;color:#fff;overflow:hidden;position:relative;}
    body.lip-page{background:#87CEEB;transition:background-color .8s ease;position:relative;}
    body.dnjs-page{background:rgb(194, 150, 29);overflow:auto;position:relative;}

    /* ─── TITLES & DIVIDER (default) ─── */
    #intro-text, #static-title {
      position:fixed;
      top:20px;
      left:20px;
      transform: scale(0.4);
      font-size:clamp(48px,10vw,160px);
      font-weight:700;
      color:#000;
      z-index:10;
      user-select:none;
      transform-origin:left top;
    }

    #intro-text.start {
      top:50%;
      left:50%;
      transform:translate(-50%,-50%) scale(1);
      opacity:0;
      animation:fadeIn 1s ease-in-out 2s forwards,
               moveAndShrink 1.2s ease 3.2s forwards;
    }
    @keyframes moveAndShrink {
  to {
    top: 20px;
    left: 20px;
    transform: scale(0.4);
  }
}
    #divider{
        position:fixed;
        left:0;
        top:calc(20px + 160px *0.4 + 20px);
        width:100%;
        height:2px;
        background:#000;
        opacity:1;
        z-index:9;
    }

    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes moveScale{
        from{top:50%;left:50%;transform:translate(-50%,-50%) scale(1);}
        to{top:20px;left:20px;transform:translate(0,0) scale(1);}
    }

    /* ─── RANDOM ICONS (default) ─── */
    .random-IMG{
      position:absolute;
      opacity:0;
      cursor:pointer;
      transition:transform .4s ease,opacity .4s ease;
      transform-origin:center;
      z-index:3;
      animation:sparkle 1.5s ease-in-out infinite;
    }
    .random-IMG:hover{
        transform:scale(1.25);}  /* Hover scale */
    .random-IMG::after{content:"";position:absolute;inset:0;background:linear-gradient(130deg,transparent 40%,rgba(255,255,255,.9) 50%,transparent 60%);opacity:0;transform:translateX(-100%) skewX(-20deg);transition:opacity .5s ease,transform .5s ease;pointer-events:none;}
    .random-IMG:hover::after{opacity:1;transform:translateX(100%) skewX(-20deg);}  /* Hologram sweep */

   @keyframes sparkle {
  0%   { filter: brightness(1) drop-shadow(0 0 0px #fff); transform: scale(1); }
  50%  { filter: brightness(2) drop-shadow(0 0 8px #fff); transform: scale(1.1); }
  100% { filter: brightness(1) drop-shadow(0 0 0px #fff); transform: scale(1); }
}

    /* ─── ABANG STICKY ─── */
    .abang-section{position:sticky;top:0;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;background:#fff;}
    .abang-section img{max-width:100vw;max-height:100vh;object-fit:contain;}

    /* ─── COMMON MEDIA GRID (tree & human) ─── */
    #firstMedia{position:absolute;top:30%;left:50%;transform:translate(-50%,-50%) scale(1);width:80vw;max-width:100vw;max-height:80vh;object-fit:contain;cursor:pointer;transition:transform .3s;}
    #firstMedia:hover{transform:translate(-50%,-50%) scale(1.2);}  
    #grid-container{display:none;position:absolute;left:50%;transform:translateX(-50%);width:90vw;display:grid;grid-template-columns:repeat(3,1fr);gap:15px;justify-items:center;}
    #grid-container IMG{width:auto;height:auto;object-fit:contain;cursor:pointer;transition:transform .3s;}
    #grid-container IMG:hover{transform:scale(1.2);}

    /* ─── DARL STACK ─── */
    .stacked-gallery section{position:sticky;top:0;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;background:#004f4f;}
    .stacked-gallery IMG{max-width:100vw;max-height:100vh;object-fit:contain;}

    /* ─── GITAR SLIDE + GRID ─── */
    #gitarSlideshow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90vw;display:flex;justify-content:center;align-items:center;}
    #gitarSlideshow IMG{max-width:100%;max-height:90vh;object-fit:contain;opacity:0;transition:opacity 1s ease-in-out;cursor:pointer;}
    #gitarGrid{display:none;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90vw;display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(2,auto);gap:10px;justify-items:center;align-items:center;}
    #gitarGrid IMG{width:100%;max-height:30vh;object-fit:contain;cursor:pointer;transition:transform .3s;}
    #gitarGrid IMG:hover{transform:scale(1.2);}

    /* ─── LIP SLIDE ─── */
    .lip-container{position:fixed;inset:0;display:flex;justify-content:center;align-items:center;z-index:2;}
    .lip-slide{width:85vw;max-width:1100px;max-height:85vh;height:auto;object-fit:contain;opacity:0;transition:.5s opacity,1s transform;}
    .lip-first{transform:scale(1.5);animation:firstShrink 1.2s ease forwards;}
    @keyframes firstShrink{to{transform:scale(1);}}
    #lipIcon{position:fixed;top:15px;right:15px;width:90px;cursor:pointer;z-index:11;transition:transform .3s;}
    #lipIcon:hover{transform:scale(1.2);}

.dnjs-container {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(194, 150, 29);
  z-index: 5;
  overflow: visible; /* 중요: 이미지 잘리지 않도록 */
}

.dnjs-image {
  width: 90vw;
  height: auto;
  max-height: 90vh;
  object-fit: contain;
  transform: scale(0.8);
  opacity: 0;
  animation: appearGrow 1s ease-out forwards;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.5s ease;
}

.dnjs-image:hover {
  transform: scale(0.72); /* hover 시 1.2배 확대 */
}


@keyframes appearGrow {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(0.6);
    opacity: 1;
  }
}
.dnjs-hint {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: clamp(20px, 3vw, 36px);
  font-weight: bold;
  background: rgba(0,0,0,0.4);
  padding: 10px 20px;
  border-radius: 12px;
  z-index: 10;
  animation: fadeHint 2s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes fadeHint {
  from { opacity: 0.4; transform: translateX(-50%) scale(1); }
  to { opacity: 1; transform: translateX(-50%) scale(1.05); }
}
.dnjs-corner-icon {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 100px;  /* 크기 키움 */
  height: auto;
  z-index: 20;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.dnjs-corner-icon:hover {
  transform: scale(1.2);
}


    /* ─── CORNER ICONS (other pages) ─── */
    #redIcon,#tomatoIcon,#darlIcon,#gitarIcon{position:fixed;z-index:999;cursor:pointer;transition:transform .3s;}
    #redIcon{top:10px;right:10px;width:100px;}
    #tomatoIcon{top:10px;left:10px;width:136px;}
    #darlIcon{bottom:10px;right:10px;width:120px;}
    #gitarIcon{top:10px;right:10px;width:100px;}
    #redIcon:hover,#tomatoIcon:hover,#darlIcon:hover,#gitarIcon:hover{transform:scale(1.2);}

    /* ─── MODAL ─── */
    .overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,.6);display:flex;justify-content:center;align-items:center;z-index:1000;}
    .overlay IMG{max-width:90vw;max-height:90vh;object-fit:contain;}
    .overlay .close-btn{position:absolute;top:20px;right:20px;font-size:2rem;color:#fff;cursor:pointer;}
  </style>
</head>
<body>
<script>
/***** FILE ARRAYS *****/
const thumbs = ['lip','tree','abang','darl','dnjs','gitar','human','insta'].map(f=>`IMG/${f}.png`);
const treeFiles  = Array.from({length:14},(_,i)=>`tree_${i+1}.${i===0?'JPG':'jpg'}`);
const humanFiles = Array.from({length:14},(_,i)=>`human_${i+1}.jpg`);
const gitarFiles = Array.from({length:10},(_,i)=>`gitar_${i+1}.jpg`);
const lipSlides  = Array.from({length:6},(_,i)=>`be_${i+1}.jpg`); // lip page slide images

/***** MODAL *****/
function showModal(src){
  const o=document.createElement('div');o.className='overlay';
  const i=document.createElement('IMG');i.src='img/'+src;
  const c=document.createElement('span');c.className='close-btn';c.textContent='✕';
  c.onclick=()=>document.body.removeChild(o);
  o.append(c,i);document.body.appendChild(o);
}

/***** RANDOM IMAGE PLACEMENT (default) *****/
function placeImages(){
  const placed=[];
  const divider=document.getElementById('divider');
  const minY=(divider?divider.getBoundingClientRect().bottom:40)+20;
  const margin=20;
  thumbs.forEach(src=>{
    const IMG=document.createElement('IMG');
    IMG.src=src;IMG.className='random-IMG';
    const size=120+Math.random()*80;
    IMG.style.width=size+'px';
    let x,y,tries=0;
    do{
      x=Math.random()*(innerWidth-size);
      y=Math.random()*(innerHeight-size-minY)+minY;
      tries++;
    }while(tries<100 && placed.some(r=>Math.hypot(r.x-x,r.y-y)<(r.w/2+size/2+margin)));
    placed.push({x,y,w:size});
    IMG.style.left=x+'px';IMG.style.top=y+'px';
    IMG.onclick=()=>{
         if(src.includes('insta')) {
            window.open('https://www.instagram.com/photo_estj', '_blank');
        }
        else if(src.includes('lip')) location.hash='#lip';
        else if(src.includes('abang')) location.hash='#abang';
        else if(src.includes('tree')) location.hash='#tree';
        else if(src.includes('human')) location.hash='#human';
        else if(src.includes('darl')) location.hash='#darl';
        else if(src.includes('gitar')) location.hash='#gitar';
        else if(src.includes('dnjs')) location.hash='#dnjs';
        else location.hash='#default';
          location.reload();
        };

    document.body.appendChild(IMG);
    requestAnimationFrame(()=>IMG.style.opacity=1);
  });
}

/***** PAGES INITIALISERS *****/
function initIndexPage(){
  document.body.className='index-page';
  const h1 = document.createElement('h1');
  h1.id = 'intro-text';
  h1.className = 'start';
  h1.textContent = 'KIMSEOJIN';
  document.body.appendChild(h1);

  setTimeout(() => {
    location.hash = '#default';
    continueFromIndex();
  }, 5600);
}

function initDefaultPage() {
  document.body.className = 'default-page';
  document.body.innerHTML = '<h1 id="static-title">KIMSEOJIN</h1><div id="divider"></div>';
  placeImages();

  // 👉 insta 아이콘 생성
  const instaIcon = document.createElement('img');
  instaIcon.src = 'img/insta.png';
  instaIcon.style.position = 'fixed';
  instaIcon.style.top = '20px';
  instaIcon.style.right = '20px';
  instaIcon.style.width = '100px';
  instaIcon.style.zIndex = '999';
  instaIcon.style.cursor = 'pointer';
  instaIcon.style.transition = 'transform 0.3s ease';
  instaIcon.onmouseenter = () => instaIcon.style.transform = 'scale(1.2)';
  instaIcon.onmouseleave = () => instaIcon.style.transform = 'scale(1)';

  // 🔗 클릭 시 동작 (예: 인스타 페이지 열기)
  instaIcon.onclick = () => {
    window.open('https://www.instagram.com/photo_estj', '_blank');
    // 또는 다른 기능을 원한다면 여기에 작성
  };

  document.body.appendChild(instaIcon);
}


function initAbangPage(){
  document.body.className='abang-page';
  document.body.innerHTML='';
  const wrap=document.createElement('div');document.body.appendChild(wrap);
  Array.from({length:5},(_,i)=>`IMG/abang_${i+1}.jpg`).forEach(src=>{
    const sec=document.createElement('div');sec.className='abang-section';
    const IMG=document.createElement('IMG');IMG.src=src;sec.appendChild(IMG);wrap.appendChild(sec);
  });
  const red=document.createElement('IMG');red.id='redIcon';red.src='IMG/red1.png';
  red.onmouseenter=()=>red.src='IMG/red2.png';
  red.onmouseleave=()=>red.src='IMG/red1.png';
  red.onclick=()=>{location.hash='';location.reload();};
  document.body.appendChild(red);
  red.onclick = () => {
  location.hash = '#default';
  location.reload();
};
}

function initDnjsPage() {
  document.body.className = 'dnjs-page';
  document.body.innerHTML = `
    <div class="dnjs-container">
      <IMG src="IMG/sh_1.png" class="dnjs-image" id="dnjsMain">
    </div>
  `;

  const hint = document.createElement('div');
  hint.className = 'dnjs-hint';
  hint.textContent = 'Click the image!';
  document.body.appendChild(hint);

  const container = document.querySelector('.dnjs-container');
  const mainImage = document.getElementById('dnjsMain');

  const imageList = ['sh_1.png', 'sh_2.jpg', 'sh_3.jpg', 'sh_4.jpg', 'sh_5.jpg', 'sh_6.jpg', 'sh_7.jpg', 'sh_8.jpg'];
  let index = 0;

  mainImage.addEventListener('click', () => {
    // 다음 인덱스 (순환)
    index = (index + 1) % imageList.length;

    // 페이드 아웃 후 이미지 교체 → 다시 페이드 인
    mainImage.style.opacity = '0';

    setTimeout(() => {
      mainImage.src = `IMG/${imageList[index]}`;
      mainImage.onload = () => {
        mainImage.style.opacity = '1';
      };
    }, 300);
  });
      const smallIcon = document.createElement('img');
  smallIcon.src = 'IMG/dnjs_1.png';
  smallIcon.className = 'dnjs-corner-icon';

  smallIcon.addEventListener('mouseenter', () => {
    smallIcon.src = 'IMG/dnjs_2.png';
  });

  smallIcon.addEventListener('mouseleave', () => {
    smallIcon.src = 'IMG/dnjs_1.png';
  });

  smallIcon.addEventListener('click', () => {
    location.hash = '#default';
    location.reload();
  });

  document.body.appendChild(smallIcon);

}


function initMediaPage(files, icon1, icon2, pageId) {
  document.body.innerHTML = `<IMG id="firstMedia" src="IMG/${files[0]}"><div id="grid-container"></div>`;
  const first = document.getElementById('firstMedia');
  const grid = document.getElementById('grid-container');

  first.onclick = () => showModal(files[0]);
  setTimeout(() => first.style.transform = 'translate(-50%,-50%) scale(.4)', 2000);

  first.addEventListener('transitionend', () => {
    const icon = document.createElement('IMG');
    icon.id = `${pageId}Icon`;
    icon.src = 'IMG/' + icon1;
    icon.onmouseenter = () => icon.src = 'IMG/' + icon2;
    icon.onmouseleave = () => icon.src = 'IMG/' + icon1;
    icon.onclick = () => {
      location.hash = '#default';
      location.reload();
    };

    // ⭐ 위치 및 크기 명시
    icon.style.position = 'fixed';
    icon.style.top = '10px';
    icon.style.left = pageId === 'tree' ? '10px' : '';
    icon.style.right = pageId === 'human' ? '10px' : '';
    icon.style.width = '120px';
    icon.style.zIndex = '999';
    icon.style.cursor = 'pointer';

    document.body.appendChild(icon);

    const rect = first.getBoundingClientRect();
    grid.style.top = rect.bottom + 20 + 'px';
    files.slice(1, 13).forEach(f => {
      const im = document.createElement('img');
      im.src = 'img/' + f;
      im.style.height = rect.height + 'px';
      im.onclick = () => showModal(f);
      grid.appendChild(im);
    });
    grid.style.display = 'grid';
  });
}



function initDarlPage(){
  document.body.className='darl-page';document.body.innerHTML='';
  const gal=document.createElement('div');gal.className='stacked-gallery';
  Array.from({length:10},(_,i)=>`IMG/darl_${i+1}.jpg`).forEach(src=>{
    const sec=document.createElement('section');
    const IMG=document.createElement('IMG');IMG.src=src;sec.appendChild(IMG);gal.appendChild(sec);
  });
  document.body.appendChild(gal);
  const dk=document.createElement('IMG');dk.id='darlIcon';dk.src='IMG/skql1.png';
  dk.onmouseenter=()=>dk.src='IMG/skql2.png';
  dk.onmouseleave=()=>dk.src='IMG/skql1.png';
  dk.onclick=()=>{location.hash='';location.reload();};
  document.body.appendChild(dk);
  dk.onclick = () => {
  location.hash = '#default';
  location.reload();
};
}

function initGitarPage(){
  document.body.className='gitar-page';document.body.innerHTML='';
  const slide=document.createElement('div');slide.id='gitarSlideshow';
  const IMG=document.createElement('IMG');slide.appendChild(IMG);document.body.appendChild(slide);
  const gIcon=document.createElement('IMG');gIcon.id='gitarIcon';gIcon.src='IMG/gitar.png';
  gIcon.onclick=()=>{location.hash='';location.reload();};
  document.body.appendChild(gIcon);
  IMG.onclick=()=>showModal(IMG.src.replace('IMG/',''));
  let idx=0;
  function next(){
    IMG.style.opacity=0;
    setTimeout(()=>{
      if(idx<gitarFiles.length){
        IMG.src='IMG/'+gitarFiles[idx++];
        IMG.onload=()=>{IMG.style.opacity=1;setTimeout(next,2000);}        
      }else{
        slide.remove();
        const grid=document.createElement('div');grid.id='gitarGrid';
        gitarFiles.forEach(src=>{
          const gi=document.createElement('IMG');gi.src='IMG/'+src;gi.onclick=()=>showModal(src);grid.appendChild(gi);
        });
        document.body.appendChild(grid);grid.style.display='grid';
      }
    },1000);
  }
  IMG.src='IMG/'+gitarFiles[idx++];IMG.onload=()=>{IMG.style.opacity=1;setTimeout(next,2000);}
  gIcon.onclick = () => {
  location.hash = '#default';
  location.reload();
}; 
}

function continueFromIndex() {
  document.body.className = 'default-page';

  // KIMSEOJIN 텍스트가 이미 있는지 체크
  let intro = document.getElementById('intro-text') || document.getElementById('static-title');

  if (!intro) {
    intro = document.createElement('h1');
    intro.id = 'static-title';
    intro.textContent = 'KIMSEOJIN';
    intro.style.position = 'fixed';
    intro.style.top = '20px';
    intro.style.left = '20px';
    intro.style.transform = 'scale(0.4)';
    intro.style.fontSize = 'clamp(48px,10vw,160px)';
    intro.style.fontWeight = '700';
    intro.style.color = '#000';
    intro.style.zIndex = '10';
    intro.style.userSelect = 'none';
    intro.style.transformOrigin = 'left top';
    document.body.appendChild(intro);
  }

  const divider = document.createElement('div');
  divider.id = 'divider';
  document.body.appendChild(divider);

  placeImages(); // 아이콘들 랜덤 배치
}


function initLipPage(){
  document.body.className='lip-page';document.body.innerHTML='';
  const cont=document.createElement('div');cont.className='lip-container';document.body.appendChild(cont);
  const slide=document.createElement('IMG');slide.className='lip-slide lip-first';slide.src='IMG/'+lipSlides[0];cont.appendChild(slide);
  slide.onload=()=>slide.style.opacity=1;
  // corner icon
  const icon=document.createElement('IMG');icon.id='lipIcon';icon.src='IMG/lip_1.png';
  icon.onmouseenter=()=>icon.src='IMG/lip_2.png';
  icon.onmouseleave=()=>icon.src='IMG/lip_1.png';
  icon.onclick=()=>{location.hash='#default';location.reload();};
  document.body.appendChild(icon);
  let idx=0;
  setTimeout(()=>{slide.classList.remove('lip-first');loopSlides();},2000);
  function loopSlides(){
    const show=2000,fade=500;
    setTimeout(()=>{
      slide.style.opacity=0;
      setTimeout(()=>{
        idx=(idx+1)%lipSlides.length;
        slide.src='IMG/'+lipSlides[idx];
        slide.onload=()=>{
          slide.style.opacity=1;
          document.body.style.backgroundColor=idx<3?'#87CEEB':'#000';
          loopSlides();
        };
      },fade);
    },show);
  }
  icon.onclick = () => {
  location.hash = '#default';
  location.reload();
};

}

/***** ROUTER *****/
window.onload=()=>{
  switch(location.hash){
    case '#abang':initAbangPage();break;
    case '#tree':document.body.className='tree-page';initMediaPage(treeFiles,'tomato1.png','tomato2.png','tree');break;
    case '#human':document.body.className='human-page';initMediaPage(humanFiles,'woman1.png','woman2.png','human');break;
    case '#darl':initDarlPage();break;
    case '#gitar':initGitarPage();break;
    case '#lip':initLipPage();break;
    case '#default':continueFromIndex();break;
    case '#dnjs':initDnjsPage();break;
    default:initIndexPage();
  }
};
</script>
</body>
</html>
