// ======================================================
// PHYSIM - CALCULATOR
// Gerak: GLB, GLBB, Gerak Vertikal, Jatuh Bebas,
//        dan Gerak Parabola
// ======================================================

let currentTopic = "glb";


// ======================================================
// HELPER
// ======================================================

function getNumber(id) {
    const element = document.getElementById(id);

    if (!element) {
        return 0;
    }

    return parseFloat(element.value) || 0;
}


function setTableHeader(header1, header2, header3) {
    const headers = document.querySelectorAll(".data-table-card th");

    if (headers.length >= 3) {
        headers[0].textContent = header1;
        headers[1].textContent = header2;
        headers[2].textContent = header3;
    }
}


function clearTable() {
    const tableBody = document.getElementById("tableBody");

    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3">Belum ada data.</td>
            </tr>
        `;
    }
}


function clearGraph() {
    const graphContainer = document.getElementById("graphContainer");

    if (graphContainer) {
        graphContainer.innerHTML =
            "Grafik akan muncul setelah perhitungan.";
    }
}


function resetTableAndGraph() {
    setTableHeader("Time", "Velocity", "Position");
    clearTable();
    clearGraph();
}


// ======================================================
// SELECT TOPIC
// ======================================================

function selectTopic(topic) {

        document.querySelectorAll(".topic-button").forEach(button => {
        button.classList.remove("active");
    });

    const activeButton = document.querySelector(
        `.topic-button[onclick*="'${topic}'"]`
    );

    if (activeButton) {
        activeButton.classList.add("active");
    }

    currentTopic = topic;

    const inputArea = document.getElementById("inputArea");
    const formula = document.getElementById("formula");

        const topicName = document.getElementById("topicName");
    const topicDescription = document.getElementById("topicDescription");

    const topicInfo = {
        glb: {
            title: "🚗 Gerak Lurus Beraturan",
            description: "Hitung jarak benda berdasarkan kecepatan dan waktu."
        },

        glbb: {
            title: "🚀 Gerak Lurus Berubah Beraturan",
            description: "Hitung kecepatan dan perpindahan benda dengan percepatan tetap."
        },

        vertikal: {
            title: "⬆️ Gerak Vertikal",
            description: "Hitung posisi dan kecepatan benda yang bergerak secara vertikal."
        },

        jatuhbebas: {
            title: "⬇️ Jatuh Bebas",
            description: "Hitung kecepatan dan jarak benda yang jatuh tanpa kecepatan awal."
        },

        parabola: {
            title: "🏀 Gerak Parabola",
            description: "Hitung komponen kecepatan dan posisi benda pada lintasan parabola."
        }
    };

    if (topicName && topicDescription && topicInfo[topic]) {
        topicName.textContent = topicInfo[topic].title;
        topicDescription.textContent = topicInfo[topic].description;
    }

    if (!inputArea || !formula) {
        return;
    }

    // ------------------------------------------
    // GLB
    // ------------------------------------------

    if (topic === "glb") {

        inputArea.innerHTML = `
            <div class="input-group">
                <label>Kecepatan (v)</label>
                <input
                    type="number"
                    id="v"
                    placeholder="contoh: 10"
                    step="any"
                >
                <span>m/s</span>
            </div>

            <div class="input-group">
                <label>Waktu (t)</label>
                <input
                    type="number"
                    id="t"
                    placeholder="contoh: 5"
                    step="any"
                >
                <span>s</span>
            </div>
        `;

        formula.innerHTML = `
            <strong>Rumus GLB:</strong><br>
            s = v × t
        `;
    }


    // ------------------------------------------
    // GLBB
    // ------------------------------------------

    else if (topic === "glbb") {

        inputArea.innerHTML = `
            <div class="input-group">
                <label>Kecepatan Awal (v₀)</label>
                <input
                    type="number"
                    id="v0"
                    placeholder="contoh: 5"
                    step="any"
                >
                <span>m/s</span>
            </div>

            <div class="input-group">
                <label>Percepatan (a)</label>
                <input
                    type="number"
                    id="a"
                    placeholder="contoh: 2"
                    step="any"
                >
                <span>m/s²</span>
            </div>

            <div class="input-group">
                <label>Waktu (t)</label>
                <input
                    type="number"
                    id="t"
                    placeholder="contoh: 5"
                    step="any"
                >
                <span>s</span>
            </div>
        `;

        formula.innerHTML = `
            <strong>Rumus GLBB:</strong><br>
            v = v₀ + at<br>
            s = v₀t + ½at²
        `;
    }


    // ------------------------------------------
    // GERAK VERTIKAL
    // ------------------------------------------

    else if (topic === "vertikal") {

        inputArea.innerHTML = `
            <div class="input-group">
                <label>Kecepatan Awal (v₀)</label>
                <input
                    type="number"
                    id="v0"
                    placeholder="contoh: 20"
                    step="any"
                >
                <span>m/s</span>
            </div>

            <div class="input-group">
                <label>Waktu (t)</label>
                <input
                    type="number"
                    id="t"
                    placeholder="contoh: 2"
                    step="any"
                >
                <span>s</span>
            </div>

            <div class="input-group">
                <label>Percepatan Gravitasi (g)</label>
                <input
                    type="number"
                    id="g"
                    value="9.8"
                    step="any"
                >
                <span>m/s²</span>
            </div>
        `;

        formula.innerHTML = `
            <strong>Rumus Gerak Vertikal:</strong><br>
            h = v₀t − ½gt²<br>
            v = v₀ − gt
        `;
    }


    // ------------------------------------------
    // JATUH BEBAS
    // ------------------------------------------

    else if (topic === "jatuhbebas") {

        inputArea.innerHTML = `
            <div class="input-group">
                <label>Waktu (t)</label>
                <input
                    type="number"
                    id="t"
                    placeholder="contoh: 3"
                    step="any"
                >
                <span>s</span>
            </div>

            <div class="input-group">
                <label>Percepatan Gravitasi (g)</label>
                <input
                    type="number"
                    id="g"
                    value="9.8"
                    step="any"
                >
                <span>m/s²</span>
            </div>
        `;

        formula.innerHTML = `
            <strong>Rumus Jatuh Bebas:</strong><br>
            v = gt<br>
            h = ½gt²
        `;
    }


    // ------------------------------------------
    // GERAK PARABOLA
    // ------------------------------------------

    else if (topic === "parabola") {

        inputArea.innerHTML = `
            <div class="input-group">
                <label>Kecepatan Awal (v₀)</label>
                <input
                    type="number"
                    id="v0"
                    placeholder="contoh: 20"
                    step="any"
                >
                <span>m/s</span>
            </div>

            <div class="input-group">
                <label>Sudut (θ)</label>
                <input
                    type="number"
                    id="angle"
                    placeholder="contoh: 45"
                    step="any"
                >
                <span>°</span>
            </div>

            <div class="input-group">
                <label>Waktu (t)</label>
                <input
                    type="number"
                    id="t"
                    placeholder="contoh: 2"
                    step="any"
                >
                <span>s</span>
            </div>

            <div class="input-group">
                <label>Percepatan Gravitasi (g)</label>
                <input
                    type="number"
                    id="g"
                    value="9.8"
                    step="any"
                >
                <span>m/s²</span>
            </div>
        `;

        formula.innerHTML = `
            <strong>Rumus Gerak Parabola:</strong><br>
            vₓ = v₀ cos θ<br>
            vᵧ = v₀ sin θ − gt<br>
            x = v₀ cos θ × t<br>
            y = v₀ sin θ × t − ½gt²
        `;
    }

    resetTableAndGraph();
}


// ======================================================
// CALCULATE
// ======================================================

function calculate() {

    const resultElement = document.getElementById("result");

    if (!resultElement) {
        return;
    }

    let result = "";

    // ==================================================
    // GLB
    // ==================================================

    if (currentTopic === "glb") {

        const v = getNumber("v");
        const t = getNumber("t");

        const s = v * t;

        result = `
            <h3>Hasil Perhitungan GLB</h3>
            <p><strong>Kecepatan:</strong> ${v.toFixed(2)} m/s</p>
            <p><strong>Waktu:</strong> ${t.toFixed(2)} s</p>
            <p><strong>Jarak:</strong> ${s.toFixed(2)} m</p>
        `;

        generateGLBTable(v, t);
        generateGLBGraph(v, t);
    }


    // ==================================================
    // GLBB
    // ==================================================

    else if (currentTopic === "glbb") {

        const v0 = getNumber("v0");
        const a = getNumber("a");
        const t = getNumber("t");

        const v = v0 + a * t;
        const s = v0 * t + 0.5 * a * t * t;

        result = `
            <h3>Hasil Perhitungan GLBB</h3>
            <p><strong>Kecepatan Awal:</strong> ${v0.toFixed(2)} m/s</p>
            <p><strong>Percepatan:</strong> ${a.toFixed(2)} m/s²</p>
            <p><strong>Waktu:</strong> ${t.toFixed(2)} s</p>
            <p><strong>Kecepatan Akhir:</strong> ${v.toFixed(2)} m/s</p>
            <p><strong>Jarak:</strong> ${s.toFixed(2)} m</p>
        `;

        generateGLBBTable(v0, a, t);
        generateGLBBGraph(v0, a, t);
    }


    // ==================================================
    // GERAK VERTIKAL
    // ==================================================

    else if (currentTopic === "vertikal") {

        const v0 = getNumber("v0");
        const t = getNumber("t");
        const g = getNumber("g");

        const h = v0 * t - 0.5 * g * t * t;
        const v = v0 - g * t;

        result = `
            <h3>Hasil Gerak Vertikal</h3>
            <p><strong>Kecepatan Awal:</strong> ${v0.toFixed(2)} m/s</p>
            <p><strong>Waktu:</strong> ${t.toFixed(2)} s</p>
            <p><strong>Gravitasi:</strong> ${g.toFixed(2)} m/s²</p>
            <p><strong>Ketinggian:</strong> ${h.toFixed(2)} m</p>
            <p><strong>Kecepatan Akhir:</strong> ${v.toFixed(2)} m/s</p>
        `;

        generateVertikalTable(v0, g, t);
        generateVertikalGraph(v0, g, t);
    }


    // ==================================================
    // JATUH BEBAS
    // ==================================================

    else if (currentTopic === "jatuhbebas") {

        const t = getNumber("t");
        const g = getNumber("g");

        const v = g * t;
        const h = 0.5 * g * t * t;

        result = `
            <h3>Hasil Jatuh Bebas</h3>
            <p><strong>Waktu:</strong> ${t.toFixed(2)} s</p>
            <p><strong>Gravitasi:</strong> ${g.toFixed(2)} m/s²</p>
            <p><strong>Kecepatan:</strong> ${v.toFixed(2)} m/s</p>
            <p><strong>Jarak Jatuh:</strong> ${h.toFixed(2)} m</p>
        `;

        generateJatuhBebasTable(g, t);
        generateJatuhBebasGraph(g, t);
    }


    // ==================================================
    // GERAK PARABOLA
    // ==================================================

    else if (currentTopic === "parabola") {

        const v0 = getNumber("v0");
        const angle = getNumber("angle");
        const t = getNumber("t");
        const g = getNumber("g");

        const rad = angle * Math.PI / 180;

        const vx = v0 * Math.cos(rad);
        const vy = v0 * Math.sin(rad) - g * t;

        const x = v0 * Math.cos(rad) * t;
        const y = v0 * Math.sin(rad) * t - 0.5 * g * t * t;

        const speed = Math.sqrt(vx * vx + vy * vy);

        result = `
            <h3>Hasil Gerak Parabola</h3>
            <p><strong>Kecepatan Awal:</strong> ${v0.toFixed(2)} m/s</p>
            <p><strong>Sudut:</strong> ${angle.toFixed(2)}°</p>
            <p><strong>Waktu:</strong> ${t.toFixed(2)} s</p>
            <p><strong>Posisi X:</strong> ${x.toFixed(2)} m</p>
            <p><strong>Posisi Y:</strong> ${y.toFixed(2)} m</p>
            <p><strong>Kecepatan X:</strong> ${vx.toFixed(2)} m/s</p>
            <p><strong>Kecepatan Y:</strong> ${vy.toFixed(2)} m/s</p>
            <p><strong>Kecepatan Total:</strong> ${speed.toFixed(2)} m/s</p>
        `;

        generateParabolaTable(v0, angle, g, t);
        generateParabolaGraph(v0, angle, g, t);
    }

    resultElement.innerHTML = result;
}


// ======================================================
// GLB - TABLE
// ======================================================

function generateGLBTable(v, totalTime) {

    const tableBody = document.getElementById("tableBody");

    if (!tableBody) {
        return;
    }

    setTableHeader("Time", "Velocity", "Position");

    tableBody.innerHTML = "";

    const steps = 5;

    for (let i = 0; i <= steps; i++) {

        const t = (totalTime / steps) * i;
        const s = v * t;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${t.toFixed(2)} s</td>
            <td>${v.toFixed(2)} m/s</td>
            <td>${s.toFixed(2)} m</td>
        `;

        tableBody.appendChild(row);
    }
}


// ======================================================
// GLB - GRAPH
// ======================================================

function generateGLBGraph(v, totalTime) {

    const graphContainer = document.getElementById("graphContainer");

    if (!graphContainer) {
        return;
    }

    const width = 650;
    const height = 300;
    const padding = 50;

    graphContainer.innerHTML = "";

    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    graphContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const points = [];
    const steps = 30;

    for (let i = 0; i <= steps; i++) {

        const t = (totalTime / steps) * i;
        const s = v * t;

        points.push({
            t: t,
            s: s
        });
    }

    drawPositionTimeGraph(
        ctx,
        width,
        height,
        padding,
        points,
        "Grafik GLB - Posisi terhadap Waktu"
    );
}


// ======================================================
// GLBB - TABLE
// ======================================================

function generateGLBBTable(v0, a, totalTime) {

    const tableBody = document.getElementById("tableBody");

    if (!tableBody) {
        return;
    }

    setTableHeader("Time", "Velocity", "Position");

    tableBody.innerHTML = "";

    const steps = 5;

    for (let i = 0; i <= steps; i++) {

        const t = (totalTime / steps) * i;

        const v = v0 + a * t;

        const s =
            v0 * t +
            0.5 * a * t * t;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${t.toFixed(2)} s</td>
            <td>${v.toFixed(2)} m/s</td>
            <td>${s.toFixed(2)} m</td>
        `;

        tableBody.appendChild(row);
    }
}


// ======================================================
// GLBB - GRAPH
// ======================================================

function generateGLBBGraph(v0, a, totalTime) {

    const graphContainer = document.getElementById("graphContainer");

    if (!graphContainer) {
        return;
    }

    const width = 650;
    const height = 300;
    const padding = 50;

    graphContainer.innerHTML = "";

    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    graphContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const points = [];
    const steps = 30;

    for (let i = 0; i <= steps; i++) {

        const t = (totalTime / steps) * i;

        const s =
            v0 * t +
            0.5 * a * t * t;

        points.push({
            t: t,
            s: s
        });
    }

    drawPositionTimeGraph(
        ctx,
        width,
        height,
        padding,
        points,
        "Grafik GLBB - Posisi terhadap Waktu"
    );
}


// ======================================================
// GERAK VERTIKAL - TABLE
// ======================================================

function generateVertikalTable(v0, g, totalTime) {

    const tableBody = document.getElementById("tableBody");

    if (!tableBody) {
        return;
    }

    setTableHeader("Time", "Velocity", "Height");

    tableBody.innerHTML = "";

    const steps = 5;

    for (let i = 0; i <= steps; i++) {

        const t = (totalTime / steps) * i;

        const v = v0 - g * t;

        const h =
            v0 * t -
            0.5 * g * t * t;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${t.toFixed(2)} s</td>
            <td>${v.toFixed(2)} m/s</td>
            <td>${h.toFixed(2)} m</td>
        `;

        tableBody.appendChild(row);
    }
}


// ======================================================
// GERAK VERTIKAL - GRAPH
// ======================================================

function generateVertikalGraph(v0, g, totalTime) {

    const graphContainer = document.getElementById("graphContainer");

    if (!graphContainer) {
        return;
    }

    const width = 650;
    const height = 300;
    const padding = 50;

    graphContainer.innerHTML = "";

    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    graphContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const points = [];
    const steps = 30;

    for (let i = 0; i <= steps; i++) {

        const t = (totalTime / steps) * i;

        const h =
            v0 * t -
            0.5 * g * t * t;

        points.push({
            t: t,
            s: h
        });
    }

    drawPositionTimeGraph(
        ctx,
        width,
        height,
        padding,
        points,
        "Grafik Gerak Vertikal - Ketinggian terhadap Waktu"
    );
}


// ======================================================
// JATUH BEBAS - TABLE
// ======================================================

function generateJatuhBebasTable(g, totalTime) {

    const tableBody = document.getElementById("tableBody");

    if (!tableBody) {
        return;
    }

    setTableHeader("Time", "Velocity", "Distance");

    tableBody.innerHTML = "";

    const steps = 5;

    for (let i = 0; i <= steps; i++) {

        const t = (totalTime / steps) * i;

        const v = g * t;

        const s =
            0.5 * g * t * t;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${t.toFixed(2)} s</td>
            <td>${v.toFixed(2)} m/s</td>
            <td>${s.toFixed(2)} m</td>
        `;

        tableBody.appendChild(row);
    }
}


// ======================================================
// JATUH BEBAS - GRAPH
// ======================================================

function generateJatuhBebasGraph(g, totalTime) {

    const graphContainer = document.getElementById("graphContainer");

    if (!graphContainer) {
        return;
    }

    const width = 650;
    const height = 300;
    const padding = 50;

    graphContainer.innerHTML = "";

    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    graphContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const points = [];
    const steps = 30;

    for (let i = 0; i <= steps; i++) {

        const t = (totalTime / steps) * i;

        const s =
            0.5 * g * t * t;

        points.push({
            t: t,
            s: s
        });
    }

    drawPositionTimeGraph(
        ctx,
        width,
        height,
        padding,
        points,
        "Grafik Jatuh Bebas - Jarak terhadap Waktu"
    );
}


// ======================================================
// GERAK PARABOLA - TABLE
// ======================================================

function generateParabolaTable(v0, angle, g, totalTime) {

    const tableBody = document.getElementById("tableBody");

    if (!tableBody) {
        return;
    }

    setTableHeader("Time", "Velocity", "Position (x, y)");

    tableBody.innerHTML = "";

    const steps = 5;

    const rad =
        angle * Math.PI / 180;

    const vx =
        v0 * Math.cos(rad);

    for (let i = 0; i <= steps; i++) {

        const t =
            (totalTime / steps) * i;

        const vy =
            v0 * Math.sin(rad) -
            g * t;

        const x =
            v0 * Math.cos(rad) * t;

        const y =
            v0 * Math.sin(rad) * t -
            0.5 * g * t * t;

        const speed =
            Math.sqrt(vx * vx + vy * vy);

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${t.toFixed(2)} s</td>
            <td>${speed.toFixed(2)} m/s</td>
            <td>(${x.toFixed(2)}, ${y.toFixed(2)}) m</td>
        `;

        tableBody.appendChild(row);
    }
}


// ======================================================
// GERAK PARABOLA - GRAPH
// ======================================================

function generateParabolaGraph(v0, angle, g, totalTime) {

    const graphContainer =
        document.getElementById("graphContainer");

    if (!graphContainer) {
        return;
    }

    const width = 650;
    const height = 300;
    const padding = 50;

    graphContainer.innerHTML = "";

    const canvas =
        document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    graphContainer.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");

    const points = [];

    const steps = 40;

    const rad =
        angle * Math.PI / 180;

    for (let i = 0; i <= steps; i++) {

        const t =
            (totalTime / steps) * i;

        const x =
            v0 * Math.cos(rad) * t;

        const y =
            v0 * Math.sin(rad) * t -
            0.5 * g * t * t;

        points.push({
            x: x,
            y: y
        });
    }

    drawParabolaGraph(
        ctx,
        width,
        height,
        padding,
        points
    );
}


// ======================================================
// KINEMALAB POSITION-TIME GRAPH
// ======================================================

function drawPositionTimeGraph(
    ctx,
    width,
    height,
    padding,
    points,
    title
) {

    ctx.clearRect(0, 0, width, height);

    if (points.length === 0) {
        return;
    }

    const graphWidth =
        width - padding * 2;

    const graphHeight =
        height - padding * 2;

    const maxTime =
        Math.max(points[points.length - 1].t, 1);

    let minPosition = points[0].s;
    let maxPosition = points[0].s;

    points.forEach(point => {

        minPosition = Math.min(
            minPosition,
            point.s
        );

        maxPosition = Math.max(
            maxPosition,
            point.s
        );

    });


    // ------------------------------------------
    // RANGE POSITION
    // ------------------------------------------

    if (maxPosition === minPosition) {

        maxPosition += 1;
        minPosition -= 1;

    }

    const positionRange =
        maxPosition - minPosition;


    // ------------------------------------------
    // GRAPH BACKGROUND
    // ------------------------------------------

    ctx.fillStyle = "#071d3d";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // ------------------------------------------
    // TITLE
    // ------------------------------------------

    ctx.font = "bold 15px Arial";

    ctx.textAlign = "left";

    ctx.fillStyle = "#ffffff";

    ctx.fillText(
        title,
        padding,
        25
    );


    // ------------------------------------------
    // GRID
    // ------------------------------------------

    const yTicks = 5;
    const xTicks = 5;

    ctx.lineWidth = 1;

    // GRID HORIZONTAL

    for (let i = 0; i <= yTicks; i++) {

        const y =
            height -
            padding -
            (i / yTicks) *
                graphHeight;

        ctx.beginPath();

        ctx.moveTo(
            padding,
            y
        );

        ctx.lineTo(
            width - padding,
            y
        );

        ctx.strokeStyle = "#173968";

        ctx.stroke();

    }


    // GRID VERTIKAL

    for (let i = 0; i <= xTicks; i++) {

        const x =
            padding +
            (i / xTicks) *
                graphWidth;

        ctx.beginPath();

        ctx.moveTo(
            x,
            padding
        );

        ctx.lineTo(
            x,
            height - padding
        );

        ctx.strokeStyle = "#173968";

        ctx.stroke();

    }


    // ------------------------------------------
    // AXES
    // ------------------------------------------

    ctx.beginPath();

    // Sumbu X

    ctx.moveTo(
        padding,
        height - padding
    );

    ctx.lineTo(
        width - padding,
        height - padding
    );

    // Sumbu Y

    ctx.moveTo(
        padding,
        padding
    );

    ctx.lineTo(
        padding,
        height - padding
    );

    ctx.strokeStyle = "#79cfff";

    ctx.lineWidth = 1.5;

    ctx.stroke();


    // ------------------------------------------
    // ANGKA SUMBU Y
    // ------------------------------------------

    ctx.font = "11px Arial";

    ctx.textAlign = "right";

    for (let i = 0; i <= yTicks; i++) {

        const value =
            minPosition +
            (positionRange / yTicks) * i;

        const y =
            height -
            padding -
            (i / yTicks) *
                graphHeight;

        ctx.fillStyle = "#9fdcff";

        ctx.fillText(
            value.toFixed(2),
            padding - 8,
            y + 4
        );

    }


    // ------------------------------------------
    // ANGKA SUMBU X
    // ------------------------------------------

    ctx.textAlign = "center";

    for (let i = 0; i <= xTicks; i++) {

        const value =
            (maxTime / xTicks) * i;

        const x =
            padding +
            (i / xTicks) *
                graphWidth;

        ctx.fillStyle = "#9fdcff";

        ctx.fillText(
            value.toFixed(2),
            x,
            height - padding + 18
        );

    }


    // ------------------------------------------
    // LABEL SUMBU
    // ------------------------------------------

    ctx.font = "bold 13px Arial";

    ctx.fillStyle = "#c9ecff";

    ctx.textAlign = "center";

    // X

    ctx.fillText(
        "Time (s)",
        width / 2,
        height - 8
    );


    // Y

    ctx.save();

    ctx.translate(
        15,
        height / 2
    );

    ctx.rotate(
        -Math.PI / 2
    );

    ctx.fillText(
        "Position (m)",
        0,
        0
    );

    ctx.restore();


    // ------------------------------------------
    // GRAPH LINE
    // ------------------------------------------

    ctx.beginPath();

    points.forEach((point, index) => {

        const x =
            padding +
            (point.t / maxTime) *
                graphWidth;

        const y =
            height -
            padding -
            ((point.s - minPosition) /
                positionRange) *
                graphHeight;

        if (index === 0) {

            ctx.moveTo(
                x,
                y
            );

        } else {

            ctx.lineTo(
                x,
                y
            );

        }

    });


    // Glow

    ctx.shadowColor = "#00d9ff";
    ctx.shadowBlur = 10;

    ctx.strokeStyle = "#00d9ff";

    ctx.lineWidth = 3;

    ctx.stroke();

    // Reset shadow

    ctx.shadowBlur = 0;


    // ------------------------------------------
    // GRAPH POINTS
    // ------------------------------------------

    points.forEach(point => {

        const x =
            padding +
            (point.t / maxTime) *
                graphWidth;

        const y =
            height -
            padding -
            ((point.s - minPosition) /
                positionRange) *
                graphHeight;


        // Outer glow

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#00d9ff";

        ctx.shadowColor = "#00d9ff";
        ctx.shadowBlur = 8;

        ctx.fill();


        // Inner point

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            2.5,
            0,
            Math.PI * 2
        );

        ctx.shadowBlur = 0;

        ctx.fillStyle = "#ffffff";

        ctx.fill();

    });


    // ------------------------------------------
    // RESET CANVAS STATE
    // ------------------------------------------

    ctx.shadowBlur = 0;

    ctx.lineWidth = 1;

}


// ======================================================
// PARABOLA GRAPH
// ======================================================

function drawParabolaGraph(
    ctx,
    width,
    height,
    padding,
    points
) {

    if (points.length === 0) {
        return;
    }

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    const graphWidth =
        width - padding * 2;

    const graphHeight =
        height - padding * 2;

    let minX = points[0].x;
    let maxX = points[0].x;

    let minY = points[0].y;
    let maxY = points[0].y;

    points.forEach(point => {

        minX = Math.min(
            minX,
            point.x
        );

        maxX = Math.max(
            maxX,
            point.x
        );

        minY = Math.min(
            minY,
            point.y
        );

        maxY = Math.max(
            maxY,
            point.y
        );

    });

    // ------------------------------------------
    // RANGE
    // ------------------------------------------

    if (maxX === minX) {
        maxX += 1;
    }

    if (maxY === minY) {
        maxY += 1;
    }

    const rangeX =
        maxX - minX;

    const rangeY =
        maxY - minY;

    // ------------------------------------------
    // BACKGROUND
    // ------------------------------------------

    ctx.fillStyle = "#071d3d";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );

    // ------------------------------------------
    // TITLE
    // ------------------------------------------

    ctx.font = "bold 15px Arial";

    ctx.textAlign = "left";

    ctx.fillStyle = "#ffffff";

    ctx.fillText(
        "Grafik Gerak Parabola - Lintasan",
        padding,
        25
    );

    // ------------------------------------------
    // GRID
    // ------------------------------------------

    const yTicks = 5;
    const xTicks = 5;

    ctx.lineWidth = 1;

    // ------------------------------------------
    // GRID HORIZONTAL + LABEL Y
    // ------------------------------------------

    ctx.font = "11px Arial";

    ctx.textAlign = "right";

    for (let i = 0; i <= yTicks; i++) {

        const value =
            minY +
            (rangeY / yTicks) * i;

        const y =
            height -
            padding -
            (i / yTicks) * graphHeight;

        // Grid
        ctx.beginPath();

        ctx.moveTo(
            padding,
            y
        );

        ctx.lineTo(
            width - padding,
            y
        );

        ctx.strokeStyle = "#173968";

        ctx.stroke();

        // Label Y
        ctx.fillStyle = "#9fdcff";

        ctx.fillText(
            value.toFixed(2),
            padding - 8,
            y + 4
        );
    }

    // ------------------------------------------
    // GRID VERTIKAL + LABEL X
    // ------------------------------------------

    ctx.textAlign = "center";

    for (let i = 0; i <= xTicks; i++) {

        const value =
            minX +
            (rangeX / xTicks) * i;

        const x =
            padding +
            (i / xTicks) * graphWidth;

        // Grid
        ctx.beginPath();

        ctx.moveTo(
            x,
            padding
        );

        ctx.lineTo(
            x,
            height - padding
        );

        ctx.strokeStyle = "#173968";

        ctx.stroke();

        // Label X
        ctx.fillStyle = "#9fdcff";

        ctx.fillText(
            value.toFixed(2),
            x,
            height - padding + 18
        );
    }

    // ------------------------------------------
    // AXES
    // ------------------------------------------

    ctx.beginPath();

    ctx.moveTo(
        padding,
        height - padding
    );

    ctx.lineTo(
        width - padding,
        height - padding
    );

    ctx.moveTo(
        padding,
        padding
    );

    ctx.lineTo(
        padding,
        height - padding
    );

    ctx.strokeStyle = "#79cfff";

    ctx.lineWidth = 1.5;

    ctx.stroke();

    // ------------------------------------------
    // AXIS LABELS
    // ------------------------------------------

    ctx.font = "bold 13px Arial";

    ctx.fillStyle = "#c9ecff";

    ctx.textAlign = "center";

    // X Axis
    ctx.fillText(
        "X (m)",
        width / 2,
        height - 8
    );

    // Y Axis
    ctx.save();

    ctx.translate(
        15,
        height / 2
    );

    ctx.rotate(
        -Math.PI / 2
    );

    ctx.fillText(
        "Y (m)",
        0,
        0
    );

    ctx.restore();

    // ------------------------------------------
    // GRAPH PARABOLA
    // ------------------------------------------

    ctx.beginPath();

    points.forEach((point, index) => {

        const x =
            padding +
            ((point.x - minX) /
                rangeX) *
                graphWidth;

        const y =
            height -
            padding -
            ((point.y - minY) /
                rangeY) *
                graphHeight;

        if (index === 0) {

            ctx.moveTo(
                x,
                y
            );

        } else {

            ctx.lineTo(
                x,
                y
            );

        }

    });

    // Glow
    ctx.shadowColor = "#00d9ff";

    ctx.shadowBlur = 10;

    ctx.strokeStyle = "#00d9ff";

    ctx.lineWidth = 3;

    ctx.stroke();

    ctx.shadowBlur = 0;

    // ------------------------------------------
    // POINTS
    // ------------------------------------------

    points.forEach(point => {

        const x =
            padding +
            ((point.x - minX) /
                rangeX) *
                graphWidth;

        const y =
            height -
            padding -
            ((point.y - minY) /
                rangeY) *
                graphHeight;

        // Outer cyan point
        ctx.beginPath();

        ctx.arc(
            x,
            y,
            5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#00d9ff";

        ctx.shadowColor = "#00d9ff";

        ctx.shadowBlur = 8;

        ctx.fill();

        // Inner white point
        ctx.beginPath();

        ctx.arc(
            x,
            y,
            2.5,
            0,
            Math.PI * 2
        );

        ctx.shadowBlur = 0;

        ctx.fillStyle = "#ffffff";

        ctx.fill();

    });

    ctx.shadowBlur = 0;

    ctx.lineWidth = 1;
}


// ======================================================
// RESET CALCULATOR
// ======================================================

function resetCalculator() {

    const resultElement =
        document.getElementById("result");

    if (resultElement) {
        resultElement.innerHTML =
            "Hasil perhitungan akan muncul di sini.";
    }

    resetTableAndGraph();

    selectTopic(currentTopic);
}


// ======================================================
// INITIALIZATION
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    selectTopic("glb");

});