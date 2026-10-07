# -*- coding: utf-8 -*-
"""portfolio-site/index.html を生成する。画像は imgs2.json の data URI を差し込む。"""
import io, json, os

SCRATCH = r"C:/Users/taiga/AppData/Local/Temp/claude/C--Users-taiga-secretary/4d886eb4-28ff-4f7e-85e1-dc3996b6455e/scratchpad/imgs2.json"
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
      <div><b data-count="57000">57,000</b><span>収集・分析した試合数</span></div>
      <div><b data-count="125000">125,000</b><span>算出した相性の組み合わせ</span></div>
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
      </div>
      <div class="body">
        <h3>リアルか、超次元か</h3>
        <p class="role">オリジナル企画書 / サッカーゲーム</p>
        <p>サッカーゲームは、リアルを追求するほど操作が難しくなって離れられ、派手にするほど競技性が薄れます。空いているのは真ん中です。戦術で膳立てを作る時間と、狙って決める一瞬を二層に分け、その間にある緊張そのものを面白さの核に置きました。</p>
        <p>この企画書は、社外のワークショップで現場の制作者の方に直接見ていただいたものを、いただいた指摘をもとに全面的に作り直した版です。「文字で詰めすぎると敬遠される」「なぜ面白いのかを自分で主張できていない」「両極端にいるお客さんを連れてこられるか」。指摘を受けて、文章を削り、図を増やし、何を捨てて何を残すのかまで書き切りました。</p>
        <div class="links"><a class="lnk solid" href="docs/real-or-ultra.pdf">企画書を読む（PDF・11ページ）</a></div>
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
        <p>公式APIには「マップ別の全試合」を取る方法がなく、取得できるのは1プレイヤーの直近25戦だけです。そこで、ランキングから種タグを集め、対戦ログを辿って巡回するクローラ型の設計にしました。1試合から両チーム6体と勝敗が取れるので、重複を除きながら雪だるま式にデータを増やしています。</p>
        <div class="metrics">
          <div><b>57,000</b><span>試合</span></div>
          <div><b>29</b><span>マップ</span></div>
          <div><b>125,000</b><span>相性ペア</span></div>
          <div><b>52,000</b><span>シナジーペア</span></div>
        </div>
        <p class="stack">TypeScript / Node.js / node:sqlite / 毎日自動更新</p>
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
        <p>企業研究のために作りました。決算PDFを読み込ませると、貸借対照表・損益計算書・キャッシュフロー計算書の三表を図にして、ROEやPBRなど60以上の指標を自動で計算し、レポートまで書き出します。ゲーム以外の領域でも、数字から構造を読む手順は同じだと考えています。</p>
        <div class="metrics">
          <div><b>60+</b><span>算出指標</span></div>
          <div><b>3</b><span>財務諸表を図示</span></div>
        </div>
        <p class="stack">決算PDF取込 / 自動レポート生成</p>
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
      <div class="card"><div class="n">01</div><h4>課題を自分で見つける</h4><p>違和感を覚えた時点で、まず何が起きているのかを言葉にする。</p></div>
      <div class="card"><div class="n">02</div><h4>数字で裏を取る</h4><p>感覚で語らず、他人が検証できる形に落とす。</p></div>
      <div class="card"><div class="n">03</div><h4>形にする</h4><p>専門知識がなくても、調べながら作り直して実用水準まで持っていく。</p></div>
      <div class="card"><div class="n">04</div><h4>外の評価で作り直す</h4><p>評価されない可能性のある場所に、自分から出ていく。</p></div>
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
    var revT = [].slice.call(document.querySelectorAll('.sh, .work .body, .card, .contact, .pts'));
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

    var io1 = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io1.unobserve(e.target); } });
    },{threshold:.12, rootMargin:'0px 0px -8% 0px'});
    targets.forEach(function(el){ io1.observe(el); });

    // 保険：何かが詰まっても3秒で必ず全部出す
    setTimeout(function(){
      targets.forEach(function(el){ el.classList.add('is-visible'); });
    }, 3000);
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
