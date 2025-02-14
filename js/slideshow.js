document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    
    function showSlides() {
        // すべてのスライドを非表示
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.opacity = "0";
            slides[i].style.display = "none";
        }
        
        // 次のスライドへ
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        
        // 現在のスライドを表示
        slides[slideIndex-1].style.opacity = "1";
        slides[slideIndex-1].style.display = "block";
        
        // 5秒後に次のスライドへ
        setTimeout(showSlides, 5000);
    }
    
    showSlides();
}); 
