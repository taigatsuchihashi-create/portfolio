/* スクロールの演出（GSAP 3.15＋ScrollTrigger＋SplitText）と、墨のにじむカーソル（WebGL）。
   site.js のあとに読む。動きを減らす設定・GSAP が無いときは何もしない（site.js の素の演出のまま）。 */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- 墨のにじむカーソル（WebGL）：筆先の通った跡が和紙ににじんで、ゆっくり薄れる ---------- */
  (function(){
    if(reduce || !fine) return;
    var cv = document.createElement('canvas'); cv.id = 'ink'; cv.setAttribute('aria-hidden', 'true');
    var gl = cv.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if(!gl) return;                                            // WebGL が無ければ site.js の細い跡のまま
    var old = document.getElementById('trail'); if(old) old.remove();
    document.body.appendChild(cv);
    var VS = 'attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0,1);}';
    // にじみ：周りへ少し広がりながら薄れる＋筆の線を足す（線分の距離で）
    var FS_SIM = 'precision highp float;varying vec2 uv;uniform sampler2D prev;uniform vec2 px;uniform vec2 a;uniform vec2 b;uniform float w;uniform float amt;uniform float t;' +
      'float h(vec2 q){return fract(sin(dot(q,vec2(127.1,311.7)))*43758.5453);}' +
      'void main(){float c=texture2D(prev,uv).r*.4;' +
      'vec2 j=vec2(h(uv*91.+t),h(uv*57.-t))-.5;' +
      'c+=(texture2D(prev,uv+vec2(px.x,0)+j*px).r+texture2D(prev,uv-vec2(px.x,0)+j*px).r+texture2D(prev,uv+vec2(0,px.y)-j*px).r+texture2D(prev,uv-vec2(0,px.y)-j*px).r)*.15;' +
      'c*=.955;' +
      'vec2 ab=b-a;float k=clamp(dot(uv-a,ab)/max(dot(ab,ab),1e-6),0.,1.);vec2 d=(uv-(a+ab*k))/px;float r=length(d);' +
      'c=max(c,amt*smoothstep(w,w*.35,r));gl_FragColor=vec4(c,0,0,1);}';
    // 描く：濃さを墨の色に。紙のすじで縁をかすれさせる
    var FS_OUT = 'precision highp float;varying vec2 uv;uniform sampler2D src;uniform vec2 res;' +
      'float h(vec2 q){return fract(sin(dot(q,vec2(12.9898,78.233)))*43758.5453);}' +
      'void main(){float c=texture2D(src,uv).r;vec2 g=uv*res;float fib=h(floor(g*vec2(.35,.12)+floor(g.yx*.02)))*.18+h(floor(g*.5))*.14;' +
      'float a=smoothstep(.06,.65,c-fib*.35)*.3;gl_FragColor=vec4(vec3(.106,.098,.086)*a,a);}';
    function sh(type, src){ var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
    function prog(fs){ var p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
      if(!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('ink shader'); return p; }
    var sim, out;
    try{ sim = prog(FS_SIM); out = prog(FS_OUT); }catch(e){ cv.remove(); return; }
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    var W, H, S = 0.5, tex = [], fb = [], cur = 0;
    function target(){ var t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, W, H, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      var f = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      return [t, f]; }
    function resize(){ cv.width = innerWidth; cv.height = innerHeight; W = Math.max(2, Math.round(innerWidth * S)); H = Math.max(2, Math.round(innerHeight * S));
      tex.forEach(function(t){ gl.deleteTexture(t); }); fb.forEach(function(f){ gl.deleteFramebuffer(f); });
      tex = []; fb = []; for(var i = 0; i < 2; i++){ var r = target(); tex.push(r[0]); fb.push(r[1]); } }
    resize(); addEventListener('resize', resize);
    var a = null, b = null, amt = 0, w = 3, live = 0, last = 0;
    addEventListener('pointermove', function(e){
      if(e.pointerType !== 'mouse') return;
      var p = [e.clientX / innerWidth, 1 - e.clientY / innerHeight], now = performance.now();
      var v = b ? Math.hypot((p[0] - b[0]) * innerWidth, (p[1] - b[1]) * innerHeight) / Math.max(8, now - last) : 0;
      a = (b && now - last < 120) ? b : p; b = p; last = now;   // 間があいたら線をつながない
      w = Math.max(1.4, 5.5 - v * 2.2) * (innerWidth / 1440 + .4);   // 速く動かすほど細く（筆の払い）
      amt = 1; live = 70; if(!running){ running = true; requestAnimationFrame(step); }
    }, { passive: true });
    var running = false, t0 = performance.now();
    function step(){
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.useProgram(sim); gl.viewport(0, 0, W, H);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb[1 - cur]); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex[cur]);
      var lp = gl.getAttribLocation(sim, 'p'); gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1i(gl.getUniformLocation(sim, 'prev'), 0); gl.uniform2f(gl.getUniformLocation(sim, 'px'), 1 / W, 1 / H);
      gl.uniform2f(gl.getUniformLocation(sim, 'a'), (a || [-9, -9])[0], (a || [-9, -9])[1]); gl.uniform2f(gl.getUniformLocation(sim, 'b'), (b || [-9, -9])[0], (b || [-9, -9])[1]);
      gl.uniform1f(gl.getUniformLocation(sim, 'w'), w); gl.uniform1f(gl.getUniformLocation(sim, 'amt'), amt); gl.uniform1f(gl.getUniformLocation(sim, 't'), (performance.now() - t0) * .001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); cur = 1 - cur; amt = 0; a = b;
      gl.useProgram(out); gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, cv.width, cv.height);
      gl.bindTexture(gl.TEXTURE_2D, tex[cur]);
      var lo = gl.getAttribLocation(out, 'p'); gl.enableVertexAttribArray(lo); gl.vertexAttribPointer(lo, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1i(gl.getUniformLocation(out, 'src'), 0); gl.uniform2f(gl.getUniformLocation(out, 'res'), cv.width, cv.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if(--live > 0) requestAnimationFrame(step); else { running = false; gl.clear(gl.COLOR_BUFFER_BIT); }
    }
  })();

  /* ---------- GSAP のスクロール演出（読み込みが落ち着いてから組む：最初の表示を待たせない） ---------- */
  if(reduce || !window.gsap || !window.ScrollTrigger) return;
  function later(fn){ ('requestIdleCallback' in window) ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200); }
  later(function(){
  gsap.registerPlugin(ScrollTrigger); if(window.SplitText) gsap.registerPlugin(SplitText);
  var lenis = window.__lenis;
  if(lenis){ lenis.on('scroll', ScrollTrigger.update); }
  document.documentElement.classList.add('gs');

  // 節の見出し：1文字ずつ墨がにじんで現れる（CSS の幕開けは止め、こちらに任せる）
  document.querySelectorAll('.sh h2').forEach(function(h){
    if(!window.SplitText) return;
    var st = new SplitText(h, { type: 'chars', charsClass: 'sc' });
    gsap.from(st.chars, { opacity: 0, filter: 'blur(6px)', yPercent: 40, duration: 0.85, ease: 'power3.out', stagger: 0.025, clearProps: 'filter',
      scrollTrigger: { trigger: h, start: 'top 85%', once: true } });
  });

  // 図版：額の中で少し遅れて動く（奥行き）
  document.querySelectorAll('.media .fr img').forEach(function(img){
    gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: img.closest('.fr'), start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // 進め方の漢数字：筆で引くように左から現れる
  document.querySelectorAll('.card .n').forEach(function(n){
    gsap.from(n, { clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: n, start: 'top 85%', once: true } });
  });

  // 連絡先の締め：縦書きの一言が上から書かれる
  var close = document.querySelector('.vt-close');
  if(close && window.SplitText){
    var cs = new SplitText(close, { type: 'chars' });
    gsap.from(cs.chars, { opacity: 0, filter: 'blur(8px)', y: -14, duration: 1, stagger: 0.07, ease: 'power2.out', scrollTrigger: { trigger: close, start: 'top 80%', once: true } });
  }
  ScrollTrigger.refresh();
  });
})();
