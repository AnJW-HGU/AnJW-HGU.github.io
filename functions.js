// 초기 폭죽과 하트 애니메이션
function createFireworks() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(firework);

            setTimeout(() => {
                for (let j = 0; j < 20; j++) {
                    const particle = document.createElement('div');
                    particle.className = 'firework';
                    particle.style.left = firework.style.left;
                    particle.style.top = firework.style.top;
                    particle.style.background = firework.style.background;
                    document.body.appendChild(particle);

                    const angle = (Math.PI * 2 * j) / 20;
                    const velocity = 2 + Math.random() * 2;
                    let x = parseFloat(firework.style.left);
                    let y = parseFloat(firework.style.top);

                    const animate = () => {
                        x += Math.cos(angle) * velocity;
                        y += Math.sin(angle) * velocity;
                        particle.style.left = x + 'px';
                        particle.style.top = y + 'px';
                        particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;

                        if (parseFloat(particle.style.opacity) > 0) {
                            requestAnimationFrame(animate);
                        } else {
                            particle.remove();
                        }
                    };
                    animate();
                }
                firework.remove();
            }, 100);
        }, i * 50);
    }
}

function createHearts() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '💙';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = '-50px';
            heart.style.animationDuration = (3 + Math.random() * 2) + 's';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

// 페이지 로드시 효과
window.addEventListener('load', () => {
    createFireworks();
    // setTimeout(createHearts, 500);
});

// No 버튼 도망가기 - 마우스 근처에 오면 도망감
const noBtn1 = document.getElementById('noBtn1');
let currentPosition = 1; 
const detectionRadius = 140; 
let x = 70;
let y = 0;

noBtn1.addEventListener('mouseenter', () => {
    moveButtonClockwise(noBtn1);
});

function moveButtonClockwise(btn) {

    switch(currentPosition) {
        case 1: // 위 (가운데 위)
            y -= 120; break;
        case 2: // 오른쪽
            x += 120; break;
        case 3: // 아래 (가운데 아래)
            y += 120; break;
        case 4: // 왼쪽
            x -= 120; break;
    }

    // 처음 transform(translateX(70px))을 무시하고 새로운 좌표로 덮어씌움
    btn.style.transform = `translate(${x}px, ${y}px)`;

    // 다음 위치 (1: 위, 2: 오른쪽, 3: 아래, 4: 왼쪽)
    currentPosition = (currentPosition % 4) + 1;
}

// Screen 전환
function goToScreen2() {
    document.getElementById('screen1').classList.remove('active');
    document.getElementById('screen2').classList.add('active');
    createHearts();
}

// 드래그 앤 드롭
const hatEmoji = document.getElementById('hatEmoji');
const characterImage = document.getElementById('characterImage');

hatEmoji.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
});

characterImage.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    characterImage.style.transform = 'scale(1.05)';
});

characterImage.addEventListener('dragleave', () => {
    characterImage.style.transform = 'scale(1)';
});

characterImage.addEventListener('drop', (e) => {
    e.preventDefault();
    characterImage.style.transform = 'scale(1)';
    goToScreen3();
});

function goToScreen3() {
    document.getElementById('screen2').classList.remove('active');
    document.getElementById('screen3').classList.add('active');
    createFireworks();
}

// Screen 3의 No 버튼 (클릭 안됨)
const noBtn2 = document.getElementById('noBtn2');
// noBtn2.addEventListener('click', (e) => {
//     e.preventDefault();
//     noBtn2.style.transform = 'scale(0.9)';
//     setTimeout(() => {
//         noBtn2.style.transform = 'scale(1)';
//     }, 100);
// });
const texts = ["필요없어.", "진짜...?", "정말로...?", "다시 생각하기", "봐주기"];
let textIdx = 0;

noBtn2.addEventListener('click', (e) => {
    const card = noBtn2.closest('.card');
    card.animate([
        { transform: 'translateX(0px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(0px)' }
    ], {
        duration: 200,
        iterations: 2
    });
    
    textIdx++;
    if (textIdx < texts.length) {
        noBtn2.textContent = texts[textIdx];
        if (textIdx == 4) {
            noBtn2.style.background = `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`;
        }
    } else {
        // 마지막 단계에서 강제로 다음 화면 이동
        goToScreen4();
    }
});

function goToScreen4() {
    document.getElementById('screen3').classList.remove('active');
    document.getElementById('screen4').classList.add('active');
    
    // No 버튼 점점 투명하게
    // const noBtn3 = document.getElementById('noBtn3');
    // let opacity = 1;
    // const fadeInterval = setInterval(() => {
    //     opacity -= 0.05;
    //     noBtn3.style.opacity = opacity;
    //     if (opacity <= 0) {
    //         clearInterval(fadeInterval);
    //         noBtn3.style.pointerEvents = 'none';
    //     }
    // }, 100);
}

// Screen 4의 No 버튼 (클릭 안됨)
const noBtn3 = document.getElementById('noBtn3');
noBtn3.addEventListener('click', (e) => {
    e.preventDefault();
    let opacity = 1;
    const fadeInterval = setInterval(() => {
        opacity -= 0.05;
        noBtn3.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            noBtn3.style.pointerEvents = 'none';
        }
    }, 100);
});

function goToScreen5() {
    document.getElementById('screen4').classList.remove('active');
    document.getElementById('screen5').classList.add('active');
    createFireworks();
    createHearts();
}

// 카운트다운
let countdownInterval;

function startCountdown() {
    const year = parseInt(2026);
    const month = parseInt(2) - 1;
    const day = parseInt(14);
    const hour = parseInt(13) || 0;
    const minute = parseInt(46) || 0;

    if (!year || month < 0 || !day) {
        alert('날짜를 모두 입력해주세요!');
        return;
    }

    const targetDate = new Date(year, month, day, hour, minute, 26);
    document.getElementById('countdownDisplay').style.display = 'block';

    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            createFireworks();
            createHearts();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }, 1000);
}