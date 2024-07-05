
document.addEventListener('DOMContentLoaded', (event) => {

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const FNT = "40px System";
    let holes = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    let scene = "タイトル";
    let score = 0;
    let time = 0;
    let key = "";

    const img_hole_none = document.getElementById('hole_none');
    const img_mogura = document.getElementById('mogura');
    const img_mogura_hit = document.getElementById('mogura_hit');
    const img_hammer = document.getElementById('pikopiko_hummer');

    function drawImageCentered(image, x, y) {
        ctx.drawImage(image, x - image.width / 2, y - image.height / 2);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let j = 2; j >= 0; j--) {
            for (let i = 2; i >= 0; i--) {
                let x = 200 * i + 100;
                let y = 200 * Math.abs(j - 2) + 100;
                if (holes[i][j] === 0) {
                    drawImageCentered(img_hole_none, x, y);
                } else if (holes[i][j] === 1) {
                    drawImageCentered(img_mogura, x, y);
                } else if (holes[i][j] === 2) {
                    drawImageCentered(img_mogura_hit, x, y);
                }
                ctx.fillStyle = "white";
                ctx.font = "20px System";
                ctx.fillText(i + j * 3 + 1, x, y + 65);
                if (holes[i][j] === 2) holes[i][j] = 0;
            }
        }

        ctx.fillStyle = "white";
        ctx.font = "28px System";
        ctx.fillText("SCORE: " + score, 100, 650);
        ctx.fillStyle = "yellow";
        ctx.fillText("TIME: " + time, 350, 650);

        if (scene === "タイトル") {
            ctx.fillStyle = "white";
            ctx.font = "28px System";
            ctx.fillText("MoguPiko", 250, 80);
            ctx.fillText("[S]tart", 250, 250);
            ctx.fillText("テンキーを使用(NumLock解除)", 125, 280);
        } else if (scene === "ゲーム") {
            const r1 = Math.floor(Math.random() * 3);
            const r2 = Math.floor(Math.random() * 3);
            holes[r1][r2] = 1;

            if (key >= '1' && key <= '9') {
                const m1 = (parseInt(key) + 2) % 3;
                const m2 = Math.abs(Math.floor((parseInt(key) + 2) / 3) - 3);
                const m3 = Math.floor((parseInt(key) + 2) / 3) - 1;
                const x = 200 * m1 + 100;
                const y = 200 * m2 + 100;
                drawImageCentered(img_hammer, x, y);
                if (holes[m1][m3] === 1) {
                    holes[m1][m3] = 2;
                    score += 100;
                } else if (holes[m1][m3] === 0) {
                    score -= 100
                    if (score<100) {
                        score = 0
                    }
                    time -= 1;
                    if (time<1) {
                        time = 1
                    }
                    ctx.fillStyle = "cyan";
                    ctx.font = "28px System";
                    ctx.fillText("MISS", x, y);
                }
                
            }
            time -= 1;
            if (time <= 0) {
                scene = "ゲームオーバー";
                var finish_score = document.getElementById('finish_score');
                finish_score.value = score;
            }
        } else if (scene === "ゲームオーバー") {
            ctx.fillStyle = "white";
            ctx.font = "32px System";
            ctx.fillText("GAME END", 225, 220);
            ctx.font = "28px System";
            ctx.fillText("[R]eplay", 250, 420);
        }
    }

    function gameLoop() {
        draw();
        key = ""; // 一度使用したキーはクリア
        setTimeout(gameLoop, 600);
    }

    document.addEventListener('keydown', (e) => {
        key = e.key;
        if (scene === "タイトル" && key === 's') {
            scene = "ゲーム";
            score = 0;
            time = 30;
        } else if (scene === "ゲームオーバー" && key === 'r') {
            scene = "ゲーム";
            score = 0;
            time = 30;
        }
    });
    gameLoop();
});


