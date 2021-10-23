const fourier = {
    distTransform: function(signals, freqSize = 50) {
        // var names from https://en.wikipedia.org/wiki/Discrete_Fourier_transform
        const N = signals.length;
        const freq = [];

        for (var k = 0; k < freqSize; k++) {
            let [re, im] = [0, 0];
            for (var n = 0; n < N; n++) {
                const inner = 2 * Math.PI * k * n / N;

                re += signals[n] * Math.cos(inner);
                im -= signals[n] * Math.sin(inner);
            }

            re /= N;
            im /= N;

            freq.push([Math.sqrt(re * re + im * im), Math.atan2(im, re)]);
        }

        return freq;
    }
};
