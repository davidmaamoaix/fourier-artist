const canvasInit = function() {
    var ctx;
    var time = 0;
    var series = [];
    var record = [];

    var mouseDown = false;
    var mousePos = [0, 0];
    var drawPath = [];
    var showLine = true;

    function start() {
        const canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        canvas.addEventListener("mousedown", e => {
            drawPath = [];
            mouseDown = true;
        });
        canvas.addEventListener("mouseup", e => {
            mouseDown = false;
            series = fourier.distTransform(drawPath);
            series.sort((a, b) => b[1] - a[1]);

            record = [];
            time = 0;
        });
        canvas.addEventListener("mousemove", e => {
            const rect = canvas.getBoundingClientRect();
            mousePos = [
                e.clientX - rect.left - canvas.width / 2,
                e.clientY - rect.top - canvas.height / 2
            ];
        });
        window.addEventListener("keydown", e => {
            if (event.keyCode === 32) {
                showLine = !showLine;
            } else if (event.keyCode === 82) {
                drawPath = [];
                series = [];
                record = [];
                time = 0;
            }
        });

        ctx = canvas.getContext("2d");
        setInterval(update, 25);
        setInterval(input, 10);
    }

    function input() {
        if (mouseDown) {
            drawPath.push(mousePos);
        }
    }

    function drawInput(midX, midY) {
        if (drawPath.length > 0) {
            if (mouseDown) {
                ctx.strokeStyle = "#FFF"
                ctx.lineWidth = 5;
            } else {
                if (!showLine) return;

                ctx.strokeStyle = "#AAA"
                ctx.lineWidth = 2;
            }

            ctx.beginPath();
            ctx.moveTo(drawPath[0][0] + midX, drawPath[0][1] + midY);
            for (var i = 1; i < drawPath.length; i++) {
                ctx.lineTo(drawPath[i][0] + midX, drawPath[i][1] + midY);
            }

            ctx.stroke();
        }
    }

    function update() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const [midX, midY] = [canvas.width / 2, canvas.height / 2];

        drawInput(midX, midY);

        // skip fourier
        if (series.length === 0) return;

        const circles = [];
        let [sX, sY] = [canvas.width / 2, canvas.height / 2];

        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var i = 0; i < series.length; i++) {
            const [freq, mod, arg] = series[i];
            const [oldX, oldY] = [sX, sY];

            circles.push([oldX, oldY, mod]);
            
            sX += mod * Math.cos(freq * time + arg);
            sY += mod * Math.sin(freq * time + arg);

            ctx.moveTo(oldX, oldY);
            ctx.lineTo(sX, sY);
        }
        ctx.stroke();

        ctx.strokeStyle = "#777";
        circles.forEach(i => {
            ctx.beginPath();
            ctx.arc(...i, 0, 2 * Math.PI, false);
            ctx.stroke();
        });

        ctx.strokeStyle = "#FFF"
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sX, sY);
        for (var i = 0; i < record.length; i++) {
            ctx.lineTo(record[i][0] + midX, record[i][1] + midY);
        }
        ctx.stroke();

        record.unshift([sX - midX, sY - midY]);
        if (record.length > Math.max(40, series.length - 20)) record.pop();

        // offset by period
        // negate to match the draw order
        time -= Math.PI * 2 / series.length * 1;
    }

    window.onload = start;
    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
}();
