const canvasInit = function() {
    var ctx;
    var time = 0;
    var series = [];
    var record = [];

    function start() {
        const canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx = canvas.getContext("2d");
        setInterval(update, 25);

        const temp = [];
        for (var i = 0; i < 200; i += 2) {
            temp.push(i < 100 ? 300 : -300);
        }

        series = fourier.distTransform(temp);
        series.sort((a, b) => b[1] - a[1]);
    }

    function update() {
        if (series.length === 0) return;

        const [midX, midY] = [canvas.width / 2, canvas.height / 2];
        const circles = [];
        let [sX, sY] = [canvas.width / 2, canvas.height / 2];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#FFF";
        ctx.beginPath();
        for (var i = 0; i < series.length; i++) {
            const [freq, mod, arg] = series[i];
            const [oldX, oldY] = [sX, sY];

            circles.push([oldX, oldY, mod]);
            
            sX += mod * Math.cos(freq * time + arg + Math.PI * 0.5);
            sY += mod * Math.sin(freq * time + arg + Math.PI * 0.5);

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
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sX, sY);
        for (var i = 0; i < record.length; i++) {
            ctx.lineTo(midX + i * 2.5, record[i] + midY);
        }
        ctx.stroke();

        record.unshift(sY - midY);
        if (record.length > 300) record.pop();

        // offset by period
        time += Math.PI * 2 / series.length * 1;
    }

    window.onload = start;
    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
}();
