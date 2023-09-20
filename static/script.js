const eyes = document.querySelectorAll('.eye'); /* 目を取得 */

document.addEventListener('mousemove', (e) => { /* マウスが動いたら */
  eyes.forEach(eye => { /* 各目に対して */
    /* 目の中心座標を計算 */
    const eyeX = eye.getBoundingClientRect().left + eye.clientWidth / 2;
    const eyeY = eye.getBoundingClientRect().top + eye.clientHeight / 2;

    /* マウスと目の角度を計算 */
    const radian = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);

    /* 瞳孔が動く距離 */
    const distance = 5;

    /* 瞳孔の新しい位置を計算 */
    const pupilX = Math.cos(radian) * distance;
    const pupilY = Math.sin(radian) * distance;

    /* CSS変数で位置を設定 */
    eye.style.setProperty('--pupil-x', pupilX + 'px');
    eye.style.setProperty('--pupil-y', pupilY + 'px');
  });
});

var selectedTone=""

document.getElementById("onee-tone").addEventListener("click", function() {
  changeTone("オカマ口調で相談に答えて ");
});
document.getElementById("hot-blooded-tone").addEventListener("click", function() {
  changeTone("熱血口調で相談に答えて ");
});
document.getElementById("gyaru-tone").addEventListener("click", function() {
  changeTone("ギャル口調で相談に答えて ");
});
document.getElementById("cat-tone").addEventListener("click", function() {
  changeTone("猫口調で相談に答えて ");
});
document.getElementById("lady-tone").addEventListener("click",function() {
  changeTone("お姉さん口調で相談に答えて ");
});
document.getElementById("cool-tone").addEventListener("click",function() {
  changeTone("クールな口調で相談に答えて ");
});

function changeTone(tone) {
  // 選択された口調を更新
  selectedTone = tone;
}

const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');

function submitQuestion() {
const question = userInput.value;
userInput.value = '';

// チャット欄に送信内容表示
const userDiv = document.createElement('div');
userDiv.className = 'user-msg';
userDiv.textContent =  question;
chatContainer.appendChild(userDiv);

// ローディング表示
const loadingDiv = document.createElement('div');
loadingDiv.className = 'loading-msg';
loadingDiv.innerHTML = '<i class="fas fa-spinner loading-icon"></i> 考え中...';
chatContainer.appendChild(loadingDiv);

// スクロールする。
chatContainer.scrollTop = chatContainer.scrollHeight;
// サーバサイドにリクエストを送る    
fetch('http://localhost:5503/ask', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: "50文字以内　"  + selectedTone + " " + question })
})
.then(response => response.json())
.then(data => {
    // Remove loading indicator
    chatContainer.removeChild(loadingDiv);

    // Add assistant's response to the chat
    const assistantDiv = document.createElement('div');
    assistantDiv.className = 'assistant-msg';
    assistantDiv.textContent = data.response;
    chatContainer.appendChild(assistantDiv);

    // Scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
});
}


      
// script.js
$(function(){
   var btn = $('button')
   btn.click(function(){
    btn.removeClass('active');
    $(this).addClass('active');
   })
  });

