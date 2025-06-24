let slideIndex = 0; // 現在表示しているスライドのインデックス
let slides;           // すべてのスライド要素を格納する変数
let slideInterval;    // 自動スライドショーのインターバルID

document.addEventListener('DOMContentLoaded', () => {
    slides = document.querySelectorAll('.slide');
    // ドットナビゲーションがHTMLにない場合、dots変数は不要です。
    // もしドットナビゲーションを実装する場合は、HTMLにドット要素を追加し、
    // ここで `dots = document.querySelectorAll('.dot');` のコメントを解除してください。
    // 現状のCSSでドットに関する記述はありますが、HTML構造がないためここでは削除します。

    if (slides.length > 0) {
        showSlides(slideIndex); // 初期表示
        startSlideShow(); // 自動スライドショーを開始
    }
});

// スライドを表示する関数
function showSlides(n) {
    // スライドのインデックスが範囲外になった場合のリセット
    if (n >= slides.length) {
        slideIndex = 0;
    }    
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // 全てのスライドからactiveクラスとfadeクラスを削除する
    // これにより、新しいスライドにアニメーションが再適用されます
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active', 'fade');
    }

    // 現在のスライドにactiveクラスとfadeクラスを追加する
    slides[slideIndex].classList.add('active', 'fade');

    // ドットナビゲーションがある場合、以下のコメントを解除して使用してください
    /*
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    if (dots.length > 0) { // ドットが存在する場合のみ処理
        dots[slideIndex].classList.add("active");
    }
    */
}

// 前へ/次へボタンの関数
function plusSlides(n) {
    resetSlideShow(); // 手動操作時に自動スライドショーをリセット
    slideIndex += n;
    showSlides(slideIndex);
}

// ドットクリックでスライドを切り替える関数 (ドット実装時)
// HTMLにドット要素がある場合にのみ機能します
function currentSlide(n) {
    resetSlideShow(); // 手動操作時に自動スライドショーをリセット
    slideIndex = n - 1; // nは1から始まるため、インデックスに変換
    showSlides(slideIndex);
}

// 自動スライドショーを開始する関数
function startSlideShow() {
    slideInterval = setInterval(() => {
        plusSlides(1); // 4秒ごとに次のスライドへ
    }, 4000); // 4000ミリ秒 = 4秒ごとにスライド
}

// 自動スライドショーをリセットする関数 (手動操作時など)
function resetSlideShow() {
    clearInterval(slideInterval); // 現在のインターバルをクリア
    startSlideShow(); // 新しいインターバルで再開
}

// もし「前へ」「次へ」ボタンやドットナビゲーションをHTMLに配置する予定がある場合は、
// それぞれの要素に `onclick="plusSlides(1)"` や `onclick="currentSlide(1)"` などを設定してください。
