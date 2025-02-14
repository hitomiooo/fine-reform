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