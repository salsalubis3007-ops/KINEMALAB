// ========================================
// PHYSIM - GERAK
// SIMULATION
// ========================================

let currentSimulation = "parabola";
let animationId = null;
let isRunning = false;


// ========================================
// ELEMENT CANVAS
// ========================================

const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");


// ========================================
// START SIMULATION
// ========================================

function startSimulation() {

    if (currentSimulation === "glb") {
        simulateGLB();
    }

    else if (currentSimulation === "glbb") {
        simulateGLBB();
    }

    else if (currentSimulation === "vertikal") {
        simulateVertikal();
    }

    else if (currentSimulation === "jatuhbebas") {
        simulateJatuhBebas();
    }

    else if (currentSimulation === "parabola") {
        simulateParabola();
    }
}


// ========================================
// RESET SIMULATION
// ========================================

function resetSimulation() {

    if (animationId !== null) {
        cancelAnimationFrame(animationId);
    }

    animationId = null;
    isRunning = false;

    clearCanvas();
    resetResult();
}


// ========================================
// CLEAR CANVAS
// ========================================

function clearCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}


// ========================================
// RESET RESULT
// ========================================

function resetResult() {

    document.getElementById("resultLabel1").innerHTML = "Hasil 1";
    document.getElementById("resultValue1").innerHTML = "—";
    document.getElementById("resultUnit1").innerHTML = "—";

    document.getElementById("resultLabel2").innerHTML = "Hasil 2";
    document.getElementById("resultValue2").innerHTML = "—";
    document.getElementById("resultUnit2").innerHTML = "—";

    document.getElementById("resultLabel3").innerHTML = "Hasil 3";
    document.getElementById("resultValue3").innerHTML = "—";
    document.getElementById("resultUnit3").innerHTML = "—";
}


// ========================================
// BACKGROUND
// ========================================

function drawBackground() {

    // Langit
    const skyGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    skyGradient.addColorStop(
        0,
        "#dff3ff"
    );

    skyGradient.addColorStop(
        1,
        "#ffffff"
    );

    ctx.fillStyle = skyGradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Matahari
    const sunX = canvas.width - 80;
    const sunY = 60;

    ctx.fillStyle = "#FFD54F";

    ctx.beginPath();

    ctx.arc(
        sunX,
        sunY,
        28,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Awan
    drawCloud(120, 70, 0.8);
    drawCloud(480, 100, 0.6);


    // Tanah
    const groundY = canvas.height - 70;

    ctx.fillStyle = "#d9f2d9";

    ctx.fillRect(
        0,
        groundY,
        canvas.width,
        canvas.height - groundY
    );


    // Jalan
    ctx.fillStyle = "#707070";

    ctx.fillRect(
        0,
        groundY,
        canvas.width,
        45
    );


    // Garis jalan
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.setLineDash([
        20,
        15
    ]);

    ctx.beginPath();

    ctx.moveTo(
        0,
        groundY + 22
    );

    ctx.lineTo(
        canvas.width,
        groundY + 22
    );

    ctx.stroke();

    ctx.setLineDash([]);


    // Batas jalan
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(
        0,
        groundY
    );

    ctx.lineTo(
        canvas.width,
        groundY
    );

    ctx.stroke();
}


// ========================================
// BASKETBALL BACKGROUND
// KHUSUS GERAK PARABOLA
// ========================================

function drawBasketballBackground() {

    // ========================================
    // LANGIT
    // ========================================

    const skyGradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            canvas.height
        );

    skyGradient.addColorStop(
        0,
        "#dff3ff"
    );

    skyGradient.addColorStop(
        1,
        "#ffffff"
    );

    ctx.fillStyle = skyGradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ========================================
    // DINDING / TRIBUN
    // ========================================

    ctx.fillStyle = "#e8edf2";

    ctx.fillRect(
        0,
        80,
        canvas.width,
        220
    );


    // Garis tribun

    ctx.strokeStyle = "#c8d0d8";
    ctx.lineWidth = 2;

    for (
        let y = 110;
        y <= 260;
        y += 35
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            canvas.width,
            y
        );

        ctx.stroke();
    }


    // ========================================
    // LANTAI LAPANGAN
    // ========================================

    const courtY =
        canvas.height - 110;

    ctx.fillStyle = "#c98a52";

    ctx.fillRect(
        0,
        courtY,
        canvas.width,
        canvas.height - courtY
    );


    // ========================================
    // GARIS LAPANGAN
    // ========================================

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    // Garis belakang

    ctx.beginPath();

    ctx.moveTo(
        0,
        courtY + 10
    );

    ctx.lineTo(
        canvas.width,
        courtY + 10
    );

    ctx.stroke();


    // Garis samping

    ctx.beginPath();

    ctx.moveTo(
        25,
        courtY
    );

    ctx.lineTo(
        25,
        canvas.height
    );

    ctx.stroke();


    // Area dekat ring

    ctx.beginPath();

    ctx.arc(
        canvas.width - 80,
        courtY + 10,
        65,
        Math.PI,
        Math.PI * 2
    );

    ctx.stroke();


    // ========================================
    // PAPAN BASKET
    // ========================================

    const boardX = 570;
    const boardY = 115;

    // Tiang

    ctx.strokeStyle = "#555";
    ctx.lineWidth = 10;

    ctx.beginPath();

    ctx.moveTo(
        boardX + 65,
        boardY + 55
    );

    ctx.lineTo(
        boardX + 65,
        courtY
    );

    ctx.stroke();


    // Papan

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        boardX,
        boardY,
        80,
        55
    );


    // Border papan

    ctx.strokeStyle = "#555";
    ctx.lineWidth = 3;

    ctx.strokeRect(
        boardX,
        boardY,
        80,
        55
    );


    // Kotak papan

    ctx.strokeStyle = "#e53935";
    ctx.lineWidth = 2;

    ctx.strokeRect(
        boardX + 22,
        boardY + 18,
        36,
        25
    );


    // ========================================
    // RING
    // ========================================

    ctx.strokeStyle = "#e53935";
    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.ellipse(
        boardX + 40,
        boardY + 62,
        22,
        7,
        0,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    // ========================================
    // NET
    // ========================================

    ctx.strokeStyle = "#eeeeee";
    ctx.lineWidth = 1;

    for (
        let i = -15;
        i <= 15;
        i += 7
    ) {

        ctx.beginPath();

        ctx.moveTo(
            boardX + 40 + i,
            boardY + 68
        );

        ctx.lineTo(
            boardX + 40 + i * 0.6,
            boardY + 90
        );

        ctx.stroke();
    }
}


// ========================================
// NATURE BACKGROUND
// ========================================

function drawNatureBackground() {

    // ========================================
    // LANGIT
    // ========================================

    const skyGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    skyGradient.addColorStop(
        0,
        "#b9e7ff"
    );

    skyGradient.addColorStop(
        1,
        "#f4fbff"
    );

    ctx.fillStyle = skyGradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ========================================
    // MATAHARI
    // ========================================

    const sunX = canvas.width - 80;
    const sunY = 60;

    ctx.fillStyle = "#FFD54F";

    ctx.beginPath();

    ctx.arc(
        sunX,
        sunY,
        30,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // ========================================
    // AWAN
    // ========================================

    drawCloud(
        100,
        70,
        0.8
    );

    drawCloud(
        500,
        110,
        0.65
    );


    // ========================================
    // RUMPUT
    // ========================================

    const grassY =
        canvas.height - 70;


    ctx.fillStyle = "#7BC96F";

    ctx.fillRect(
        0,
        grassY,
        canvas.width,
        70
    );


    // ========================================
    // PERMUKAAN RUMPUT
    // ========================================

    ctx.fillStyle = "#4CAF50";

    ctx.fillRect(
        0,
        grassY,
        canvas.width,
        12
    );


    // ========================================
    // TANAH
    // ========================================

    ctx.fillStyle = "#8D6E4A";

    ctx.fillRect(
        0,
        grassY + 35,
        canvas.width,
        35
    );


    // ========================================
    // GARIS TANAH
    // ========================================

    ctx.fillStyle = "#6D4C41";

    ctx.fillRect(
        0,
        grassY + 35,
        canvas.width,
        5
    );


    // ========================================
    // RUMPUT-RUMPUT KECIL
    // ========================================

    ctx.strokeStyle = "#2E7D32";
    ctx.lineWidth = 2;

    for (
        let x = 10;
        x < canvas.width;
        x += 25
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            grassY + 12
        );

        ctx.lineTo(
            x - 4,
            grassY + 4
        );

        ctx.moveTo(
            x,
            grassY + 12
        );

        ctx.lineTo(
            x + 5,
            grassY + 3
        );

        ctx.stroke();
    }
}


// ========================================
// CLOUD
// ========================================

function drawCloud(x, y, scale = 1) {

    ctx.fillStyle = "#ffffff";

    ctx.beginPath();

    ctx.arc(
        x,
        y + 10 * scale,
        18 * scale,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 20 * scale,
        y,
        25 * scale,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 45 * scale,
        y + 10 * scale,
        18 * scale,
        0,
        Math.PI * 2
    );

    ctx.rect(
        x - 5 * scale,
        y + 10 * scale,
        55 * scale,
        20 * scale
    );

    ctx.fill();
}


// ========================================
// DRAW TREE
// ========================================

function drawTree(x, groundY) {

    // Batang pohon
    ctx.fillStyle = "#8D5A3B";

    ctx.fillRect(
        x - 15,
        groundY - 190,
        30,
        190
    );


    // Cabang kiri
    ctx.strokeStyle = "#8D5A3B";
    ctx.lineWidth = 12;

    ctx.beginPath();

    ctx.moveTo(
        x,
        groundY - 130
    );

    ctx.lineTo(
        x - 55,
        groundY - 175
    );

    ctx.stroke();


    // Cabang kanan
    ctx.beginPath();

    ctx.moveTo(
      x,
      groundY - 145
     
    );

    ctx.lineTo(
      x + 45,
      groundY - 160

    );

    ctx.stroke();

    // Daun bagian atas
    ctx.fillStyle = "#4CAF50";

    ctx.beginPath();

    ctx.arc(
        x,
        groundY - 215,
        55,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Daun kiri
    ctx.beginPath();

    ctx.arc(
        x - 45,
        groundY - 180,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Daun kanan
    ctx.beginPath();

    ctx.arc(
        x + 45,
        groundY - 180,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Daun tambahan
    ctx.beginPath();

    ctx.arc(
        x,
        groundY - 165,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


// ========================================
// DRAW APPLE
// ========================================

function drawApple(x, y) {

    // Badan apel
    ctx.fillStyle = "#e53935";

    ctx.beginPath();

    ctx.arc(
        x - 6,
        y,
        10,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 6,
        y,
        10,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Bagian bawah apel
    ctx.beginPath();

    ctx.arc(
        x,
        y + 4,
        13,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Batang apel
    ctx.strokeStyle = "#6D4C41";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
        x,
        y - 8
    );

    ctx.lineTo(
        x + 2,
        y - 15
    );

    ctx.stroke();


    // Daun
    ctx.fillStyle = "#4CAF50";

    ctx.beginPath();

    ctx.ellipse(
        x + 7,
        y - 13,
        7,
        4,
        -0.4,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


// ========================================
// DRAW BALL
// ========================================

function drawBall(x, y) {

    // Bola basket
    ctx.fillStyle = "#f28c28";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        11,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Garis bola basket
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 1.5;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        11,
        Math.PI * 0.2,
        Math.PI * 1.2
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        11,
        -Math.PI * 0.3,
        Math.PI * 0.7
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        x - 10,
        y
    );

    ctx.quadraticCurveTo(
        x,
        y + 5,
        x + 10,
        y
    );

    ctx.stroke();
}

// ========================================
// DRAW TREE
// ========================================

function drawTree(x, groundY) {

    // Batang pohon
    ctx.fillStyle = "#8D5A2B";

    ctx.fillRect(
        x - 18,
        groundY - 210,
        36,
        210
    );


    // Cabang kiri
    ctx.strokeStyle = "#8D5A2B";
    ctx.lineWidth = 12;

    ctx.beginPath();

    ctx.moveTo(
        x,
        groundY - 150
    );

    ctx.lineTo(
        x - 60,
        groundY - 200
    );

    ctx.stroke();


    // Cabang kanan
    ctx.beginPath();

    ctx.moveTo(
        x,
        groundY - 170
    );

    ctx.lineTo(
        x + 55,
        groundY - 215
    );

    ctx.stroke();


    // Daun bagian kiri
    ctx.fillStyle = "#4CAF50";

    ctx.beginPath();

    ctx.arc(
        x - 65,
        groundY - 215,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Daun bagian tengah
    ctx.beginPath();

    ctx.arc(
        x,
        groundY - 245,
        55,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Daun bagian kanan
    ctx.beginPath();

    ctx.arc(
        x + 55,
        groundY - 220,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Daun bagian atas
    ctx.beginPath();

    ctx.arc(
        x,
        groundY - 290,
        42,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


// ========================================
// DRAW APPLE
// ========================================

function drawApple(x, y) {

    // Badan apel
    ctx.fillStyle = "#e53935";

    ctx.beginPath();

    ctx.arc(
        x - 6,
        y,
        10,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 6,
        y,
        10,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Bagian bawah apel
    ctx.beginPath();

    ctx.arc(
        x,
        y + 4,
        13,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Tangkai
    ctx.strokeStyle = "#6D4C41";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
        x,
        y - 9
    );

    ctx.lineTo(
        x + 3,
        y - 18
    );

    ctx.stroke();


    // Daun kecil
    ctx.fillStyle = "#4CAF50";

    ctx.beginPath();

    ctx.ellipse(
        x + 8,
        y - 15,
        7,
        4,
        -0.4,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


// ========================================
// DRAW WHEEL
// ========================================

function drawWheel(x, y) {

    ctx.fillStyle = "#202020";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        10,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "#cfcfcf";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "#555";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        2,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


// ========================================
// DRAW CAR
// ========================================

function drawCar(x, y) {

    // Bayangan
    ctx.fillStyle = "rgba(0,0,0,0.18)";

    ctx.beginPath();

    ctx.ellipse(
        x + 35,
        y + 2,
        42,
        6,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Body
    ctx.fillStyle = "#e60000";

    ctx.beginPath();

    ctx.roundRect(
        x,
        y - 35,
        72,
        27,
        5
    );

    ctx.fill();


    // Atap
    ctx.beginPath();

    ctx.moveTo(
        x + 13,
        y - 35
    );

    ctx.lineTo(
        x + 27,
        y - 56
    );

    ctx.lineTo(
        x + 53,
        y - 56
    );

    ctx.lineTo(
        x + 67,
        y - 35
    );

    ctx.closePath();

    ctx.fill();


    // Kaca
    ctx.fillStyle = "#9ddcff";

    ctx.beginPath();

    ctx.moveTo(
        x + 20,
        y - 38
    );

    ctx.lineTo(
        x + 29,
        y - 52
    );

    ctx.lineTo(
        x + 36,
        y - 52
    );

    ctx.lineTo(
        x + 36,
        y - 38
    );

    ctx.closePath();

    ctx.fill();


    ctx.beginPath();

    ctx.moveTo(
        x + 40,
        y - 52
    );

    ctx.lineTo(
        x + 51,
        y - 52
    );

    ctx.lineTo(
        x + 62,
        y - 38
    );

    ctx.lineTo(
        x + 40,
        y - 38
    );

    ctx.closePath();

    ctx.fill();


    // Lampu
    ctx.fillStyle = "#fff4a3";

    ctx.beginPath();

    ctx.roundRect(
        x + 65,
        y - 29,
        7,
        8,
        2
    );

    ctx.fill();


    // Roda
    drawWheel(
        x + 18,
        y - 7
    );

    drawWheel(
        x + 55,
        y - 7
    );
}


// ========================================
// GLB
// ========================================

function simulateGLB() {

    const velocity =
        Number(
            document.getElementById("velocity").value
        );

    const totalTime =
        Number(
            document.getElementById("time").value
        );


    if (velocity < 0) {

        alert(
            "Kecepatan tidak boleh negatif."
        );

        isRunning = false;
        return;
    }


    if (totalTime <= 0) {

        alert(
            "Waktu harus lebih besar dari 0."
        );

        isRunning = false;
        return;
    }


    const totalDistance =
        velocity * totalTime;


    const playerX = 180;

    const startX =
        playerX + 25;

    const groundY =
        canvas.height - 70;


    const scale =
        Math.min(
            (canvas.width - 120) /
            Math.max(totalDistance, 1),

            8
        );


    let startTime = null;


    function animate(timestamp) {

        if (startTime === null) {
            startTime = timestamp;
        }


        const elapsed =
            (timestamp - startTime) / 1000;


        const t =
            Math.min(
                elapsed,
                totalTime
            );


        const distance =
            velocity * t;


        const x =
            startX +
            distance * scale;


        clearCanvas();

        drawBackground();

        drawCar(
            x,
            groundY
        );


        ctx.fillStyle = "#173b5b";
        ctx.font = "16px Arial";

        ctx.fillText(
            `t = ${t.toFixed(2)} s`,
            30,
            30
        );

        ctx.fillText(
            `s = ${distance.toFixed(2)} m`,
            30,
            55
        );


        if (t < totalTime) {

            animationId =
                requestAnimationFrame(
                    animate
                );

        }

        else {

            isRunning = false;
            animationId = null;

            showGLBResult(
                distance,
                totalTime
            );
        }
    }


    animationId =
        requestAnimationFrame(
            animate
        );
}


// ========================================
// GLB RESULT
// ========================================

function showGLBResult(
    distance,
    time
) {

    document.getElementById("resultLabel1").innerHTML =
        "Jarak";

    document.getElementById("resultValue1").innerHTML =
        distance.toFixed(2);

    document.getElementById("resultUnit1").innerHTML =
        "m";


    document.getElementById("resultLabel2").innerHTML =
        "Kecepatan";

    document.getElementById("resultValue2").innerHTML =
        (distance / time).toFixed(2);

    document.getElementById("resultUnit2").innerHTML =
        "m/s";


    document.getElementById("resultLabel3").innerHTML =
        "Waktu";

    document.getElementById("resultValue3").innerHTML =
        time.toFixed(2);

    document.getElementById("resultUnit3").innerHTML =
        "s";
}


// ========================================
// GLBB
// ========================================

function simulateGLBB() {

    const initialVelocity =
        Number(
            document.getElementById(
                "initialVelocity"
            ).value
        );

    const acceleration =
        Number(
            document.getElementById(
                "acceleration"
            ).value
        );

    const totalTime =
        Number(
            document.getElementById(
                "time"
            ).value
        );


    if (totalTime <= 0) {

        alert(
            "Waktu harus lebih besar dari 0."
        );

        isRunning = false;
        return;
    }


    const totalDistance =
        initialVelocity * totalTime +
        0.5 *
        acceleration *
        totalTime *
        totalTime;


    const startX = 50;

    const groundY =
        canvas.height - 70;


    const scale =
        Math.min(
            (canvas.width - 120) /
            Math.max(
                Math.abs(totalDistance),
                1
            ),

            8
        );


    let startTime = null;


    function animate(timestamp) {

        if (startTime === null) {
            startTime = timestamp;
        }


        const elapsed =
            (timestamp - startTime) / 1000;


        const t =
            Math.min(
                elapsed,
                totalTime
            );


        const velocity =
            initialVelocity +
            acceleration * t;


        const distance =
            initialVelocity * t +
            0.5 *
            acceleration *
            t *
            t;


        const x =
            startX +
            distance * scale;


        clearCanvas();

        drawBackground();

        drawCar(
            x,
            groundY
        );


        ctx.fillStyle = "#173b5b";
        ctx.font = "16px Arial";

        ctx.fillText(
            `t = ${t.toFixed(2)} s`,
            30,
            30
        );

        ctx.fillText(
            `s = ${distance.toFixed(2)} m`,
            30,
            55
        );

        ctx.fillText(
            `v = ${velocity.toFixed(2)} m/s`,
            30,
            80
        );


        if (t < totalTime) {

            animationId =
                requestAnimationFrame(
                    animate
                );

        }

        else {

            isRunning = false;
            animationId = null;

            showGLBBResult(
                distance,
                velocity,
                totalTime
            );
        }
    }


    animationId =
        requestAnimationFrame(
            animate
        );
}


// ========================================
// GLBB RESULT
// ========================================

function showGLBBResult(
    distance,
    velocity,
    time
) {

    document.getElementById("resultLabel1").innerHTML =
        "Jarak";

    document.getElementById("resultValue1").innerHTML =
        distance.toFixed(2);

    document.getElementById("resultUnit1").innerHTML =
        "m";


    document.getElementById("resultLabel2").innerHTML =
        "Kecepatan Akhir";

    document.getElementById("resultValue2").innerHTML =
        velocity.toFixed(2);

    document.getElementById("resultUnit2").innerHTML =
        "m/s";


    document.getElementById("resultLabel3").innerHTML =
        "Waktu";

    document.getElementById("resultValue3").innerHTML =
        time.toFixed(2);

    document.getElementById("resultUnit3").innerHTML =
        "s";
}


// ========================================
// GERAK VERTIKAL
// ========================================

function simulateVertikal() {

    const initialVelocity =
        Number(
            document.getElementById(
                "initialVelocity"
            ).value
        );

    const gravity =
        Number(
            document.getElementById(
                "gravity"
            ).value
        );


    if (initialVelocity <= 0) {

        alert(
            "Kecepatan awal harus lebih besar dari 0."
        );

        isRunning = false;
        return;
    }


    if (gravity <= 0) {

        alert(
            "Gravitasi harus lebih besar dari 0."
        );

        isRunning = false;
        return;
    }


    const totalTime =
        (2 * initialVelocity) /
        gravity;


    const maxHeight =
        (initialVelocity *
            initialVelocity) /
        (2 * gravity);


    const groundY =
        canvas.height - 70;


    const scale =
        Math.min(
            8,
            (groundY - 40) /
            Math.max(maxHeight, 1)
        );


    let startTime = null;


    function animate(timestamp) {

        if (startTime === null) {
            startTime = timestamp;
        }


        const elapsed =
            (timestamp - startTime) / 1000;


        const t =
            Math.min(
                elapsed,
                totalTime
            );


        const height =
            Math.max(
                0,
                initialVelocity * t -
                0.5 *
                gravity *
                t *
                t
            );


        const velocity =
            initialVelocity -
            gravity * t;


        const x =
            canvas.width / 2;


        const y =
            groundY -
            height * scale;


clearCanvas();

drawNatureBackground();


// Pohon
drawTree(
    canvas.width / 2,
    groundY
);


// Apel
drawApple(
    x,
    y
);

        ctx.fillStyle = "#173b5b";
        ctx.font = "16px Arial";

        ctx.fillText(
            `t = ${t.toFixed(2)} s`,
            30,
            30
        );

        ctx.fillText(
            `h = ${height.toFixed(2)} m`,
            30,
            55
        );

        ctx.fillText(
            `v = ${velocity.toFixed(2)} m/s`,
            30,
            80
        );


        if (t < totalTime) {

            animationId =
                requestAnimationFrame(
                    animate
                );

        }

        else {

            isRunning = false;
            animationId = null;

            showVertikalResult(
                maxHeight,
                totalTime,
                initialVelocity
            );
        }
    }


    animationId =
        requestAnimationFrame(
            animate
        );
}


// ========================================
// GERAK VERTIKAL RESULT
// ========================================

function showVertikalResult(
    maxHeight,
    totalTime,
    initialVelocity
) {

    document.getElementById("resultLabel1").innerHTML =
        "Tinggi Maksimum";

    document.getElementById("resultValue1").innerHTML =
        maxHeight.toFixed(2);

    document.getElementById("resultUnit1").innerHTML =
        "m";


    document.getElementById("resultLabel2").innerHTML =
        "Waktu Tempuh";

    document.getElementById("resultValue2").innerHTML =
        totalTime.toFixed(2);

    document.getElementById("resultUnit2").innerHTML =
        "s";


    document.getElementById("resultLabel3").innerHTML =
        "Kecepatan Awal";

    document.getElementById("resultValue3").innerHTML =
        initialVelocity.toFixed(2);

    document.getElementById("resultUnit3").innerHTML =
        "m/s";
}


// ========================================
// JATUH BEBAS
// ========================================

function simulateJatuhBebas() {

    const height =
        Number(
            document.getElementById(
                "height"
            ).value
        );

    const gravity =
        Number(
            document.getElementById(
                "gravity"
            ).value
        );


    if (height <= 0) {

        alert(
            "Ketinggian harus lebih besar dari 0."
        );

        isRunning = false;
        return;
    }


    if (gravity <= 0) {

        alert(
            "Gravitasi harus lebih besar dari 0."
        );

        isRunning = false;
        return;
    }


    const totalTime =
        Math.sqrt(
            (2 * height) /
            gravity
        );


    const finalVelocity =
        gravity * totalTime;


    const groundY =
        canvas.height - 70;


    const scale =
        Math.min(
            8,
            (groundY - 30) /
            height
        );


    let startTime = null;


    function animate(timestamp) {

        if (startTime === null) {
            startTime = timestamp;
        }


        const elapsed =
            (timestamp - startTime) / 1000;


        const t =
            Math.min(
                elapsed,
                totalTime
            );


        const fallenDistance =
            0.5 *
            gravity *
            t *
            t;


        const currentHeight =
            Math.max(
                0,
                height -
                fallenDistance
            );


        const velocity =
            gravity * t;


         const x =
            canvas.width / 2 + 45;

         const y =
            groundY -
            currentHeight * scale -
            5;

     clearCanvas();

     drawNatureBackground();


     // Pohon
         drawTree(
         canvas.width / 2,
         groundY
     
        );


     // Apel
         drawApple(
         x,
         y
    
        );


        ctx.fillStyle = "#173b5b";
        ctx.font = "16px Arial";

        ctx.fillText(
            `t = ${t.toFixed(2)} s`,
            30,
            30
        );

        ctx.fillText(
            `h = ${currentHeight.toFixed(2)} m`,
            30,
            55
        );

        ctx.fillText(
            `v = ${velocity.toFixed(2)} m/s`,
            30,
            80
        );


        if (t < totalTime) {

            animationId =
                requestAnimationFrame(
                    animate
                );

        }

        else {

            isRunning = false;
            animationId = null;

            showJatuhBebasResult(
                finalVelocity,
                totalTime
            );
        }
    }


    animationId =
        requestAnimationFrame(
            animate
        );
}


// ========================================
// JATUH BEBAS RESULT
// ========================================

function showJatuhBebasResult(
    finalVelocity,
    totalTime
) {

    document.getElementById("resultLabel1").innerHTML =
        "Kecepatan Akhir";

    document.getElementById("resultValue1").innerHTML =
        finalVelocity.toFixed(2);

    document.getElementById("resultUnit1").innerHTML =
        "m/s";


    document.getElementById("resultLabel2").innerHTML =
        "Waktu Jatuh";

    document.getElementById("resultValue2").innerHTML =
        totalTime.toFixed(2);

    document.getElementById("resultUnit2").innerHTML =
        "s";


    document.getElementById("resultLabel3").innerHTML =
        "Kecepatan Awal";

    document.getElementById("resultValue3").innerHTML =
        "0";

    document.getElementById("resultUnit3").innerHTML =
        "m/s";
}


// ========================================
// GERAK PARABOLA
// ========================================

function simulateParabola() {

    const initialVelocity =
        Number(
            document.getElementById(
                "initialVelocity"
            ).value
        );

    const angle =
        Number(
            document.getElementById(
                "angle"
            ).value
        );

    const gravity =
        Number(
            document.getElementById(
                "gravity"
            ).value
        );


    // ========================================
    // VALIDASI
    // ========================================

    if (initialVelocity <= 0) {

        alert(
            "Kecepatan awal harus lebih besar dari 0."
        );

        isRunning = false;
        return;
    }


    if (angle <= 0 || angle >= 90) {

        alert(
            "Sudut harus berada antara 0° dan 90°."
        );

        isRunning = false;
        return;
    }


    if (gravity <= 0) {

        alert(
            "Gravitasi harus lebih besar dari 0."
        );

        isRunning = false;
        return;
    }


    // ========================================
    // KOMPONEN KECEPATAN
    // ========================================

    const angleRad =
        angle * Math.PI / 180;


    const velocityX =
        initialVelocity *
        Math.cos(angleRad);


    const velocityY =
        initialVelocity *
        Math.sin(angleRad);


    // ========================================
    // RUMUS GERAK PARABOLA
    // ========================================

    const totalTime =
        (2 * velocityY) /
        gravity;


    const maxHeight =
        (velocityY * velocityY) /
        (2 * gravity);


    const maxRange =
        velocityX *
        totalTime;


    // ========================================
    // POSISI LAPANGAN
    // ========================================

    const groundY =
        canvas.height - 110;


    const startX = 100;


    // ========================================
    // POSISI RING
    // ========================================

    const ringX = 610;

    const ringY = 177;


    // ========================================
    // RING DITEMPATKAN PADA
    // BAGIAN TURUN LINTASAN
    // ========================================

    // Bola mencapai ring pada sekitar
    // 75% dari jangkauan horizontal.

    const ringDistance =
        maxRange * 0.75;


    const ringTime =
        ringDistance /
        velocityX;


    // Tinggi bola saat mencapai ring
    const ringHeight =
        velocityY * ringTime -
        0.5 *
        gravity *
        ringTime *
        ringTime;


    // ========================================
    // SKALA VISUAL
    // ========================================

    const scaleX =
        (ringX - startX) /
        Math.max(
            ringDistance,
            0.1
        );


    const scaleY =
        (groundY - ringY) /
        Math.max(
            ringHeight,
            0.1
        );


    // ========================================
    // ANIMASI
    // ========================================

    let startTime = null;


    function animate(timestamp) {

        if (startTime === null) {

            startTime = timestamp;
        }


        const elapsed =
            (timestamp - startTime) /
            1000;


        const t =
            Math.min(
                elapsed,
                totalTime
            );


        // ====================================
        // POSISI FISIKA
        // ====================================

        const horizontalDistance =
            velocityX * t;


        const height =
            Math.max(
                0,
                velocityY * t -
                0.5 *
                gravity *
                t *
                t
            );


        // ====================================
        // POSISI VISUAL
        // ====================================

        const x =
            startX +
            horizontalDistance *
            scaleX;


        const y =
            groundY -
            height *
            scaleY;


        // ====================================
        // GAMBAR BACKGROUND
        // ====================================

        clearCanvas();

        drawBasketballBackground();


        // ====================================
        // LINTASAN PARABOLA
        // ====================================

        ctx.strokeStyle = "#173b5b";
        ctx.lineWidth = 2;

        ctx.setLineDash([
            5,
            5
        ]);

        ctx.beginPath();


        for (
            let pathTime = 0;
            pathTime <= totalTime;
            pathTime += 0.03
        ) {

            const pathDistance =
                velocityX *
                pathTime;


            const pathHeight =
                Math.max(
                    0,
                    velocityY *
                    pathTime -
                    0.5 *
                    gravity *
                    pathTime *
                    pathTime
                );


            const pathX =
                startX +
                pathDistance *
                scaleX;


            const pathY =
                groundY -
                pathHeight *
                scaleY;


            if (pathTime === 0) {

                ctx.moveTo(
                    pathX,
                    pathY
                );

            } else {

                ctx.lineTo(
                    pathX,
                    pathY
                );
            }
        }


        ctx.stroke();

        ctx.setLineDash([]);


        // ====================================
        // BOLA
        // ====================================

        drawBall(
            x,
            y
        );


        // ====================================
        // INFORMASI
        // ====================================

        ctx.fillStyle = "#173b5b";
        ctx.font = "16px Arial";


        ctx.fillText(
            `t = ${t.toFixed(2)} s`,
            30,
            30
        );


        ctx.fillText(
            `x = ${horizontalDistance.toFixed(2)} m`,
            30,
            55
        );


        ctx.fillText(
            `y = ${height.toFixed(2)} m`,
            30,
            80
        );


        // ====================================
        // DETEKSI BOLA MASUK RING
        // ====================================

        if (
            t >= ringTime &&
            t <= ringTime + 0.20
        ) {

            ctx.fillStyle = "#173b5b";
            ctx.font = "bold 15px Arial";

            ctx.fillText(
                "🏀 Bola masuk ring!",
                30,
                110
            );
        }


        // ====================================
        // LANJUTKAN SAMPAI JATUH
        // ====================================

        if (t < totalTime) {

            animationId =
                requestAnimationFrame(
                    animate
                );

        } else {

            isRunning = false;

            animationId = null;


            showParabolaResult(
                maxHeight,
                maxRange,
                totalTime
            );
        }
    }


    animationId =
        requestAnimationFrame(
            animate
        );
}


// ========================================
// PARABOLA RESULT
// ========================================

function showParabolaResult(
    maxHeight,
    maxRange,
    totalTime
) {

    document.getElementById("resultLabel1").innerHTML =
        "Tinggi Maksimum";

    document.getElementById("resultValue1").innerHTML =
        maxHeight.toFixed(2);

    document.getElementById("resultUnit1").innerHTML =
        "m";


    document.getElementById("resultLabel2").innerHTML =
        "Jangkauan";

    document.getElementById("resultValue2").innerHTML =
        maxRange.toFixed(2);

    document.getElementById("resultUnit2").innerHTML =
        "m";


    document.getElementById("resultLabel3").innerHTML =
        "Waktu Tempuh";

    document.getElementById("resultValue3").innerHTML =
        totalTime.toFixed(2);

    document.getElementById("resultUnit3").innerHTML =
        "s";
}


// ========================================
// CONTROL GLB
// ========================================

function showGLBControls() {

    document.querySelector(
        ".simulation-controls"
    ).innerHTML = `

        <h2>Parameters</h2>

        <label>Kecepatan</label>

        <div class="input-group">
            <input
                type="number"
                id="velocity"
                value="10"
            >
            <span>m/s</span>
        </div>


        <label>Waktu</label>

        <div class="input-group">
            <input
                type="number"
                id="time"
                value="5"
            >
            <span>s</span>
        </div>


        <div class="simulation-buttons">

            <button
                class="btn btn-primary"
                id="startSimulation"
            >
                ▶ Start
            </button>

            <button
                class="btn btn-reset"
                id="resetSimulation"
            >
                ↻ Reset
            </button>

        </div>
    `;

    attachSimulationButtons();
}


// ========================================
// CONTROL GLBB
// ========================================

function showGLBBControls() {

    document.querySelector(
        ".simulation-controls"
    ).innerHTML = `

        <h2>Parameters</h2>

        <label>Kecepatan Awal</label>

        <div class="input-group">
            <input
                type="number"
                id="initialVelocity"
                value="5"
            >
            <span>m/s</span>
        </div>


        <label>Percepatan</label>

        <div class="input-group">
            <input
                type="number"
                id="acceleration"
                value="2"
            >
            <span>m/s²</span>
        </div>


        <label>Waktu</label>

        <div class="input-group">
            <input
                type="number"
                id="time"
                value="5"
            >
            <span>s</span>
        </div>


        <div class="simulation-buttons">

            <button
                class="btn btn-primary"
                id="startSimulation"
            >
                ▶ Start
            </button>

            <button
                class="btn btn-reset"
                id="resetSimulation"
            >
                ↻ Reset
            </button>

        </div>
    `;

    attachSimulationButtons();
}


// ========================================
// CONTROL VERTIKAL
// ========================================

function showVertikalControls() {

    document.querySelector(
        ".simulation-controls"
    ).innerHTML = `

        <h2>Parameters</h2>

        <label>Kecepatan Awal</label>

        <div class="input-group">
            <input
                type="number"
                id="initialVelocity"
                value="20"
            >
            <span>m/s</span>
        </div>


        <label>Gravitasi</label>

        <div class="input-group">
            <input
                type="number"
                id="gravity"
                value="9.8"
            >
            <span>m/s²</span>
        </div>


        <div class="simulation-buttons">

            <button
                class="btn btn-primary"
                id="startSimulation"
            >
                ▶ Start
            </button>

            <button
                class="btn btn-reset"
                id="resetSimulation"
            >
                ↻ Reset
            </button>

        </div>
    `;

    attachSimulationButtons();
}


// ========================================
// CONTROL JATUH BEBAS
// ========================================

function showJatuhBebasControls() {

    document.querySelector(
        ".simulation-controls"
    ).innerHTML = `

        <h2>Parameters</h2>

        <label>Ketinggian</label>

        <div class="input-group">
            <input
                type="number"
                id="height"
                value="20"
            >
            <span>m</span>
        </div>


        <label>Gravitasi</label>

        <div class="input-group">
            <input
                type="number"
                id="gravity"
                value="9.8"
            >
            <span>m/s²</span>
        </div>


        <div class="simulation-buttons">

            <button
                class="btn btn-primary"
                id="startSimulation"
            >
                ▶ Start
            </button>

            <button
                class="btn btn-reset"
                id="resetSimulation"
            >
                ↻ Reset
            </button>

        </div>
    `;

    attachSimulationButtons();
}


// ========================================
// CONTROL PARABOLA
// ========================================

function showParabolaControls() {

    document.querySelector(
        ".simulation-controls"
    ).innerHTML = `

        <h2>Parameters</h2>

        <label>Kecepatan Awal</label>

        <div class="input-group">
            <input
                type="number"
                id="initialVelocity"
                value="20"
            >
            <span>m/s</span>
        </div>


        <label>Sudut</label>

        <div class="input-group">
            <input
                type="number"
                id="angle"
                value="45"
            >
            <span>°</span>
        </div>


        <label>Gravitasi</label>

        <div class="input-group">
            <input
                type="number"
                id="gravity"
                value="9.8"
            >
            <span>m/s²</span>
        </div>


        <div class="simulation-buttons">

            <button
                class="btn btn-primary"
                id="startSimulation"
            >
                ▶ Start
            </button>

            <button
                class="btn btn-reset"
                id="resetSimulation"
            >
                ↻ Reset
            </button>

        </div>
    `;

    attachSimulationButtons();
}


// ========================================
// SELECT SIMULATION
// ========================================

function selectSimulation(simulation) {

    currentSimulation = simulation;


    // Hentikan animasi sebelumnya
    if (animationId !== null) {

        cancelAnimationFrame(
            animationId
        );

        animationId = null;
    }


    isRunning = false;


    clearCanvas();

    resetResult();


   // Aktifkan hanya tab yang dipilih
      const tabs =
      document.querySelectorAll(
        ".simulation-tab"
    );

     tabs.forEach(function(tab) {

      tab.classList.remove(
        "active"
    );

});

const activeTab =
    document.querySelector(
        `.simulation-tab[onclick*="selectSimulation('${simulation}'"]`
    );

if (activeTab) {

    activeTab.classList.add(
        "active"
    );

}

    const title =
        document.querySelector(
            ".simulation-display h2"
        );


    if (simulation === "glb") {

        title.textContent =
            "Gerak Lurus Beraturan";

        showGLBControls();
    }


    else if (simulation === "glbb") {

        title.textContent =
            "Gerak Lurus Berubah Beraturan";

        showGLBBControls();
    }


    else if (simulation === "vertikal") {

        title.textContent =
            "Gerak Vertikal";

        showVertikalControls();
    }


    else if (simulation === "jatuhbebas") {

        title.textContent =
            "Jatuh Bebas";

        showJatuhBebasControls();
    }


    else if (simulation === "parabola") {

        title.textContent =
            "Gerak Parabola";

        showParabolaControls();
    }
}


// ========================================
// BUTTON EVENT
// ========================================

function attachSimulationButtons() {

    const startButton =
        document.getElementById(
            "startSimulation"
        );

    const resetButton =
        document.getElementById(
            "resetSimulation"
        );


    if (startButton) {

        startButton.addEventListener(
            "click",
            function() {

                if (isRunning) {
                    return;
                }

                isRunning = true;

                startSimulation();

            }
        );
    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function() {

                resetSimulation();

            }
        );
    }
}


// ========================================
// INITIALIZE
// ========================================

showParabolaControls();

clearCanvas();

drawBackground();

resetResult();


// ========================================
// END
// ========================================
