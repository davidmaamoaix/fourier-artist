const fourier = {
    distTransform: (signals) => Array(signals.length).fill(0).map((e, k) => {
        let [re, im] = [0, 0];
        for (var n = 0; n < signals.length; n++) {
            const inner = 2 * Math.PI * k * n / signals.length;

            re += signals[n] * Math.cos(inner);
            im -= signals[n] * Math.sin(inner);
        }

        re /= signals.length;
        im /= signals.length;

        return [
            k,
            Math.sqrt(re * re + im * im),
            Math.atan2(im, re)
        ];
    })
};
