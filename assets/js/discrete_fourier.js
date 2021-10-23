const fourier = {
    distTransform: (signals) => Array(signals.length).fill(0).map((e, k) => {
        let [re, im] = [0, 0];
        for (var n = 0; n < signals.length; n++) {
            const inner = 2 * Math.PI * k * n / signals.length;
            const [c, d] = [Math.cos(inner), Math.sin(inner)]

            re += signals[n][0] * c - signals[n][1] * d;
            im += signals[n][0] * d + signals[n][1] * c;
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
