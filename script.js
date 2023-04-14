const questions = [
  {
    question: "お酢に卵を殻ごといれると卵はどうなるでしょう？",
    answers: [
      {
        text: "透明な卵になる",
        correct: true,
      },
      {
        text: "鏡のようになんでもうつる卵になる",
        correct: false,
      },
      {
        text: "透明卵が溶けてなくなるな卵になる",
        correct: false,
      },
      {
        text: "卵が石のように堅くなる",
        correct: false,
      },
    ],
  },
  {
    question:
      "しゃっくりはある調味料をなめると止まります。ある調味料とはなんでしょう？",
    answers: [
      {
        text: "お酢",
        correct: true,
      },
      {
        text: "砂糖",
        correct: true,
      },
      {
        text: "醤油",
        correct: false,
      },
      {
        text: "塩",
        correct: false,
      },
    ],
  },
  {
    question:
      "甘くて美味しい羊羹ですが、羊羹はもともとあるものを煮込んだスープのことでした。あるスープとはなんでしょう？",
    answers: [
      {
        text: "牛の血",
        correct: true,
      },
      {
        text: "牛乳",
        correct: false,
      },
      {
        text: "羊の肉",
        correct: false,
      },
      {
        text: "馬の肉",
        correct: false,
      },
    ],
  },
  {
    question: "おぼうさんが木魚をたたく意味はなんでしょう？",
    answers: [
      {
        text: "お経にリズムをつけるため",
        correct: true,
      },
      {
        text: "亡くなった人が天国にいけるようにと祈るため",
        correct: false,
      },
      {
        text: "眠くならないようにするため",
        correct: true,
      },
      {
        text: "悪い霊を寄せ付けないため",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// 現在の質問のインっデックス番号の初期値
let currentQuestionIndex = 0;
// スコアの初期値
let score = 0;

// 最初のクイズ
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "次へ";
  showQuestion();
}

// 表示する質問
function showQuestion() {
  // 初期値で設定したanswers-buttonを削除
  resetState();
  // 質問の配列
  let currentQuestion = questions[currentQuestionIndex];
  // 実際の質問番号は「インデックス番号＋１」になる
  let questionNo = currentQuestionIndex + 1;
  // 質問をいれる箇所にはクイズの番号と現在の質問の内容
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  //表示する回答
  currentQuestion.answers.forEach((answer) => {
    // 新しくボタンタグを生成
    const button = document.createElement("button");
    // その新しく生成したbuttonにテキストを入力
    button.innerHTML = answer.text;
    // ボタンタグにクラスリストを追加
    button.classList.add("btn");
    // 子要素の末尾に追加(appendChild)
    answerButtons.appendChild(button);
    // console.log(answerButtons);
    // console.log(button.dataset);

    //answer.correctの値がtrueの答えだけ、detasetにtrueを入れる
    // つまり、正しい回答にしかdatasetは設定されていない
    if (answer.correct) {
      // correct属性に正、負正解をいれる
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  // [次へ]ボタンを非表示
  nextButton.style.display = "none";
  //各要素（各質問）について繰り返し削除処理をする
  while (answerButtons.firstChild) {
    // 要素を削除(removeChild)
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  // クリックされたボタン要素を変数に格納
  const selectBtn = e.target;
  //クラスを追加するようのbooleanを定義する
  const isCorrect = selectBtn.dataset.correct === "true";
  //   選択されたボタンのデータセットがtrueかfalseかでクラスを追加する
  if (isCorrect) {
    selectBtn.classList.add("correct");
  } else {
    selectBtn.classList.add("incorrect");
  }

  //  回答を一回しかできないようにする処理
  //   button配列を一つずつ繰り返す
  Array.from(answerButtons.children).forEach((button) => {
    //間違えた回答をした場合、同時に正解も表示する
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    // 非活性（ボタンを押せなくする）
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

// 実行
startQuiz();
