let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    // すべてのスライドを非表示
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // 次のスライドインデックスを計算
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    
    // 現在のスライドを表示
    slides[slideIndex].classList.add('active');
    
    // 5秒後に次のスライドを表示
    setTimeout(showSlides, 5000);
}

// 最初のスライドを表示
document.addEventListener('DOMContentLoaded', function() {
    slides[0].classList.add('active');
    showSlides();
}); 
