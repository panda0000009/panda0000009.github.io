// 微信弹窗功能 - 放在 body 末尾确保 PJAX 加载后也能执行

// 确保函数绑定到 window 对象
window.showWechat = function() {
    // 确保 SweetAlert2 已加载
    if (typeof Swal === 'undefined') {
        // 如果 SweetAlert2 没有加载，使用原生 alert
        alert('微信号：1516626556');
        return;
    }

    Swal.fire({
        title: '添加我的微信',
        html: '<p style="font-size:1.1em;">微信号：<b style="color: #07c160;">1516626556</b></p>',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: '复制并打开微信',
        cancelButtonText: '关闭',
        confirmButtonColor: '#07c160'
    }).then((result) => {
        if (result.isConfirmed) {
            const el = document.createElement('textarea');
            el.value = '1516626556';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            Swal.fire('已复制！', '微信号已存入剪贴板', 'success');
        }
    });
};

// 监听 PJAX 完成事件，重新绑定函数
document.addEventListener('pjax:complete', function() {
    // 确保函数在页面切换后依然可用
    window.showWechat = window.showWechat;
});
