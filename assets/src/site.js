/* 槌橋泰雅 ポートフォリオ：動き
   見せ場：最初の画面で大字「遊」を草書で一画ずつ書く（墨が飛び、最後に落款）。字は押すともう一度書く。
   そのほか：なめらかなスクロール（Lenis）・節の見出しの朱の一線・図版は襖が開く・筆先のカーソル。
   動きを減らす設定のときは、全部最後の形で止めて見せる。 */
(function(){
  var doc = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  doc.classList.add('js');
  window.__appReady = true;

  /* ---------- アドレスのコピー ---------- */
  var btn = document.getElementById('copy'), mail = document.getElementById('mail');
  if(btn && mail){
    var label = btn.innerHTML;
    btn.addEventListener('click', function(){
      var txt = mail.textContent.trim();
      function done(m){ btn.innerHTML = m; btn.classList.add('done'); setTimeout(function(){ btn.innerHTML = label; btn.classList.remove('done'); }, 1900); }
      function fallback(){
        try{ var r = document.createRange(); r.selectNodeContents(mail); var s = getSelection(); s.removeAllRanges(); s.addRange(r); done('選択<br>しました'); }
        catch(e){ done('手で<br>コピー'); }
      }
      if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function(){ done('コピー<br>しました'); }).catch(fallback);
      else fallback();
    });
  }

  /* ---------- なめらかなスクロール ---------- */
  var lenis = null;
  if(!reduce && window.Lenis){
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
    window.__lenis = lenis;
    (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(0);
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var id = a.getAttribute('href'); var el = id.length > 1 ? document.querySelector(id) : document.body;
        if(!el) return; e.preventDefault(); lenis.scrollTo(el, { offset: id === '#top' ? 0 : -64, duration: 1.4 });
        history.replaceState(null, '', id);
      });
    });
  }
  function onScroll(fn){ if(lenis) lenis.on('scroll', fn); addEventListener('scroll', fn, { passive: true }); fn(); }

  /* ---------- ヘッダーと目次 ---------- */
  var hd = document.querySelector('.hd');
  var navLinks = [].slice.call(document.querySelectorAll('.nav a'));
  var secs = navLinks.map(function(a){ return document.querySelector(a.getAttribute('href')); });
  onScroll(function(){
    var y = scrollY;
    if(hd) hd.classList.toggle('solid', y > 40);
    var cur = -1;
    secs.forEach(function(s, i){ if(s && s.getBoundingClientRect().top < innerHeight * 0.35) cur = i; });
    navLinks.forEach(function(a, i){ a.classList.toggle('on', i === cur); });
  });

  /* ---------- 節の見出しの朱の一線（筆で引いた形） ---------- */
  function brushPath(seed){
    var r = seed, rnd = function(){ r = (r * 9301 + 49297) % 233280; return r / 233280; };
    var n = 24, top = [], bot = [];
    for(var i = 0; i <= n; i++){
      var t = i / n, x = 2 + t * 196;
      var w = (t < .08 ? t / .08 : t > .8 ? Math.max(.12, (1 - t) / .2) : 1) * (5.2 + rnd() * 1.6);
      var c = 8 + Math.sin(t * 2.4 + seed) * 1.2 - t * 1.4;
      top.push(x.toFixed(1) + ' ' + (c - w / 2 - rnd() * .8).toFixed(1));
      bot.unshift(x.toFixed(1) + ' ' + (c + w / 2 + rnd() * .8).toFixed(1));
    }
    return 'M' + top.join(' L') + ' L' + bot.join(' L') + 'Z';
  }
  document.querySelectorAll('.rule').forEach(function(el, i){
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 200 16'); s.setAttribute('preserveAspectRatio', 'none'); s.setAttribute('class', 'rule'); s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<path d="' + brushPath(i * 37 + 11) + '"/>';
    el.replaceWith(s);
  });

  /* ---------- 図版を襖の枠に入れる ---------- */
  document.querySelectorAll('.media figure').forEach(function(f){
    var img = f.querySelector('img'); if(!img || img.parentElement.classList.contains('fr')) return;
    var fr = document.createElement('div'); fr.className = 'fr'; img.replaceWith(fr); fr.appendChild(img);
  });

  /* ---------- 節の扉の大字（薄い墨）。少し遅れて動く ---------- */
  var SG = window.SECTION_GLYPHS || {}, wms = [];
  Object.keys(SG).forEach(function(id){
    var sec = document.getElementById(id); if(!sec || !sec.classList.contains('band')) return;
    var w = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    w.setAttribute('viewBox', '0 0 1000 1000'); w.setAttribute('class', 'wm'); w.setAttribute('aria-hidden', 'true'); w.setAttribute('focusable', 'false');
    w.innerHTML = '<path d="' + SG[id] + '"/>'; sec.insertBefore(w, sec.firstChild); wms.push(w);
  });
  if(!reduce && wms.length) onScroll(function(){
    wms.forEach(function(w){ var r = w.parentNode.getBoundingClientRect(); if(r.bottom < 0 || r.top > innerHeight) return;
      w.style.transform = 'translateY(' + ((r.top - innerHeight * .3) * -0.12).toFixed(1) + 'px)'; });
  });

  /* ---------- 出てくる動き ---------- */
  var revT = [].slice.call(document.querySelectorAll('.work .body, .about .txt, .tl, .ba > h4, .ba > p, .card, .contact, #analysis .in > p, #analysis .in > .links, footer .in'));
  revT.forEach(function(el){ el.classList.add('rev'); });
  document.querySelectorAll('.grid4').forEach(function(g){ [].slice.call(g.children).forEach(function(c, i){ c.style.setProperty('--d', (i * 0.1) + 's'); }); });
  document.querySelectorAll('.media').forEach(function(g){ [].slice.call(g.children).forEach(function(c, i){ c.style.setProperty('--d', (i * 0.14) + 's'); }); });
  var targets = revT.concat([].slice.call(document.querySelectorAll('.sh, .media figure')));
  if(reduce || !('IntersectionObserver' in window)){
    targets.forEach(function(el){ el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    targets.forEach(function(el){ io.observe(el); });
    // 保険：観測が働かない環境では全部見せる
    setTimeout(function(){ if(!targets.some(function(el){ return el.classList.contains('is-visible'); })) targets.forEach(function(el){ el.classList.add('is-visible'); }); }, 3000);
  }

  /* ---------- 年表の墨の線はスクロールに合わせて伸びる ---------- */
  var tl = document.querySelector('.tl');
  if(tl && !reduce) onScroll(function(){
    var r = tl.getBoundingClientRect(), k = (innerHeight * 0.8 - r.top) / r.height;
    tl.style.setProperty('--tlp', Math.max(0, Math.min(1, k)).toFixed(3));
  });

  /* ---------- 数字が数え上がる ---------- */
  function countUp(el){
    var n = parseInt(el.getAttribute('data-count'), 10), suf = el.getAttribute('data-suffix') || '', fin = isFinite(n) ? n.toLocaleString('ja-JP') + suf : el.textContent;
    if(!isFinite(n) || reduce) return;
    var t0 = null, dur = 900;
    (function step(t){ if(t0 === null) t0 = t; var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(n * e).toLocaleString('ja-JP') + suf; if(k < 1) requestAnimationFrame(step); else el.textContent = fin; })(performance.now());
  }

  /* ---------- スクロール演出と墨のカーソル（GSAP・WebGL）は、読み込みが落ち着いてから別のファイルで ---------- */
  (function(){
    var load = function(){ var sc = document.createElement('script'); sc.src = 'assets/motion.js?v=__MOTV__'; sc.async = true; document.body.appendChild(sc); };
    var idle = function(){ ('requestIdleCallback' in window) ? requestIdleCallback(load, { timeout: 3000 }) : setTimeout(load, 800); };
    if(document.readyState === 'complete') idle(); else addEventListener('load', idle);
  })();

  /* ---------- 大字「遊」を書く ---------- */
  var G = window.HERO_GLYPH, sho = document.querySelector('.sho');
  var h1 = document.querySelector('h1.vt'), foot = document.querySelector('.hero-foot'), hanko = document.querySelector('.hanko'), hero = document.querySelector('.hero');
  // 見出しを1文字ずつに（<br> は残す）
  if(h1){
    var i = 0, frag = document.createDocumentFragment();
    [].slice.call(h1.childNodes).forEach(function(node){
      if(node.nodeType === 1){ frag.appendChild(node.cloneNode(true)); return; }
      node.textContent.split('').forEach(function(c){
        var sp = document.createElement('span'); sp.className = 'ch'; sp.textContent = c; sp.style.setProperty('--d', (i++ * 0.045) + 's'); frag.appendChild(sp);
      });
    });
    h1.innerHTML = ''; h1.appendChild(frag);
  }
  function finishText(){
    if(h1) h1.classList.add('go');
    if(foot) foot.classList.add('go');
    document.querySelectorAll('.stats [data-count]').forEach(function(el, k){ setTimeout(function(){ countUp(el); }, 350 + k * 90); });
  }
  if(!G || !sho){ finishText(); return; }
  setTimeout(finishText, 9000);   // 保険：演出が途中で止まっても本文は必ず見せる
  var shaku = sho.querySelector('.shaku');

  var NS = 'http://www.w3.org/2000/svg', S = G.size;
  var svg = sho.querySelector('svg');
  svg.setAttribute('viewBox', '0 0 ' + S + ' ' + S);
  var defs = '<defs>' +
    '<filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9"/></filter>' +
    '<filter id="bleed" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="60" result="d"/><feGaussianBlur in="d" stdDeviation="16"/></filter>' +
    '<mask id="yuM" maskUnits="userSpaceOnUse" x="0" y="0" width="' + S + '" height="' + S + '"><rect width="' + S + '" height="' + S + '" fill="#000"/><g id="yuStrokes" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"></g><rect id="yuAll" width="' + S + '" height="' + S + '" fill="#fff" opacity="0"/></mask>' +
    '</defs>';
  svg.innerHTML = defs +
    '<g class="wash" filter="url(#bleed)"><path d="' + G.glyph + '"/></g>' +
    '<path class="glyph" d="' + G.glyph + '" mask="url(#yuM)" filter="url(#rough)"/>';
  var wash = svg.querySelector('.wash'), gStrokes = svg.querySelector('#yuStrokes'), all = svg.querySelector('#yuAll');
  var strokes = G.strokes.map(function(s){
    var p = document.createElementNS(NS, 'path'); p.setAttribute('d', s.d); p.setAttribute('stroke-width', s.w);
    gStrokes.appendChild(p); var L = p.getTotalLength(); p.style.strokeDasharray = L + ' ' + (L + 10); p.style.strokeDashoffset = L;
    return { el: p, L: L, w: s.w };
  });

  /* 墨の飛沫（キャンバス）：飛んで、止まったら紙に残る */
  var cv = sho.querySelector('canvas'), ctx = cv.getContext('2d'), dpr = Math.min(2, devicePixelRatio || 1);
  var stain = document.createElement('canvas'), sctx = stain.getContext('2d');
  var drops = [], leaf = [], W = 0, H = 0, scale = 1, off = 0;
  function size(){
    dpr = Math.min(2, devicePixelRatio || 1);
    var r = cv.getBoundingClientRect(), nw = Math.round(r.width * dpr), nh = Math.round(r.height * dpr);
    if(nw === cv.width && nh === cv.height) return;
    var keep = null;
    if(stain.width){ keep = document.createElement('canvas'); keep.width = stain.width; keep.height = stain.height; keep.getContext('2d').drawImage(stain, 0, 0); }
    W = r.width; H = r.height;
    [cv, stain].forEach(function(c){ c.width = nw; c.height = nh; });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if(keep) sctx.drawImage(keep, 0, 0, W, H);
    scale = (W / 1.44) / S; off = W * (0.22 / 1.44);
    kick();
  }
  size(); addEventListener('resize', size);
  function toPx(x, y){ return [off + x * scale, off + y * scale]; }
  function ink(a){ return 'rgba(27,25,22,' + a + ')'; }
  function splash(x, y, power, dir){
    var n = Math.round(4 + power * 14);
    for(var k = 0; k < n; k++){
      var big = Math.pow(Math.random(), 2.8), ang = (dir != null ? dir + (Math.random() - .5) * 2.2 : Math.random() * 6.283);
      var sp = (1 + Math.random() * 6) * (1.15 - big) * (0.5 + power) * scale * 2;
      drops.push({ x: x, y: y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, r: (0.8 + big * 7.5) * scale * 2.4 * (0.6 + power * .6), life: 0, a: .82 + Math.random() * .18 });
    }
  }
  function stamp(d){
    sctx.fillStyle = ink(d.a);
    var sp = Math.hypot(d.vx, d.vy), ang = Math.atan2(d.vy, d.vx);
    sctx.save(); sctx.translate(d.x, d.y); sctx.rotate(ang);
    sctx.beginPath(); sctx.ellipse(0, 0, d.r * (1 + Math.min(1.6, sp * .05)), d.r * .85, 0, 0, 6.283); sctx.fill();
    if(d.r > 3 && Math.random() < .5){ sctx.beginPath(); sctx.arc(d.r * 1.4, d.r * .3, d.r * .35, 0, 6.283); sctx.fill(); }
    sctx.restore();
  }
  for(var q = 0; q < 6; q++) leaf.push({ x: Math.random(), y: Math.random(), s: 1.2 + Math.random() * 2, rot: Math.random() * 6, vr: (Math.random() - .5) * .01, vy: .00004 + Math.random() * .00008, ph: Math.random() * 6, on: 0 });
  var running = false, heroVisible = true;
  if('IntersectionObserver' in window) new IntersectionObserver(function(es){ heroVisible = es[0].isIntersecting; if(heroVisible) kick(); }).observe(hero || sho);
  function frame(){
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(stain, 0, 0, W, H);
    for(var k = drops.length - 1; k >= 0; k--){
      var d = drops[k]; d.life++; d.x += d.vx; d.y += d.vy; d.vx *= .86; d.vy = d.vy * .86 + .05 * scale;
      if(Math.hypot(d.vx, d.vy) < .25 || d.life > 50){ stamp(d); drops.splice(k, 1); continue; }
      ctx.fillStyle = ink(d.a); ctx.beginPath(); ctx.arc(d.x, d.y, d.r * .8, 0, 6.283); ctx.fill();
    }
    // 金箔：ゆっくり漂う
    var t = performance.now() / 1000;
    leaf.forEach(function(l){
      if(l.on <= 0) return; l.y -= l.vy * 16; l.rot += l.vr; if(l.y < -.05) l.y = 1.05;
      var x = l.x * W, y = l.y * H, a = l.on * (.35 + .25 * Math.sin(t * 1.3 + l.ph));
      ctx.save(); ctx.translate(x + Math.sin(t * .6 + l.ph) * 8, y); ctx.rotate(l.rot); var ls = Math.min(1, W / 900); ctx.scale(ls, ls);
      ctx.fillStyle = 'rgba(168,135,58,' + a.toFixed(3) + ')';
      ctx.beginPath(); ctx.moveTo(-l.s, -l.s * .4); ctx.lineTo(l.s * .7, -l.s * .7); ctx.lineTo(l.s, l.s * .3); ctx.lineTo(-l.s * .3, l.s * .8); ctx.closePath(); ctx.fill(); ctx.restore();
    });
    if(running || drops.length || (heroVisible && leaf.some(function(l){ return l.on > 0; }))) requestAnimationFrame(frame); else frameOn = false;
  }
  var frameOn = false;
  function kick(){ if(!frameOn){ frameOn = true; requestAnimationFrame(frame); } }

  function ease(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  var playId = 0, speed = 1;
  try{ if(localStorage.getItem('yuSeen')) speed = 2.6; localStorage.setItem('yuSeen', '1'); }catch(e){}
  function play(){
    var id = ++playId; running = true; kick();
    if(hanko) hanko.classList.remove('on');
    if(shaku) shaku.classList.remove('on');
    all.style.transition = 'none'; all.setAttribute('opacity', '0');
    strokes.forEach(function(s){ s.el.style.strokeDashoffset = s.L; });
    sctx.clearRect(0, 0, W, H); drops.length = 0;
    wash.style.transition = 'none'; wash.style.opacity = 0;
    leaf.forEach(function(l){ l.on = 0; });
    var k = 0;
    function next(){
      if(id !== playId) return;
      if(k >= strokes.length){ return end(); }
      var s = strokes[k], dur = (260 + s.L * 0.9) / speed, t0 = performance.now(), start = s.el.getPointAtLength(0), p0 = toPx(start.x, start.y);
      var pa = s.el.getPointAtLength(Math.min(s.L, 30)), dir0 = Math.atan2(pa.y - start.y, pa.x - start.x) + Math.PI;
      splash(p0[0], p0[1], k === 0 ? .6 : .5, dir0);   // 打ち込み：筆を置いた所から、来た向きへ墨が散る
      (function step(now){
        if(id !== playId) return;
        var u = Math.min(1, (now - t0) / dur), e = ease(u), len = s.L * e;
        s.el.style.strokeDashoffset = (s.L - len).toFixed(1);
        var pt = s.el.getPointAtLength(len), px = toPx(pt.x, pt.y);
        if(Math.random() < .06) splash(px[0], px[1], .02, null);       // 筆先のしぶき（まれに）
        if(u < 1) requestAnimationFrame(step);
        else { var pe = s.el.getPointAtLength(s.L), pb = s.el.getPointAtLength(Math.max(0, s.L - 30));
          splash(toPx(pe.x, pe.y)[0], toPx(pe.x, pe.y)[1], .35, Math.atan2(pe.y - pb.y, pe.x - pb.x));   // 払い
          k++; setTimeout(next, 70 / speed); }
      })(t0);
    }
    function end(){
      all.style.transition = 'opacity .5s'; all.setAttribute('opacity', '1');       // 筆が届かなかった細部も最後に現れる
      wash.style.transition = 'opacity 1.6s ease-out'; wash.style.opacity = .13;
      setTimeout(function(){
        if(id !== playId) return;
        if(hanko){ hanko.classList.add('on'); }
        if(hero){ hero.classList.remove('shake'); void hero.offsetWidth; hero.classList.add('shake'); }
        var hb = hanko ? hanko.getBoundingClientRect() : null, cb = cv.getBoundingClientRect();
        if(hb){ var hx = hb.left + hb.width / 2 - cb.left, hy = hb.top + hb.height / 2 - cb.top; splash(hx, hy, .25, null); }
        leaf.forEach(function(l, j){ setTimeout(function(){ if(id !== playId) return; l.on = 1; kick(); }, 200 + j * 90); });
        if(shaku) shaku.classList.add('on');
        running = false; kick();
        finishText();
      }, 260);
    }
    setTimeout(next, 450 / speed);
  }
  if(reduce){
    strokes.forEach(function(s){ s.el.style.strokeDashoffset = 0; }); all.setAttribute('opacity', '1'); wash.style.opacity = .13;
    if(hanko) hanko.classList.add('on'); if(shaku) shaku.classList.add('on'); finishText();
  } else {
    var started = false;
    function go(){ if(started) return; started = true; try{ play(); }catch(e){ all.setAttribute('opacity', '1'); finishText(); } }
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(go); setTimeout(go, 1200);
  }
  sho.addEventListener('click', function(){ if(!reduce) play(); });

  /* 字はスクロールで少し遅れて上がり、薄れる */
  if(!reduce) onScroll(function(){
    var y = scrollY, h = innerHeight;
    if(y > h * 1.2) return;
    sho.style.transform = 'translateY(' + (y * 0.18).toFixed(1) + 'px)';
    sho.style.opacity = Math.max(0, 1 - y / (h * 0.9)).toFixed(3);
  });

  /* ---------- カーソル：筆先と、すぐ消える墨の跡 ---------- */
  if(fine && !reduce){
    var tr = document.createElement('canvas'); tr.id = 'trail'; tr.setAttribute('aria-hidden', 'true');
    var tip = document.createElement('div'); tip.className = 'tip'; tip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tr); document.body.appendChild(tip);
    var tc = tr.getContext('2d'), pts = [], mx = -99, my = -99, lastT = 0, live = false;
    function tsize(){ dpr = Math.min(2, devicePixelRatio || 1); tr.width = innerWidth * dpr; tr.height = innerHeight * dpr; tc.setTransform(dpr, 0, 0, dpr, 0, 0); }
    tsize(); addEventListener('resize', tsize);
    addEventListener('pointermove', function(e){
      if(e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY; tip.style.transform = 'translate(' + mx + 'px,' + my + 'px)'; tip.classList.add('on');
      var t = e.target && e.target.closest ? e.target.closest('a,button') : null; tip.classList.toggle('hot', !!t);
      var now = performance.now(), last = pts[pts.length - 1];
      var v = last ? Math.hypot(mx - last.x, my - last.y) / Math.max(1, now - last.t) : 0;
      pts.push({ x: mx, y: my, t: now, w: Math.max(1.2, 7 - v * 3.2) });
      if(!live){ live = true; requestAnimationFrame(draw); }
    }, { passive: true });
    document.addEventListener('pointerleave', function(){ tip.classList.remove('on'); });
    function draw(now){
      tc.clearRect(0, 0, innerWidth, innerHeight);
      while(pts.length && now - pts[0].t > 520) pts.shift();
      for(var k = 1; k < pts.length; k++){
        var a = pts[k - 1], b = pts[k], age = 1 - (now - b.t) / 520;
        tc.strokeStyle = 'rgba(27,25,22,' + (age * 0.22).toFixed(3) + ')'; tc.lineWidth = b.w * age; tc.lineCap = 'round';
        tc.beginPath(); tc.moveTo(a.x, a.y); tc.lineTo(b.x, b.y); tc.stroke();
      }
      if(pts.length > 1) requestAnimationFrame(draw); else { live = false; tc.clearRect(0, 0, innerWidth, innerHeight); }
    }
  }
})();
