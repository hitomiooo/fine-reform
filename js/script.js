let slideIndex = 0;

const slides = document.querySelectorAll('.slide');

function showSlides() {
    // すべてのスライドから active クラスを削除
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }

    // 次のスライドのインデックスを計算
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0; // 最初のスライドに戻る
    }

    // 現在のスライドに active クラスを追加
    slides[slideIndex].classList.add('active');

    // 5秒後に次のスライドを表示
    setTimeout(showSlides, 5000);
}

// DOMContentLoaded イベントで初期化
document.addEventListener('DOMContentLoaded', function() {
    // 最初のスライドを表示するために、初期状態で active クラスを付与
    // slideshow.jsが読み込まれた時点でslides[0]が存在することを保証するため
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    // スライドショーを開始
    showSlides();
});
