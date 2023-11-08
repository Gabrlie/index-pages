// 预加载图片
let picList = []
let max_length = 30
let min_length = 0
if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    // 当前设备是移动设备
    picList = ['https://bing.img.run/m.php','https://gcore.jsdelivr.net/gh/Gabrlie/PicGo_Images/gabrlie.jpg']
    max_length = 12
} else {
    picList = ['https://bing.img.run/1920x1080.php','https://gcore.jsdelivr.net/gh/Gabrlie/PicGo_Images/gabrlie.jpg']
    min_length = 12
}

let count = 0
function preloadPic() {
    for(let i = 0; i < picList.length; i++) {
        let img = new Image()
        img.src = picList[i]
        img.onload = () => {
            count = count + 1;
            if(count === picList.length) {
                // 所有照片预加载完毕会自动调用后续函数
                preloadHito()
            }
        }
        img.onerror = () => {
            // 如果出现问题仍然跳出循环，避免一直处于加载状态，但是会报错提醒
            alert("诶呀，服务器可能出现了什么问题，请稍后再试试吧")
            preloadHito()
        }
    }
}

// 加载一言
// 手机端与PC端加载的最大长度不同
function preloadHito() {
    $.get('https://v1.hitokoto.cn',{
        min_length:min_length,
        max_length:max_length
    },(res)=>{
        $('.hitokoto').html(''+res.hitokoto+'<br />-「<strong>'+res.from+'</strong>」')
    })
    onload()
}

// 加载完毕
function onload() {
    // 加载完毕隐藏蒙版
    $('.loader-cover').hide()
    // 显示正常页面
    $('.Gabrlie').show()
    window.setTimeout(()=>{
        // 通过修改max-height来显示动画
        $('.Gabrlie').css('max-height','600px')
        $('.Gabrlie').addClass('onload')
        $('.info').show()
        window.setTimeout(()=>{
            let op = 0
            // 背景渐入
            let back = window.setInterval(()=>{
                // op小于10时将其转化为的字符串前加上0
                let ops = op < 10 ? '0'+op : op
                $('.Gabrlie').css('background-color','rgba(0, 0, 0, .'+ ops +')')
                op++;
                if(op === 30) {
                    window.clearTimeout(back)
                }
            },20)
            // 按钮淡入
            $('.extra-button').fadeIn(600)
        },2000)
    },1000)
}

// 开启预加载
preloadPic()