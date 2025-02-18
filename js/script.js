document.addEventListener('DOMContentLoaded', function() {
    // 最初のタブコンテンツを表示
    document.querySelector('.tab-content').style.display = 'block';

    // タブクリック時の処理
    const tabLinks = document.querySelectorAll('.recruit-tabs a');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // すべてのタブコンテンツを非表示
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // クリックされたタブに対応するコンテンツを表示
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).style.display = 'block';
            
            // アクティブなタブのスタイルを変更
            tabLinks.forEach(link => link.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
});

let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    
    // すべてのスライドを非表示
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // 次のスライドへ
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // 現在のスライドを表示
    slides[slideIndex-1].style.display = "block";
    
    // 3秒後に次のスライドへ
    setTimeout(showSlides, 3000);
} 