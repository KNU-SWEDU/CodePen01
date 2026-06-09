// 요소 선택
const todoInput = document.querySelector('.todo-input-area input');
const addBtn = document.querySelector('.todo-add');
const todoList = document.querySelector('.todo-list');

// 할 일 추가 함수
function addTodo() {
    const text = todoInput.value.trim();
    if (text === "") return; // 빈 값 입력 방지

    // 리스트 아이템 생성
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.marginBottom = '8px';

    // 텍스트와 삭제 버튼 추가
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn" style="background:transparent; border:1px solid #ff4757; color:#ff4757; border-radius:5px; cursor:pointer; padding:2px 8px;">X</button>
    `;

    // 삭제 버튼 이벤트
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
    });

    todoList.appendChild(li);
    todoInput.value = ""; // 입력창 초기화
}

// 등록 버튼 클릭 이벤트
addBtn.addEventListener('click', addTodo);

// 엔터키 입력 이벤트
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// --- 타이머 기능 추가 ---

let timerInterval;
let timeLeft = 1500; // 25분(초 단위)
const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.querySelector('.timer-start');
const stopBtn = document.querySelector('.timer-stop');

// 시간을 MM:SS 형식으로 변환하는 함수
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// 타이머 시작 함수
function startTimer() {
    if (timerInterval) return; // 이미 실행 중이면 중복 실행 방지

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert('집중 시간이 끝났습니다! 휴식을 취하세요.');
            timeLeft = 1500; // 초기화
            timerDisplay.textContent = "25:00";
        }
    }, 1000);
}

// 타이머 정지 함수
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// 이벤트 리스너 연결
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);