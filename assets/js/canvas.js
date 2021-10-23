//const canvas = function() {
    var ctx;
    var time = 0;
    var series = [];
    var record = [];

    function start() {
        const canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#FFF";
        // window.requestAnimationFrame(update);
        setInterval(update, 25);

        const temp = [];
        for (var i = 0; i < 25; i++) {
            temp.push(i * 10);
        }

        series = fourier.distTransform(temp);
    }

    function update() {
        draw();
        // window.requestAnimationFrame(update);
    }

    function draw() {
        if (series.length === 0) return;

        const midX = canvas.width / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let [sX, sY] = [canvas.width / 2, canvas.height / 2];
        ctx.beginPath();
        for (var i = 0; i < series.length; i++) {
            const [mod, arg] = series[i];
            const [oldX, oldY] = [sX, sY];
            
            sX += mod * Math.cos(i * time + arg + Math.PI * 0.5);
            sY += mod * Math.sin(i * time + arg + Math.PI * 0.5);

            ctx.moveTo(oldX, oldY);
            ctx.lineTo(sX, sY);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(sX, sY);
        for (var i = 0; i < record.length; i++) {         
            ctx.lineTo(midX + i * 10, record[i]);
        }
        ctx.stroke();

        record.unshift(sY);
        if (record.length > 300) record.pop();

        // offset by period
        time += Math.PI * 2 / series.length;
    }

    window.onload = start;
//}();
