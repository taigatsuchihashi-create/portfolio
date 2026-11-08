# -*- coding: utf-8 -*-
"""portfolio-site/index.html を生成する。画像は assets/img/*.webp（遅れて読む）、CSS・JS・字の形は assets/ から差し込む。"""
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
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&family=Zen+Old+Mincho:wght@700;900&family=Noto+Sans+JP:wght@400;500;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&family=Zen+Old+Mincho:wght@700;900&family=Noto+Sans+JP:wght@400;500;700&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&family=Zen+Old+Mincho:wght@700;900&family=Noto+Sans+JP:wght@400;500;700&display=swap"></noscript>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='3' y='3' width='26' height='26' rx='3' fill='%23B3271E' transform='rotate(-4 16 16)'/%3E%3Ctext x='16' y='23' font-size='18' text-anchor='middle' fill='%23FBF3EC' font-family='serif'%3E%E9%81%8A%3C/text%3E%3C/svg%3E">
<script>document.documentElement.classList.add("js");setTimeout(function(){if(!window.__appReady)document.documentElement.classList.remove("js")},4500)</script>
<style>
__STYLE__
</style>
</head>
<body>

<header class="hd">
  <div class="hd-in">
    <a class="brand" href="#top"><span class="seal" aria-hidden="true">槌</span>槌橋 泰雅</a>
    <nav class="nav">
      <a href="#about">自己紹介</a>
      <a href="#works">企画書</a>
      <a href="#tools">開発</a>
      <a href="#analysis">分析</a>
      <a href="#approach">進め方</a>
      <a href="#contact">連絡先</a>
    </nav>
  </div>
</header>

<section class="hero" id="top">
  <div class="hero-in">
    <button class="sho" type="button" aria-label="大字「遊」をもう一度書く">
      <canvas aria-hidden="true"></canvas>
      <svg aria-hidden="true" focusable="false"></svg>
      <span class="hanko" aria-hidden="true">泰雅</span>
      <span class="shaku" aria-hidden="true"><b>遊</b>あそぶ</span>
      <span class="hint" aria-hidden="true">押すと、もう一度書く</span>
    </button>
    <h1 class="vt">面白さを分析して、<br>自分の手で形にする。</h1>
    <div class="hero-foot">
      <div>
        <p class="lede">遊んで終わりにせず、なぜ面白いのかを構造で捉える。その分析を、企画書と、自分で書いたツールの両方で形にしてきました。ゲームプランナーを志望しています。</p>
        <p class="who"><b>槌橋 泰雅</b>2028年卒　関西学院大学 国際学部 国際学科 3年　／　カウナス工科大学（リトアニア）交換留学　／　TOEIC L&amp;R 785・IELTS 5.5</p>
      </div>
      <a class="cue" href="#about" aria-label="自己紹介へ進む"><span class="cue-t">下へ</span><span class="cue-l" aria-hidden="true"><i></i></span></a>
    </div>
  </div>
</section>

<section class="band tint" id="about">
  <div class="in">
    <div class="sh">
      <div class="rule"></div>
      <h2>自己紹介</h2>
    </div>
    <div class="about">
      <div class="txt">
        <p class="lead">「なぜ面白いのか」を、感覚で終わらせずに数字と構造で説明することを大事にしています。</p>
        <p>対戦データを集めるツールを作ったのも、企画書の市場分析を公表された実測値だけで書いたのも、そのためです。</p>
        <p>リトアニアに留学していたとき、現地の友人と日本語版の『桃太郎電鉄』を20年モードで遊びました。私が通訳しながら進めて、気づけば朝になっていました。言葉も文化も違う相手と、同じ画面で笑い合える。ゲームはそれを届けられるものだと、そのとき実感しました。</p>
        <p>遊ぶ人の行動をデータで確かめながら、国や言葉を越えて遊ばれるゲームを企画できる人になりたいと考えています。</p>
      </div>
      <ol class="tl">
        <li><time>2024年4月</time><span>関西学院大学 国際学部に入学。Unity と C# でゲームを作り始める</span></li>
        <li><time>2025年7〜9月</time><span>フィリピンで語学留学</span></li>
        <li><time>2026年1〜6月</time><span>カウナス工科大学（リトアニア）情報学部に交換留学。C#・Python・システムシミュレーションを英語で履修</span></li>
        <li><time>2026年6月</time><span>社外の企画書ワークショップで、現場の制作者の方に企画書を見ていただく</span></li>
        <li><time>2026年10月</time><span>指摘をもとに、企画書を全面的に作り直す</span></li>
      </ol>
    </div>
  </div>
</section>

<section class="band" id="works">
  <div class="in">
    <div class="sh">
      <div class="rule"></div>
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
        <figure><img src="__real_extra__" alt="ターゲットの母数を実測値で示したページ"><figcaption>ターゲットの母数（実測値で裏付け）</figcaption></figure>
      </div>
      <div class="body">
        <h3>リアルか、超次元か</h3>
        <p class="role">オリジナル企画書 / サッカーゲーム</p>
        <p>サッカーゲームは、リアルを追求するほど操作が難しくなって離れられ、派手にするほど競技性が薄れます。ただし真ん中は「空白」ではなく「重なり」です。派手に決めたい、でも運で決まったとは思われたくない。この二つは同じ人の中に同時にあります。戦術で膳立てを作る時間と、狙って決める一瞬を二層に分け、その間にある緊張そのものを面白さの核に置きました。</p>
        <p>市場の主張は、公表されている実測値だけで裏を取っています。推測で埋めず、顧客数そのものではない数字は代理指標だと明記しました。この企画書は、社外のワークショップで現場の制作者の方に直接見ていただいたものを、いただいた指摘をもとに全面的に作り直した版です。「文字で詰めすぎると敬遠される」「なぜ面白いのかを自分で主張できていない」「両極端にいるお客さんを連れてこられるか」。指摘を受けて、文章を削り、図を増やし、何を捨てて何を残すのかまで書き切りました。</p>
        <div class="links"><a class="lnk solid" href="docs/real-or-ultra.pdf">企画書を読む（PDF・15ページ）</a></div>
      </div>
      <div class="ba">
        <h4>作り直す前と後</h4>
        <p>市場の真ん中を「誰もいない空白」と書いていたのを、「両方を求める同じ人がいる重なり」に書き直しました。どちらも市場分析のページです。</p>
        <div class="media">
          <figure><img src="__real_before__" alt="作り直す前の市場分析。リアル路線と超次元路線の間を「融合領域（空白）」と書いている"><figcaption><b>前</b>ワークショップに出した版（2026年6月・5ページ）</figcaption></figure>
          <figure><img src="__real_after__" alt="作り直した後の市場分析。真ん中を「重なる領域」とし、両方を求める同じ人を狙うと書いている"><figcaption><b>後</b>作り直した版（2026年10月・15ページ）</figcaption></figure>
        </div>
      </div>
    </article>
  </div>
</section>

<section class="band tint" id="tools">
  <div class="in">
    <div class="sh">
      <div class="rule"></div>
      <h2>つくったツール</h2>
      <p>いずれも専門知識がない状態から着手し、調べながら作り直して実用水準まで仕上げたものです。</p>
    </div>

    <article class="work">
      <div class="body">
        <h3>ブロスタ ピック提案ツール</h3>
        <p class="role">個人開発 / 対戦データ分析</p>
        <dl class="fit">
          <div><dt>使う人</dt><dd>『ブロスタ』のガチバトルを始めたばかりの人</dd></div>
          <div><dt>困っていたこと</dt><dd>序盤で脱落する原因はピックにあるのに、何を選ぶべきかは感覚で語られている</dd></div>
          <div><dt>作ったもの</dt><dd>マップごとの勝率から、BANの候補と次に選ぶブロウラーを提案するツール</dd></div>
        </dl>
        <p>感覚で語っても誰も納得しないので、まず数字を集めることから始めました。</p>
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
        <dl class="fit">
          <div><dt>使う人</dt><dd>『ポケモンチャンピオンズ』で対戦する人</dd></div>
          <div><dt>困っていたこと</dt><dd>対戦中は数秒で判断したいのに、相手の持ち物や技がわからないまま計算することになる</dd></div>
          <div><dt>作ったもの</dt><dd>ダメージと確定数をすぐ出す計算ツール。図鑑から、実際の対戦での技・持ち物の採用率も引ける</dd></div>
        </dl>
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
        <dl class="fit">
          <div><dt>使う人</dt><dd>Pokémon GO のリーグ対戦をする人</dd></div>
          <div><dt>困っていたこと</dt><dd>どの個体を強化すべきか、ゲーム内のCPとHPだけでは判断できない</dd></div>
          <div><dt>作ったもの</dt><dd>個体値を逆算してリーグごとの順位を出し、編成の候補まで組めるツール</dd></div>
        </dl>
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
        <dl class="fit">
          <div><dt>使う人</dt><dd>企業研究をする就活生（まず自分）</dd></div>
          <div><dt>困っていたこと</dt><dd>決算書は会社や会計基準ごとに書き方が違い、横に並べて比べにくい</dd></div>
          <div><dt>作ったもの</dt><dd>財務三表を図にし、60以上の指標と分析レポートを自動で出すツール</dd></div>
        </dl>
        <p>企業研究のために作りました。決算PDFのほか、EDINET・SEC EDGARから直接データを取り込めます（スキャンされた画像PDFは文字認識で読み取り）。貸借対照表・損益計算書・キャッシュフロー計算書の三表を図にして、ROEやPBRなど60以上の指標を自動計算し、「なぜその数字になったのか」まで踏み込んだ分析レポートを書き出します。取り込んだ数字は貸借一致などの会計ルールで自動検算し、実在企業を使った回帰テストで誤りを機械的に検出する仕組みにしました。ゲーム以外の領域でも、数字から構造を読む手順は同じだと考えています。</p>
        <div class="metrics">
          <div><b>60+</b><span>算出指標</span></div>
          <div><b>25</b><span>回帰テスト件数</span></div>
        </div>
        <p class="stack">EDINET / SEC 連携・PDF取込・OCR / 自動レポート生成</p>
      </div>
    </article>

    <article class="work">
      <div class="body">
        <h3>演習ドリル — Webテストの模試</h3>
        <p class="role">個人開発 / 学習支援</p>
        <dl class="fit">
          <div><dt>使う人</dt><dd>Webテストを受ける就活生（まず自分）</dd></div>
          <div><dt>困っていたこと</dt><dd>問題集は数が限られていて、繰り返すうちに答えを覚えてしまう</dd></div>
          <div><dt>作ったもの</dt><dd>問題を毎回その場で作るので、何度受けても同じ問題に当たらない模試</dd></div>
        </dl>
        <p>SPI・玉手箱・TG-WEB・CUBICなど6種類の試験を、本番と同じ画面構成と制限時間で受けられます。</p>
        <p>最初の版は、推測で決めた難度が本番よりずっと易しいものでした。そこで、試験ごとに公開されている実例や解説から形式と難度の基準を文書にまとめ、届かない問題はすべて作り直すか削除しました。答えは総当たりで決め、生成とは別の解き方で自動的に解き直して照合しています。同じ仕組みで、日商簿記2級やビジネス会計検定2級などの資格試験の模試も作りました。</p>
        <p>あわせて、マーケティングと事業企画の判断を数字で練習するケース問題を35本作りました。1本は4つの判断の連続で、選ぶとその結果の数字と現場での考え方が出ます。答えを伏せて解き直す点検を重ね、正解が1つに決まることを確かめています。</p>
        <div class="metrics">
          <div><b>6</b><span>Webテストの形式</span></div>
          <div><b>305</b><span>計数の問題の型</span></div>
          <div><b>35</b><span>マーケのケース問題</span></div>
          <div><b>3</b><span>資格試験の模試</span></div>
        </div>
        <p class="stack">React / Vite / TypeScript / 図は毎回計算してSVGで描画</p>
      </div>
      <div class="media">
        <figure><img src="__shot_drill__" alt="TG-WEB（従来型）の模試画面。展開図の問題と5つの選択肢、左下に残り時間"><figcaption>TG-WEB（従来型）の模試画面</figcaption></figure>
      </div>
    </article>
  </div>
</section>

<section class="band ink" id="analysis">
  <div class="in an-grid">
  <div class="an-txt">
    <div class="sh">
      <div class="rule"></div>
      <h2>イナズマイレブン ― 必殺技はなぜ報酬として機能するのか</h2>
    </div>
    <p>このシリーズの必殺技は、演出ではなく報酬として設計されています。プレイヤーが我慢した時間に対して、必殺技という形で一気に支払いが行われる。ただし報酬は、与えすぎれば価値が下がります。続編を重ねるほど演出が派手になり、一発の重みが薄れていく構造をインフレとして整理しました。</p>
    <p>そのうえで、報酬の希少性をどう取り戻すかという視点から改善案を2つ提案しています。</p>
    <div class="links"><a class="lnk solid" href="docs/inazuma-report.pdf">レポートを読む（PDF・3ページ）</a></div>
  </div>
  <figure class="an-fig" aria-labelledby="an-cap">
    <svg viewBox="0 0 520 330" role="img" aria-label="概念図：必殺技を撃つほど1回の価値が下がる今の作りと、ここぞに集めて価値を取り戻す提案">
      <g class="ax"><path d="M40 286 H500"/><path d="M40 286 V24"/></g>
      <text class="lab" x="44" y="18">1回の必殺技の価値</text><text class="lab" x="500" y="310" text-anchor="end">試合の流れ</text>
      <g class="now"><path class="ln" d="M60 286 V70 M108 286 V110 M150 286 V146 M188 286 V176 M222 286 V200 M252 286 V218 M280 286 V232 M306 286 V242 M330 286 V250 M352 286 V256 M372 286 V260 M392 286 V263"/><text class="tg" x="168" y="132">今：撃つほど安くなる</text></g>
      <g class="pro"><path class="ln" d="M150 286 V60 M330 286 V44 M470 286 V30"/><circle cx="150" cy="60" r="5"/><circle cx="330" cy="44" r="5"/><circle cx="470" cy="30" r="5"/><text class="tg" x="168" y="86">提案：ここぞに集める</text></g>
    </svg>
    <figcaption id="an-cap">レポートの主張を図にした概念図（実測値ではありません）</figcaption>
  </figure>
  </div>
</section>

<section class="band tint" id="approach">
  <div class="in">
    <div class="sh">
      <div class="rule"></div>
      <h2>仕事の進め方</h2>
    </div>
    <div class="grid4">
      <div class="card"><div class="n">一</div><h3>課題を自分で見つける</h3><p>違和感を覚えた時点で、まず何が起きているのかを言葉にする。</p><p class="ev"><b>実例</b>『ブロスタ』で初心者が序盤に脱落する原因を、操作ではなくピックの段階にあると考えたところから作り始めた。</p></div>
      <div class="card"><div class="n">二</div><h3>数字で裏を取る</h3><p>感覚で語らず、他人が検証できる形に落とす。</p><p class="ev"><b>実例</b>ピック提案は70万試合の集計を根拠にし、企画書の市場分析は公表された実測値だけで裏を取った。</p></div>
      <div class="card"><div class="n">三</div><h3>形にする</h3><p>専門知識がなくても、調べながら作り直して実用水準まで持っていく。</p><p class="ev"><b>実例</b>APIが必要なデータを返さないところから設計を考え直し、ツールを5本、実際に使える状態まで作った。</p></div>
      <div class="card"><div class="n">四</div><h3>外の評価で作り直す</h3><p>評価されない可能性のある場所に、自分から出ていく。</p><p class="ev"><b>実例</b>企画書を社外のワークショップで制作者の方に見ていただき、いただいた指摘をもとに全面的に作り直した。</p></div>
    </div>
  </div>
</section>

<section class="band" id="contact">
  <div class="in contact">
    <p class="vt-close" aria-hidden="true">一緒に、<br>面白いものを。</p>
    <div class="c-main">
      <h2>連絡先</h2>
      <div class="mail-row"><p class="mail" id="mail">taiga_tsuchi@icloud.com</p><button id="copy" type="button">アドレス<br>をコピー</button></div>
      <ul class="c-links">
        <li><a href="docs/dokanball.pdf"><span class="tag">PDF</span><span class="nm">企画書『ふくらめ！ドカンボール』</span></a></li>
        <li><a href="docs/real-or-ultra.pdf"><span class="tag">PDF</span><span class="nm">企画書『リアルか、超次元か』</span></a></li>
        <li><a href="docs/inazuma-report.pdf"><span class="tag">PDF</span><span class="nm">分析レポート『イナズマイレブン』</span></a></li>
        <li><a href="apps/brawl/"><span class="tag">Web</span><span class="nm">ブロスタ ピック提案ツール</span></a></li>
      </ul>
    </div>
  </div>
</section>

<footer>
  <div class="in">
    <span>&copy; 2026 Taiga Tsuchihashi</span>
    <span>All Rights Reserved</span>
    <span class="sp">最終更新 2026年11月</span>
  </div>
  <div class="in">
    <div class="rights">
      <p>本サイトで紹介している『ブロスタ』のピック提案ツールは、個人が制作した非公式のファンコンテンツです。Supercell とは一切関係がなく、Supercell による承認・後援を受けたものではありません。ゲーム内の名称・画像等の権利はすべて Supercell Oy に帰属します。</p>
      <p>This material is unofficial and is not endorsed by Supercell. For more information see Supercell&rsquo;s Fan Content Policy: <a href="https://www.supercell.com/fan-content-policy" target="_blank" rel="noopener noreferrer">www.supercell.com/fan-content-policy</a></p>
      <p>最初の画面の「遊」の字は、衡山毛筆フォント草書（青柳衡山）を使っています。</p>
      <p>その他、本サイトに掲載している各社の作品名・サービス名は、各権利者の商標または登録商標です。</p>
    </div>
  </div>
</footer>

<script src="assets/app.js?v=__APPV__" defer></script>
</body>
</html>
"""

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")
import hashlib
V = os.path.join(SRC, "vendor")
APP = (";" + chr(10)).join([
    io.open(os.path.join(V, "lenis.min.js"), encoding="utf-8").read(),
    "window.HERO_GLYPH=" + io.open(os.path.join(SRC, "hero_glyph.json"), encoding="utf-8").read() + ";window.SECTION_GLYPHS=" + io.open(os.path.join(SRC, "section_glyphs.json"), encoding="utf-8").read(),
    io.open(os.path.join(SRC, "src", "site.js"), encoding="utf-8").read()])
# GSAP と墨のカーソルは別のファイル（読み込みが落ち着いてから site.js が読み込む）
MOT = (";" + chr(10)).join([io.open(os.path.join(V, f), encoding="utf-8").read() for f in ["gsap.min.js", "ScrollTrigger.min.js", "SplitText.min.js"]] + [io.open(os.path.join(SRC, "src", "motion.js"), encoding="utf-8").read()])
io.open(os.path.join(SRC, "motion.js"), "w", encoding="utf-8").write(MOT)
APP = APP.replace("__MOTV__", hashlib.md5(MOT.encode()).hexdigest()[:8])
io.open(os.path.join(SRC, "app.js"), "w", encoding="utf-8").write(APP)
HTML = HTML.replace("__APPV__", hashlib.md5(APP.encode()).hexdigest()[:8])
HTML = HTML.replace("__STYLE__", io.open(os.path.join(SRC, "src", "style.css"), encoding="utf-8").read())
V = os.path.join(SRC, "vendor")
SIZES = json.load(open(os.path.join(SRC, "img", "sizes.json")))
for k, (w, h) in SIZES.items():
    HTML = HTML.replace('src="__%s__"' % k, 'src="assets/img/%s.webp" width="%d" height="%d" loading="lazy" decoding="async"' % (k, w, h))
import re
left = [t for t in ["__STYLE__", "__APPV__"] + ["__%s__" % k for k in SIZES] if t in HTML] + re.findall(r'src="__[a-z0-9_]+__"', HTML)
assert not left, "置き換え残り: %s" % left[:5]
io.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html"), "w", encoding="utf-8").write(HTML)
print("written KB:", len(HTML.encode()) // 1024)
