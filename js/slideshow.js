let slideIndex = 0; // 現在表示しているスライドのインデックス
let slides;          // すべてのスライド要素を格納する変数
let dots;            // ドットナビゲーション要素を格納する変数
let slideInterval;   // 自動スライドショーのインターバルID

document.addEventListener('DOMContentLoaded', () => {
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.dot');

    if (slides.length > 0) {
        showSlides(slideIndex); // 初期表示
        startSlideShow(); // 自動スライドショーを開始
    }
});

// スライドを表示する関数
function showSlides(n) {
    let i;
    // スライドのインデックスが範囲外になった場合のリセット
    if (n >= slides.length) {
        slideIndex = 0;
    }    
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // 全てのスライドを非表示にする
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    // 全てのドットからactiveクラスを削除する
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // 現在のスライドを表示し、対応するドットにactiveクラスを追加する
    slides[slideIndex].style.display = "block";  
    dots[slideIndex].className += " active";
}

// 前へ/次へボタンの関数
function plusSlides(n) {
    resetSlideShow(); // 手動操作時に自動スライドショーをリセット
    slideIndex += n;
    showSlides(slideIndex);
}

// ドットクリックでスライドを切り替える関数
function currentSlide(n) {
    resetSlideShow(); // 手動操作時に自動スライドショーをリセット
    slideIndex = n - 1; // nは1から始まるため、インデックスに変換
    showSlides(slideIndex);
}

// 自動スライドショーを開始する関数
function startSlideShow() {
    slideInterval = setInterval(() => {
        plusSlides(1); // 1秒ごとに次のスライドへ
    }, 4000); // 4000ミリ秒 = 4秒ごとにスライド
}

// 自動スライドショーをリセットする関数 (手動操作時など)
function resetSlideShow() {
    clearInterval(slideInterval); // 現在のインターバルをクリア
    startSlideShow(); // 新しいインターバルで再開
}
