//const canvas = function() {
    var ctx;
    var time = 0;
    var series = [];

    function start() {
        const canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx = canvas.getContext("2d");
        window.requestAnimationFrame(update);

        series = fourier.distTransform([50, 50, 50, -50, -50, -50, 50, 50, 50, -50, -50, -50]);
    }

    function update() {
        draw();
        window.requestAnimationFrame(update);
    }

    function draw() {
        if (series.length === 0) return;

        for (var i = 0; i < series.length; i++) {
            const [mod, arg] = series[i];
            
            
        }

        // offset by period
        time += Math.PI * 2 / series.length;
    }

    window.onload = start;
//}();
