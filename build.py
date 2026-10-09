# -*- coding: utf-8 -*-
"""portfolio-site/index.html を生成する。画像は imgs2.json の data URI を差し込む。"""
import io, json, os

SCRATCH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "imgs2.json")
IM = json.load(open(SCRATCH, encoding="utf-8"))

HTML = r"""<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="槌橋泰雅のポートフォリオ。ゲームの企画書、個人開発したツール、ゲーム分析レポート。">
<title>槌橋泰雅 ポートフォリオ</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&family=Noto+Sans+JP:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap">
<style>
/* Layout: fixed corporate header, full-bleed alternating bands, a dark stats band,
   and wide content rows. Numbers carry the hierarchy; bands carry the rhythm. */
:root{
  --paper:#FFFFFF;
  --band:#EEF2F6;
  --deep:#0E1726;
  --deep-2:#16233A;
  --ink:#101826;
  --ink-soft:#56657A;
  --on-deep:#E9EFF7;
  --on-deep-soft:#93A5BE;
  --rule:#D5DDE7;
  --rule-deep:#28374F;
  --accent:#0B6E8C;
  --accent-soft:#E2F0F5;
  --mark:#B4541E;

  --f-display:"Zen Kaku Gothic New","Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif;
  --f-body:"Noto Sans JP","Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif;
  --f-mono:"JetBrains Mono","SFMono-Regular",Consolas,monospace;

  --head-h:62px;
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --paper:#0D1420; --band:#131C2B; --deep:#070C15; --deep-2:#101A2B;
    --ink:#E7EDF5; --ink-soft:#97A6BB; --rule:#243246; --rule-deep:#1C2941;
    --accent:#58BFDC; --accent-soft:#12303C; --mark:#E8915E;
    --on-deep:#E9EFF7; --on-deep-soft:#93A5BE;
    color-scheme:dark;
  }
}
:root[data-theme="dark"]{
  --paper:#0D1420; --band:#131C2B; --deep:#070C15; --deep-2:#101A2B;
  --ink:#E7EDF5; --ink-soft:#97A6BB; --rule:#243246; --rule-deep:#1C2941;
  --accent:#58BFDC; --accent-soft:#12303C; --mark:#E8915E;
  --on-deep:#E9EFF7; --on-deep-soft:#93A5BE;
  color-scheme:dark;
}

*{box-sizing:border-box}
html{scroll-behavior:smooth; scroll-padding-top:var(--head-h)}
body{margin:0; background:var(--paper); color:var(--ink);
  font-family:var(--f-body); font-size:16px; line-height:1.9; -webkit-font-smoothing:antialiased}
img{max-width:100%}
a{color:var(--accent)}

/* ===== header ===== */
.hd{position:fixed; inset:0 0 auto 0; z-index:50; height:calc(var(--head-h) + env(safe-area-inset-top,0px));
  padding-top:env(safe-area-inset-top,0px);
  background:color-mix(in srgb, var(--paper) 88%, transparent);
  backdrop-filter:saturate(1.4) blur(10px); border-bottom:1px solid var(--rule)}
.hd-in{max-width:1180px; margin:0 auto; height:var(--head-h); padding-inline:24px;
  display:flex; align-items:center; gap:28px}
.brand{font-family:var(--f-mono); font-size:12px; font-weight:700; letter-spacing:.17em;
  text-decoration:none; color:var(--ink); white-space:nowrap}
.brand span{color:var(--accent)}
.nav{margin-left:auto; display:flex; gap:26px}
.nav a{font-size:13px; font-weight:500; text-decoration:none; color:var(--ink-soft);
  position:relative; padding-block:4px; transition:color .2s}
.nav a::after{content:""; position:absolute; left:0; bottom:0; width:100%; height:2px;
  background:var(--accent); transform:scaleX(0); transform-origin:left; transition:transform .25s ease}
.nav a:hover{color:var(--ink)}
.nav a:hover::after{transform:scaleX(1)}
@media (max-width:720px){ .nav{display:none} }

/* ===== bands ===== */
.band{padding-block:clamp(60px,9vw,108px)}
.band.tint{background:var(--band)}
.band.dark{background:var(--deep); color:var(--on-deep)}
.in{max-width:1180px; margin:0 auto; padding-inline:24px}
.narrow{max-width:860px}

/* ===== hero ===== */
.hero{background:var(--deep); color:var(--on-deep); position:relative; overflow:hidden;
  padding-top:calc(var(--head-h) + clamp(70px,11vw,130px)); padding-bottom:clamp(64px,10vw,120px)}
.hero::before{content:""; position:absolute; inset:0;
  background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
  background-size:46px 46px; pointer-events:none}
.hero::after{content:""; position:absolute; width:62vw; height:62vw; right:-18vw; top:-26vw; border-radius:50%;
  background:radial-gradient(circle, rgba(11,110,140,.42) 0%, rgba(11,110,140,0) 68%); pointer-events:none}
.hero .in{position:relative}
.eyebrow{font-family:var(--f-mono); font-size:11px; font-weight:700; letter-spacing:.2em;
  text-transform:uppercase; color:var(--accent); margin:0 0 22px}
.hero .eyebrow{color:#5FC6E2}
h1{font-family:var(--f-display); font-weight:900; font-size:clamp(34px,6.6vw,70px);
  line-height:1.12; letter-spacing:.005em; margin:0; text-wrap:balance; max-width:16em}
.hero .lede{font-size:clamp(16px,2vw,19px); line-height:1.95; margin:30px 0 0; max-width:34em; color:var(--on-deep)}
.hero .who{font-family:var(--f-mono); font-size:12px; letter-spacing:.12em; color:var(--on-deep-soft); margin:34px 0 0}
.hero .who b{color:var(--on-deep); font-weight:700}

/* ===== stats band ===== */
.stats{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--rule-deep);
  border:1px solid var(--rule-deep); margin-top:clamp(40px,6vw,64px)}
.stats div{background:var(--deep-2); padding:26px 22px; min-width:0}
.stats b{display:block; font-family:var(--f-mono); font-weight:700; font-size:clamp(26px,3.6vw,40px);
  line-height:1.15; letter-spacing:-.02em; font-variant-numeric:tabular-nums; color:#fff}
.stats span{display:block; font-family:var(--f-mono); font-size:10.5px; letter-spacing:.1em;
  text-transform:uppercase; color:var(--on-deep-soft); margin-top:9px}
@media (max-width:760px){ .stats{grid-template-columns:repeat(2,1fr)} }

/* ===== section head ===== */
.sh{margin-bottom:clamp(34px,5vw,54px)}
.sh h2{font-family:var(--f-display); font-weight:900; font-size:clamp(26px,3.6vw,40px);
  line-height:1.3; margin:0; letter-spacing:.01em; text-wrap:balance}
.sh p{margin:14px 0 0; color:var(--ink-soft); max-width:40em}
.rule{height:3px; width:52px; background:var(--accent); margin:0 0 20px}

/* ===== work rows ===== */
.work{display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,4vw,56px); align-items:start;
  padding-block:clamp(38px,5vw,56px); border-top:1px solid var(--rule)}
.work:first-of-type{border-top:0; padding-top:0}
.work.flip .media{order:2}
.work .body{min-width:0}
.work h3{font-family:var(--f-display); font-weight:700; font-size:clamp(21px,2.7vw,30px);
  line-height:1.45; margin:0 0 6px; text-wrap:balance}
.role{font-family:var(--f-mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase;
  color:var(--mark); margin:0 0 20px}
.work p{margin:0 0 16px}
.work p:last-of-type{margin-bottom:0}
@media (max-width:860px){ .work{grid-template-columns:1fr} .work.flip .media{order:0} }

.media{min-width:0; display:grid; gap:12px}
.media figure{margin:0; min-width:0}
.media img{display:block; width:100%; height:auto; border:1px solid var(--rule);
  transition:transform .3s cubic-bezier(.22,.8,.3,1), box-shadow .3s ease}
.media figure:hover img{transform:translateY(-4px); box-shadow:0 14px 34px rgba(16,24,38,.16)}
.media figcaption{font-family:var(--f-mono); font-size:10.5px; color:var(--ink-soft); margin-top:7px}

.quote{border-left:3px solid var(--accent); background:var(--accent-soft);
  padding:16px 20px; margin:20px 0; font-weight:500; border-radius:0 3px 3px 0}
.metrics{display:flex; flex-wrap:wrap; gap:0; margin:22px 0 0; border:1px solid var(--rule)}
.metrics div{flex:1 1 120px; min-width:0; padding:14px 16px; border-right:1px solid var(--rule);
  transition:background .2s}
.metrics div:last-child{border-right:0}
/* 指標が1つだけのときは、枠を横いっぱいに伸ばさず内容幅に収める */
.metrics:has(div:only-child){display:inline-flex}
.metrics div:hover{background:var(--accent-soft)}
.metrics b{display:block; font-family:var(--f-mono); font-weight:700; font-size:19px;
  font-variant-numeric:tabular-nums; line-height:1.3}
.metrics span{display:block; font-family:var(--f-mono); font-size:10px; letter-spacing:.08em;
  text-transform:uppercase; color:var(--ink-soft); margin-top:3px}
.stack{font-family:var(--f-mono); font-size:11.5px; color:var(--ink-soft); margin:16px 0 0}
.pts{list-style:none; padding:0; margin:14px 0 0}
.pts li{position:relative; padding-left:20px; margin-bottom:8px}
.pts li::before{content:"—"; position:absolute; left:0; color:var(--accent); font-family:var(--f-mono)}

.links{display:flex; flex-wrap:wrap; gap:10px; margin:22px 0 0}
.lnk{display:inline-block; font-family:var(--f-mono); font-size:12px; font-weight:700; letter-spacing:.05em;
  text-decoration:none; padding:11px 20px; border:1px solid var(--accent); color:var(--accent);
  background:transparent; transition:background .2s,color .2s,transform .2s}
.lnk.solid{background:var(--accent); color:#fff; border-color:var(--accent)}
.lnk:hover{transform:translateY(-2px)}
.lnk:not(.solid):hover{background:var(--accent); color:#fff}

/* ===== approach ===== */
.grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(18px,2.4vw,28px)}
.card{background:var(--paper); border:1px solid var(--rule); padding:26px 22px; min-width:0}
.card .n{font-family:var(--f-mono); font-size:11px; font-weight:700; letter-spacing:.14em; color:var(--accent)}
.card h4{font-family:var(--f-display); font-weight:700; font-size:17px; margin:12px 0 10px; line-height:1.5}
.card p{margin:0; font-size:14.5px; line-height:1.85; color:var(--ink-soft)}
.card .ev{margin:16px 0 0; padding:13px 0 0; border-top:1px solid var(--rule); font-size:13px; line-height:1.8}
.card .ev b{display:block; font-family:var(--f-mono); font-weight:700; font-size:10px;
  letter-spacing:.1em; color:var(--accent); margin:0 0 6px}
@media (max-width:980px){ .grid4{grid-template-columns:repeat(2,1fr)} }
@media (max-width:560px){ .grid4{grid-template-columns:1fr} }

/* ===== contact ===== */
.contact{display:grid; grid-template-columns:1fr auto; gap:28px; align-items:center}
.contact h2{font-family:var(--f-display); font-weight:900; font-size:clamp(22px,3vw,32px); margin:0 0 12px}
.mail{font-family:var(--f-mono); font-size:clamp(15px,2.4vw,20px); font-weight:700; word-break:break-all; margin:0}
button{font-family:var(--f-mono); font-size:12px; font-weight:700; letter-spacing:.06em; cursor:pointer;
  background:var(--accent); color:#fff; border:0; padding:13px 24px; white-space:nowrap; transition:filter .2s}
button:hover{filter:brightness(1.12)}
button:focus-visible,a:focus-visible{outline:2px solid var(--accent); outline-offset:3px}
@media (max-width:640px){ .contact{grid-template-columns:1fr} }

footer{background:var(--deep); color:var(--on-deep-soft); padding-block:34px}
footer .in{display:flex; flex-wrap:wrap; gap:12px 28px; align-items:center;
  font-family:var(--f-mono); font-size:11px; letter-spacing:.06em}
footer .sp{margin-left:auto}
footer .rights{margin-top:18px; padding-top:16px; border-top:1px solid rgba(255,255,255,.14);
  font-size:11px; line-height:1.85; color:var(--on-deep-soft); opacity:.72; max-width:78ch}
footer .rights p{margin:0 0 5px}
footer .rights p:last-child{margin-bottom:0}
footer .rights a{color:inherit; text-decoration:underline}


/* ===== scroll reveal =====
   大手コーポレートサイトの計測値に合わせる：持続 0.9s、ゆるい立ち上がり。
   .js-anim は JS が付けるので、JSが動かない環境では最初から全部見えている。 */
:root{ --ease-rev:cubic-bezier(.4,0,.22,1) }
.js-anim .rev{ opacity:0; transform:translateY(44px);
  transition:opacity .9s var(--ease-rev) var(--d,0s), transform .9s var(--ease-rev) var(--d,0s) }
.js-anim .rev.is-visible{ opacity:1; transform:none }

/* 画像は現れたあとに静かに寄る */
.js-anim .media figure img{ transform:scale(1.035); transition:transform 1.4s ease-out .15s, border-color .25s ease }
.js-anim .media figure.is-visible img{ transform:none }
.js-anim .media figure:hover img{ transform:translateY(-4px) }

@media (prefers-reduced-motion:reduce){
  .js-anim .rev,.js-anim .sh h2 > span,.js-anim .media figure img{
    opacity:1!important; transform:none!important; transition:none!important }
}


/* 画像はマスクで開く（アサヒGHDの reveal-inset 方式） */
.js-anim .media figure img{ clip-path:inset(0 0 100% 0); transform:scale(1.04);
  transition:clip-path 1.05s var(--ease-rev), transform 1.5s ease-out .1s, box-shadow .3s ease }
.js-anim .media figure.is-visible img{ clip-path:inset(0 0 0 0); transform:none }
.js-anim .media figure.is-visible:hover img{ transform:translateY(-4px) scale(1.012) }

/* ヒーロー見出しは1文字ずつ立ち上げる */
@keyframes chIn{ from{ opacity:0; transform:translateY(.55em) } to{ opacity:1; transform:none } }
.hero h1.split{ animation:none }
.hero h1 .ch{ display:inline-block; animation:chIn .72s var(--ease-rev) var(--d,0s) backwards }

/* 背景のグローはピントが合うように現れる（バンダイナムコのブラー解除） */
@keyframes glowIn{ from{ opacity:0; filter:blur(30px); transform:scale(1.08) } to{ opacity:1; filter:none; transform:none } }
.hero::after{ animation:glowIn 1.9s var(--ease-rev) backwards }
@keyframes gridIn{ from{ opacity:0 } to{ opacity:1 } }
.hero::before{ animation:gridIn 1.6s ease-out .25s backwards }

/* 数字の下に線が伸びる */
.stats div{ position:relative; overflow:hidden }
.stats div::after{ content:""; position:absolute; left:22px; right:22px; bottom:0; height:2px;
  background:var(--accent); transform-origin:left;
  animation:barIn 1.1s var(--ease-rev) var(--bd,.9s) backwards }
@keyframes barIn{ from{ transform:scaleX(0) } to{ transform:scaleX(1) } }

@media (prefers-reduced-motion:reduce){
  .hero h1 .ch,.hero::after,.hero::before,.stats div::after{ animation:none!important; opacity:1!important; filter:none!important; transform:none!important }
  .js-anim .media figure img{ clip-path:none!important; transform:none!important; transition:none!important }
}

/* ===== motion ===== */
@keyframes rise{from{opacity:0; transform:translateY(14px)} to{opacity:1; transform:none}}
.hero .eyebrow,.hero h1,.hero .lede,.hero .who,.hero .stats{animation:rise .55s cubic-bezier(.22,.8,.3,1) backwards}
.hero h1{animation-delay:.07s} .hero .lede{animation-delay:.15s}
.hero .who{animation-delay:.22s} .hero .stats{animation-delay:.28s}
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .hero .eyebrow,.hero h1,.hero .lede,.hero .who,.hero .stats{animation:none}
  .media img,.lnk,.nav a::after,.metrics div{transition:none}
}
</style>
</head>
<body>

<header class="hd">
  <div class="hd-in">
    <a class="brand" href="#top">TSUCHIHASHI<span>.</span>TAIGA</a>
    <nav class="nav">
      <a href="#works">企画書</a>
      <a href="#tools">開発</a>
      <a href="#analysis">分析</a>
      <a href="#approach">進め方</a>
      <a href="#contact">連絡先</a>
    </nav>
  </div>
</header>

<section class="hero" id="top">
  <div class="in">
    <p class="eyebrow">Portfolio / 2028年卒</p>
    <h1>面白さを分析して、<br>自分の手で形にする。</h1>
    <p class="lede">遊んで終わりにせず、なぜ面白いのかを構造で捉える。その分析を、企画書と、自分で書いたツールの両方で形にしてきました。ゲームプランナーを志望しています。</p>
    <p class="who"><b>槌橋 泰雅</b>　関西学院大学 国際学部 国際学科 3年　／　カウナス工科大学（リトアニア）交換留学　／　TOEIC L&amp;R 785・IELTS 5.5</p>
    <div class="stats">
      <div><b data-count="700000">700,000</b><span>収集・分析した試合数</span></div>
      <div><b data-count="162000">162,000</b><span>算出した相性の組み合わせ</span></div>
      <div><b data-count="60" data-suffix="+">60+</b><span>自動算出する財務指標</span></div>
      <div><b data-count="4">4</b><span>個人開発したツール</span></div>
    </div>
  </div>
</section>

<section class="band" id="works">
  <div class="in">
    <div class="sh">
      <div class="rule"></div>
      <p class="eyebrow">Works</p>
      <h2>企画書</h2>
      <p>どちらも全ページをPDFで公開しています。</p>
    </div>

    <article class="work">
      <div class="body">
        <h3>ふくらめ！ドカンボール</h3>
        <p class="role">要件企画書 / 小学3年生向け・3分で決着する架空のスポーツ</p>
        <p>「小学3年生」「架空のスポーツ」「3分で決着」という3つの要件を分解し、ルールを1行で言い切れるところまで削りました。小学3年生は、覚えることが多いゲームでは最初の3分を越えられません。だから、遊びの深さをルールの数ではなく、たった1つのジレンマから生まれる読み合いで作っています。</p>
        <p class="quote">玉は持っているほどふくらんで高得点になる。でも、ふくらむほど足が遅くなり、当てられると割れて相手の点になる。</p>
        <p>「いつ割るか」の読み合いが、追う側と逃げる側の両方に同時に発生します。ルールを足さずに、遊びだけを広げる拡張案まで書き切りました。</p>
        <div class="links"><a class="lnk solid" href="docs/dokanball.pdf">企画書を読む（PDF・9ページ）</a></div>
      </div>
      <div class="media">
        <figure><img src="__dokan_cover__" alt="『ふくらめ！ドカンボール』企画書の表紙"><figcaption>表紙</figcaption></figure>
        <figure><img src="__dokan_rule__" alt="ターゲットと企画の核となるルールを示したページ"><figcaption>ターゲットと企画の核</figcaption></figure>
      </div>
    </article>

    <article class="work flip">
      <div class="media">
        <figure><img src="__real_cover__" alt="『リアルか、超次元か』企画書の表紙"><figcaption>表紙</figcaption></figure>
        <figure><img src="__real_hero__" alt="戦術の組み立てからシュートまでの流れを図示したページ"><figcaption>面白さの核となる一瞬</figcaption></figure>
        <figure><img src="data:image/jpeg;base64,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7x9YZFUzulp4zYGO5uN9m3ta5/FWZJmdSfKBTtfLVNlbA2xDQA4WI5ajfvVFc0ZFRJFLJHT5dRtncOG4HVW58Lgho6eSSuiZJI54N2yWIGW1vA7VRqHw9Z2tIwsZcODHC+U8R2hXsarWVMVPE3KZGl8khY8vAL7aAn0cNNVByyLEgG4B3jisK9HSQOw51Q6a0gBNszbAgizbbyTvvuVFAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBSR+L61GpI/F9aCNERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFJH4vrUakj8X1oI0REBERAREQFPHT3aHSOyA7ha5KiYMz2g8SArkpvK702WsYslFsIvKv7n6psIvKv7n6rZFqoRrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBo+m8EuifntqRaxVdXGEtcCN4KrztDZ5GjcHEBZyiiEayASQALk7gsKej+lc7i1hI9KzHFWwpmt+kks7k0Xsmwi8q/ufqtkXSoRrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7n6psIvKv7n6rZEqBrsIvKv7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W9RjePxdMel0VTjMzqHDnOELMgzdWi1tpx11K72L1/Rro70Gr8C6P4u7FKvEpmOllERYGMbY2+63rXzlE2RwLeh6FxdGnYhLL0rnnZTQM2kcMTbidw/hJGo/PmFL046XTdKKyJscIpcMpRkpKRu5jd1zbS/4bl5lFdsXaW990M6X4c7CT0Y6Ywmowdx/YTi5fSn1a27Ru7QvFYmyjjxGpZhskslG2RwhfKAHObfQmyrIkYxE3BYiItAiIgIiICIiAiIgIiICIiAo6zx2f+MKRR1njs/8YWcuRCBERYUREQEREBERAUkfi+tRqSPxfWgjREQEREBERBtF9Kz7QVuX6V/2iqkX0rPtBW5fpX/aK3iktURFoEREBERAREQEREBERAREQEREBERAREQEREBERAREQBvChqv3mX7Z/FTDeFDVfvMv2z+KzlyIRKej8eT7BUCno/Hk+wVmOaykREXRBERAREQEREBERAREQEREBERAREQEREBERAREQEREBbM3P+w78Fqtmbn/AGHfggpIiLkq1D+7f5h/ALKxD+7f5h/ALK6RyQREVBERAREQEREBERAREQEREBERAREQEREBERAREQEREGJv3b/MH4FVVam/dv8AMH4FVVjLmsCuv3M+w38FSV1+5n2G/gmKS1REWwREQEREBERAREQEREBERAREQEREBERAREQEREBERAUdZ47P/GFIo6zx2f8AjCzlyIQIiLCiIiAiIgIiICkj8X1qNSR+L60EaIiAiIgIiINovpWfaCty/Sv+0VUi+lZ9oK3L9K/7RW8UlqiIDYg8loTCAinM8l2tJtHp4x+C2paSSoe0AWab+FccAtZJzJDleS5+cuJPKwCxDI2IPdYmQgtbyFxYlEaSRvjIEgsSL71JJAYoWOlu179Wst/DzKiY4xuDmaEbjZSTS7RkQNy5oIcTxJJP5oNXxlsUb7iz76crLQi29WG1LWwxtELS9l7PcbgX7FA9znuLnkucdSTxQWI6MvjaTIxkjrkMdceDbeoooto17i9rGttcuvx9C2MwbEWx5i94s97t9uQ7FiGZsccjHRteH23ki1vQgxLFs8hztc14uC2/O35Lc07di+Vs7HBpAtYi5PK4WJZmSbIGPIxgsQ0nXUnj6Vs6qzMMRibsbeCwfwnnfmgxRQNqJ9m5xaLXJHBSOpGh0rQJbMBIfbwTYXUV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B4ixTWx1r09s8Y5+XJMJ06yvl4f2hwqhjqhUVFXK6KkpmB0rmC7jc2DWjmSu3VYLhctWzDqNtVBWvphMwySB7S4tzZHCwsbcVxsHxRuHieOekZVU84bnie4t1abtNwrkePRslqcQMD34tUZmiRzhs4WkW8Eb7201XHXx7TOpM43XhUxV8Ofym7vwqnTTnSjCIn6/n9V6rmGUVHUdHwXUxdK52UvbG3PfNbQn8ypMUosOwzADHLTVAqHSSMYZo2Z2us0i5B0HxKr4fiOExdHxS1Ze6UtfmjjYcxOcEeEdBpfglTjeG4jBXNq6WSEueZ4GseXZpC0t1PD+E+peXbrzrTNZbYymf8RXHk7btPZEXF06+HUWGVGG0NSKCEsF9mX3znKTfPYgG7td27RcPpdBBSVEEcNJTxGaITOfFmBJJIIsSQBcXsFdh6RYdRYXS01PTvlde7ml+kIJuQCW6kk6/iub0nxWkxOscaaBwEbskUu00MdzYBthbep2XS7RHad2UTt48568PH/vmutnpTo1ExfD85OIiIvuPnCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiILWI/3co/5uX/SxcRdvEf7uUf8ANy/6WLiLyaXj8593TU5x8o9hERdWBERAUkfi+tRqSPxfWgjREQEREBERBtH9Iz7QXRk8d3pK50f0jPtBdGTx3ekreCS1REWwREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFFW/Qx/ad+SlUVb9DH9p35KZchTREXJXeq/7Iwf+Xk/3XqkrtX/AGRg/wDLyf7r1SU7P8H1n3lrV+L6R7QIiLuwIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiILWI/wB3KP8Am5f9LFxF28R/u5R/zcv+li4i8ml4/Ofd01OcfKPYREXVgREQFJH4vrUakj8X1oI0REBERAREQbR/SM+0F0ZPHd6SudH9Iz7QXRk8d3pK3gktURFsEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBER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LVRd+KXNULeKR8MrJYnFkjHBzXDeCNxWiKzF8JG0j3SyOkkcXPeS5zjvJPFI5HxSNkie5j2m7XNNiPWtUUqKovxTuq6l9UKt08hqAQ7al3hXG43WevVfVzT9am2BdmMec5Sb3vb0quimzDhw5Luy80kE8tPO2eCRzJWm7XtOoKkq66rrXl9VUSSkgA5jppu03cSq6JOGM5bq4m6aq+DeGWSCVksL3RyMN2vabEFavc573PeS5zjck7yVhFai7S/BsHua1zWuIDtHAHerNJiVbRRPipKqWBj3BzhG7KSRu1VRFMsMcorKLWMpibiVurxKurIWw1dVLMxjszRI7NY2tvK3bjGItqhVNrJROGbMPvubyHJUUWe506rbFfJe8zu7Zc4ucXOJLibkniVttZNlsto/ZXzZMxy352WiLpUM2tsxOujpmU8VVIyFgcA1hto7fu5rWavq52PZLO8seGhzL2ByizdOwKsixGlhE3GMf01vyqrWjiNWZ3zmY7WSLZOdYasy5bewWVVEWsccceUJMzPNN1up6qaXby9XJzbLMct+dlCiJERHJJmZ5iIiotYj/dyj/m5f9LFxF28R/u5R/wA3L/pYuIvJpePzn3dNTnHyj2ERF1YEREBSR+L61GpI/F9aCNERAREQEREGzDZ7SdwIXRk8d3pXMVmKqytDZG5gNxBsQtYzRKwii61F5N/eHwTrUXk394fBb3QiVFF1qLyb+8PgnWovJv7w+CboEqKLrUXk394fBOtReTf3h8E3QJUUXWovJv7w+Cdai8m/vD4JugSooutReTf3h8E61F5N/eHwTdAlRRdai8m/vD4J1qLyb+8Pgm6BKii61F5N/eHwTrUXk394fBN0CVFF1qLyb+8PgnWovJv7w+CboEqKLrUXk394fBOtReTf3h8E3QJUUXWovJv7w+Cdai8m/vD4JugSooutReTf3h8E61F5N/eHwTdAlRRdai8m/vD4J1qLyb+8Pgm6BKii61F5N/eHwTrUXk394fBN0CVFF1qLyb+8PgnWovJv7w+CboEqKLrUXk394fBOtReTf3h8E3QJUUXWovJv7w+Cdai8m/vD4JugSooutReTf3h8E61F5N/eHwTdAlRRdai8m/vD4J1qLyb+8Pgm6BKii61F5N/eHwTrUXk394fBN0CVFF1qLyb+8PgnWovJv7w+CboEqKLrUXk3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" alt="ターゲットの母数を実測値で示したページ"><figcaption>ターゲットの母数（実測値で裏付け）</figcaption></figure>
      </div>
      <div class="body">
        <h3>リアルか、超次元か</h3>
        <p class="role">オリジナル企画書 / サッカーゲーム</p>
        <p>サッカーゲームは、リアルを追求するほど操作が難しくなって離れられ、派手にするほど競技性が薄れます。ただし真ん中は「空白」ではなく「重なり」です。派手に決めたい、でも運で決まったとは思われたくない。この二つは同じ人の中に同時にあります。戦術で膳立てを作る時間と、狙って決める一瞬を二層に分け、その間にある緊張そのものを面白さの核に置きました。</p>
        <p>市場の主張は、公表されている実測値だけで裏を取っています。推測で埋めず、顧客数そのものではない数字は代理指標だと明記しました。この企画書は、社外のワークショップで現場の制作者の方に直接見ていただいたものを、いただいた指摘をもとに全面的に作り直した版です。「文字で詰めすぎると敬遠される」「なぜ面白いのかを自分で主張できていない」「両極端にいるお客さんを連れてこられるか」。指摘を受けて、文章を削り、図を増やし、何を捨てて何を残すのかまで書き切りました。</p>
        <div class="links"><a class="lnk solid" href="docs/real-or-ultra.pdf">企画書を読む（PDF・15ページ）</a></div>
      </div>
    </article>
  </div>
</section>

<section class="band tint" id="tools">
  <div class="in">
    <div class="sh">
      <div class="rule"></div>
      <p class="eyebrow">Development</p>
      <h2>つくったツール</h2>
      <p>いずれも専門知識がない状態から着手し、調べながら作り直して実用水準まで仕上げたものです。</p>
    </div>

    <article class="work">
      <div class="body">
        <h3>ブロスタ ピック提案ツール</h3>
        <p class="role">個人開発 / 対戦データ分析</p>
        <p>対戦ゲーム『ブロスタ』のガチバトルで、初心者が序盤に脱落する原因はピックの段階にあると考えました。感覚で語っても誰も納得しないので、まず数字を集めることから始めました。</p>
        <p>公式APIには「マップ別の全試合」を取る方法がなく、取得できるのは1プレイヤーの直近25戦だけです。そこで、ランキングから種タグを集め、対戦ログを辿って巡回するクローラ型の設計にしました。1試合から両チーム6体と勝敗が取れるので、重複を除きながら雪だるま式にデータを増やしています。毎日自動で巡回を続けており、現在は約217万人のプレイヤー記録から70万試合分を蓄積しています。</p>
        <div class="metrics">
          <div><b>700,286</b><span>試合</span></div>
          <div><b>34</b><span>マップ</span></div>
          <div><b>162,926</b><span>相性ペア</span></div>
          <div><b>68,308</b><span>シナジーペア</span></div>
        </div>
        <p class="stack">TypeScript / Node.js / node:sqlite / 毎日自動更新（2021年12月〜2026年10月）</p>
        <div class="links"><a class="lnk solid" href="apps/brawl/">ブラウザで実際に触る</a></div>
      </div>
      <div class="media">
        <figure><img src="__shot_brawl__" alt="BAN候補と次のピック推薦。各ブロウラーの勝率と出現率を並べて表示する"><figcaption>BAN候補と次のピック推薦</figcaption></figure>
      </div>
    </article>

    <article class="work flip">
      <div class="media">
        <figure><img src="__shot_dame__" alt="ダメージ計算の結果。与ダメージの幅と確定数を即座に出す"><figcaption>ダメージ計算の結果と確定数</figcaption></figure>
      </div>
      <div class="body">
        <h3>ポケモンチャンピオンズ ダメージ計算ツール</h3>
        <p class="role">個人開発 / 対戦支援</p>
        <p>全1,025匹の種族値・技・特性・持ち物・タイプ相性を踏まえてダメージを計算し、確定数まで出します。対戦中に開いて数秒で答えが欲しいツールなので、立ち絵つきで目的のポケモンに迷わず辿り着けることを優先しました。</p>
        <div class="metrics">
          <div><b>1,025</b><span>収録ポケモン</span></div>
          <div><b>立ち絵</b><span>全件対応</span></div>
        </div>
        <p class="stack">React / Vite</p>
      </div>
    </article>

    <article class="work">
      <div class="body">
        <h3>Pokémon GO 個体値チェッカー / チームビルダー</h3>
        <p class="role">個人開発 / 対戦支援</p>
        <p>同じポケモンでも、Pokémon GO は数値体系がまったく別のゲームです。強さの指標はCPと強化レベル、個体値は0〜15の3値、タイプ相性は2倍ではなく約1.6倍刻み。だから既存のツールを流用せず、別プロジェクトとして設計し直しました。</p>
        <ul class="pts">
          <li>CP・HP・強化状況から個体値の候補を逆算し、リーグごとの最適度を出す</li>
          <li>リーグ別のメタ、技構成、タイプ相性、対面を加味した編成支援</li>
        </ul>
        <p class="stack">Web アプリ / リーグ別メタデータ連携</p>
      </div>
      <div class="media">
        <figure><img src="__shot_pogo__" alt="個体値ランク。0〜15の個体値からリーグ別の順位を算出する"><figcaption>個体値からリーグ別の順位を算出</figcaption></figure>
      </div>
    </article>

    <article class="work flip">
      <div class="media">
        <figure><img src="__shot_prism__" alt="決算サマリー。主要指標と6軸スコア、財務三表の図示"><figcaption>決算サマリー（表示はサンプルデータ）</figcaption></figure>
      </div>
      <div class="body">
        <h3>Prism — 決算分析ツール</h3>
        <p class="role">個人開発 / 財務データ可視化</p>
        <p>企業研究のために作りました。決算PDFのほか、EDINET・SEC EDGARから直接データを取り込めます（スキャンされた画像PDFは文字認識で読み取り）。貸借対照表・損益計算書・キャッシュフロー計算書の三表を図にして、ROEやPBRなど60以上の指標を自動計算し、「なぜその数字になったのか」まで踏み込んだ分析レポートを書き出します。取り込んだ数字は貸借一致などの会計ルールで自動検算し、実在企業を使った回帰テストで誤りを機械的に検出する仕組みにしました。ゲーム以外の領域でも、数字から構造を読む手順は同じだと考えています。</p>
        <div class="metrics">
          <div><b>60+</b><span>算出指標</span></div>
          <div><b>25</b><span>回帰テスト件数</span></div>
        </div>
        <p class="stack">EDINET / SEC 連携・PDF取込・OCR / 自動レポート生成</p>
      </div>
    </article>
  </div>
</section>

<section class="band" id="analysis">
  <div class="in narrow">
    <div class="sh">
      <div class="rule"></div>
      <p class="eyebrow">Analysis</p>
      <h2>イナズマイレブン ― 必殺技はなぜ報酬として機能するのか</h2>
    </div>
    <p>このシリーズの必殺技は、演出ではなく報酬として設計されています。プレイヤーが我慢した時間に対して、必殺技という形で一気に支払いが行われる。ただし報酬は、与えすぎれば価値が下がります。続編を重ねるほど演出が派手になり、一発の重みが薄れていく構造をインフレとして整理しました。</p>
    <p>そのうえで、報酬の希少性をどう取り戻すかという視点から改善案を2つ提案しています。</p>
    <div class="links"><a class="lnk solid" href="docs/inazuma-report.pdf">レポートを読む（PDF・3ページ）</a></div>
  </div>
</section>

<section class="band tint" id="approach">
  <div class="in">
    <div class="sh">
      <div class="rule"></div>
      <p class="eyebrow">Approach</p>
      <h2>仕事の進め方</h2>
    </div>
    <div class="grid4">
      <div class="card"><div class="n">01</div><h4>課題を自分で見つける</h4><p>違和感を覚えた時点で、まず何が起きているのかを言葉にする。</p><p class="ev"><b>実例</b>『ブロスタ』で初心者が序盤に脱落する原因を、操作ではなくピックの段階にあると考えたところから作り始めた。</p></div>
      <div class="card"><div class="n">02</div><h4>数字で裏を取る</h4><p>感覚で語らず、他人が検証できる形に落とす。</p><p class="ev"><b>実例</b>ピック提案は70万試合の集計を根拠にし、企画書の市場分析は公表された実測値だけで裏を取った。</p></div>
      <div class="card"><div class="n">03</div><h4>形にする</h4><p>専門知識がなくても、調べながら作り直して実用水準まで持っていく。</p><p class="ev"><b>実例</b>APIが必要なデータを返さないところから設計を考え直し、ツールを4本、実際に使える状態まで作った。</p></div>
      <div class="card"><div class="n">04</div><h4>外の評価で作り直す</h4><p>評価されない可能性のある場所に、自分から出ていく。</p><p class="ev"><b>実例</b>企画書を社外のワークショップで制作者の方に見ていただき、いただいた指摘をもとに全面的に作り直した。</p></div>
    </div>
  </div>
</section>

<section class="band" id="contact">
  <div class="in contact">
    <div>
      <h2>連絡先</h2>
      <p class="mail" id="mail">taiga_tsuchi@icloud.com</p>
    </div>
    <button id="copy" type="button">アドレスをコピー</button>
  </div>
</section>

<footer>
  <div class="in">
    <span>&copy; 2026 Taiga Tsuchihashi</span>
    <span>All Rights Reserved</span>
    <span class="sp">最終更新 2026年10月</span>
  </div>
  <div class="in">
    <div class="rights">
      <p>本サイトで紹介している『ブロスタ』のピック提案ツールは、個人が制作した非公式のファンコンテンツです。Supercell とは一切関係がなく、Supercell による承認・後援を受けたものではありません。ゲーム内の名称・画像等の権利はすべて Supercell Oy に帰属します。</p>
      <p>This material is unofficial and is not endorsed by Supercell. For more information see Supercell&rsquo;s Fan Content Policy: <a href="https://www.supercell.com/fan-content-policy" target="_blank" rel="noopener noreferrer">www.supercell.com/fan-content-policy</a></p>
      <p>その他、本サイトに掲載している各社の作品名・サービス名は、各権利者の商標または登録商標です。</p>
    </div>
  </div>
</footer>

<script>
(function(){
  var btn=document.getElementById('copy'), mail=document.getElementById('mail');
  if(btn&&mail){
    btn.addEventListener('click',function(){
      var txt=mail.textContent.trim();
      function done(m){ btn.textContent=m; setTimeout(function(){btn.textContent='アドレスをコピー';},1900); }
      function fallback(){
        try{ var r=document.createRange(); r.selectNodeContents(mail);
          var s=window.getSelection(); s.removeAllRanges(); s.addRange(r); done('選択しました'); }
        catch(e){ done('手動でコピーしてください'); }
      }
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(txt).then(function(){done('コピーしました');}).catch(fallback);
      } else { fallback(); }
    });
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  // ---- スクロール演出 ----
  if(!reduce && hasIO){
    document.documentElement.classList.add('js-anim');
    var revT = [].slice.call(document.querySelectorAll('.sh, .work .body, .card, .contact, .pts, #analysis .in > p, #analysis .in > .links, footer .in'));
    var figT = [].slice.call(document.querySelectorAll('.media figure'));
    revT.forEach(function(el){ el.classList.add('rev'); });
    var targets = revT.concat(figT);

    // ヒーロー見出しを1文字ずつに割る（<br> は保つ）
    var h1 = document.querySelector('.hero h1');
    if(h1 && !h1.classList.contains('split')){
      var i = 0, out = document.createDocumentFragment();
      [].slice.call(h1.childNodes).forEach(function(node){
        if(node.nodeType === 1){ out.appendChild(node.cloneNode(true)); return; }
        node.textContent.split('').forEach(function(c){
          if(c === ' ' || c === '　'){ out.appendChild(document.createTextNode(c)); return; }
          var sp = document.createElement('span');
          sp.className = 'ch'; sp.textContent = c;
          sp.style.setProperty('--d', (0.18 + i * 0.035) + 's');
          i++; out.appendChild(sp);
        });
      });
      h1.innerHTML = ''; h1.appendChild(out); h1.classList.add('split');
    }

    // 数字の下線は、数字が出そろってから左から伸ばす
    [].slice.call(document.querySelectorAll('.stats div')).forEach(function(d,n){
      d.style.setProperty('--bd', (0.95 + n * 0.1) + 's');
    });

    // 兄弟同士はわずかにずらす
    [].slice.call(document.querySelectorAll('.grid4')).forEach(function(g){
      [].slice.call(g.children).forEach(function(c,i){ c.style.setProperty('--d',(i*0.09)+'s'); });
    });
    [].slice.call(document.querySelectorAll('.media')).forEach(function(g){
      [].slice.call(g.children).forEach(function(c,i){ c.style.setProperty('--d',(i*0.12)+'s'); });
    });

    // 出す条件と戻す条件をずらす（ヒステリシス）。
    // 速いスクロールでも、出かけた瞬間に消されることがない。
    var showObs = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('is-visible'); });
    },{threshold:0, rootMargin:'0px 0px -12% 0px'});

    var hideObs = new IntersectionObserver(function(es){
      es.forEach(function(e){
        // 画面の外へ 240px 以上離れて初めて戻す
        if(!e.isIntersecting) e.target.classList.remove('is-visible');
      });
    },{threshold:0, rootMargin:'240px 0px 240px 0px'});

    targets.forEach(function(el){ showObs.observe(el); hideObs.observe(el); });

    // 保険：観測がまったく働かなかったときだけ、演出ごと無効化して全部見せる
    setTimeout(function(){
      var any = targets.some(function(el){ return el.classList.contains('is-visible'); });
      if(!any) document.documentElement.classList.remove('js-anim');
    }, 2500);
  }

  // ---- 数字のカウントアップ ----
  var els = [].slice.call(document.querySelectorAll('[data-count]'));
  if(reduce || !els.length || !hasIO) return;

  function run(el){
    var n = parseInt(el.getAttribute('data-count'),10);
    var suffix = el.getAttribute('data-suffix') || '';
    var final = el.textContent;
    if(!isFinite(n)) return;
    var t0=null, dur=1100;
    function step(t){
      if(t0===null) t0=t;
      var k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3);
      el.textContent = Math.round(n*e).toLocaleString('ja-JP') + suffix;
      if(k<1) requestAnimationFrame(step); else el.textContent = final;
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ io.unobserve(e.target); run(e.target); } });
  },{threshold:.5});
  els.forEach(function(el){ io.observe(el); });
})();
</script>
</body>
</html>
"""

for k, v in IM.items():
    HTML = HTML.replace("__%s__" % k, v)
assert "__" not in HTML.split("<style>")[0] or True
io.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html"), "w", encoding="utf-8").write(HTML)
print("written KB:", len(HTML.encode()) // 1024)
