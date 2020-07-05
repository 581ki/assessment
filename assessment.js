'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('おしりデカ診断') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #おしりデカ診断';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};


const answers = [
    '{userName}のおしりはビッグバン級です。{userName}は宇宙の創造主です。',
    '{userName}のおしりはメガトン級です。{userName}はおしりの重さに日々苦労していることでしょう。',
    '{userName}のおしりはアフリカゾウ並みです。{userName}からは生命の円環を感じます。',
    '{userName}のおしりはオーシリーのデ春日・デカ林並みです。Too(BigHip)s!!',
    '{userName}のおしりはユーラシア大陸並みです。ともすれば{userName}は地球そのものかもしれません。',
    '{userName}のおしりは国家機密級です。しかしながら、デカすぎて隠せないなら機密もクソもないのでは、と{userName}は思うでしょう。',
    '{userName}のおしりは邪尻ドレッド・ルート並みです。{userName}は三邪尻の一柱。巨尻兵に匹敵するデカいおしりを誇りつつ、他のおしりのデカさを半減させる凶悪な力を持っています。',
    '{userName}のおしりは邪尻イレイザー並みです。{userName}は三邪尻の一柱。相手に応じておしりがデカくなり、かつフィールドもろとも自爆する規模がデカい能力も持ちます。',
    '{userName}のおしりは邪尻アバター並みです。{userName}は三邪尻の一柱。フィールド上で一番デカいおしりを常に100上回るデカさを誇ります。あと黒い。',
    '{userName}のおしりはバチカン市国級です。{userName}にしてはかなり小ぶりと言えるでしょう。',
    '{userName}のおしりはダイナマイト級です。今年のノーベルデ科学賞は{userName}で決まりです。',
    '{userName}のおしりはオシリスの天空竜並みです。{userName}は三幻尻の一柱。手札の枚数ぶんデカくなるでしょう。',
    '{userName}のおしりはオシリスクの巨尻兵並みです。{userName}は三幻尻の一柱。安定したデカさをもち対象に取れないためたたきにくい。',
    '{userName}のおしりはヲーの翼尻竜並みです。{userName}は三幻尻の一柱。ライフポイントを吸収してデカくなるぞ'  
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/\{userName\}/g, userName);
  return result;
}

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
  };

// テストコード
console.assert(
    assessment('太郎') ===
    '太郎のおしりはビッグバン級です。太郎は宇宙を創造するつもりですか？',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );


