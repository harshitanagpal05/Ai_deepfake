const sharp = require('sharp');

// ─── Pixel Analysis Helpers ────────────────────────────────────────────────

/**
 * Computes per-channel variance for an RGB pixel buffer.
 * Lower variance → smoother image → more likely synthetic.
 */
const computeVariance = (pixels, totalPixels) => {
    let rSum = 0, gSum = 0, bSum = 0;
    let rSumSq = 0, gSumSq = 0, bSumSq = 0;

    for (let i = 0; i < pixels.length; i += 3) {
        const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
        rSum += r; gSum += g; bSum += b;
        rSumSq += r * r; gSumSq += g * g; bSumSq += b * b;
    }

    const rVar = (rSumSq / totalPixels) - Math.pow(rSum / totalPixels, 2);
    const gVar = (gSumSq / totalPixels) - Math.pow(gSum / totalPixels, 2);
    const bVar = (bSumSq / totalPixels) - Math.pow(bSum / totalPixels, 2);

    return { avgVariance: (rVar + gVar + bVar) / 3, rSum, gSum, bSum };
};

/**
 * Computes ratio of sharp edges (abrupt pixel-to-pixel transitions).
 * Very low edge ratio → over-smooth → synthetic signal.
 */
const computeEdgeRatio = (pixels, totalPixels) => {
    let edgeCount = 0;
    for (let i = 3; i < pixels.length - 3; i += 3) {
        if (Math.abs(pixels[i] - pixels[i - 3]) > 30) edgeCount++;
    }
    return edgeCount / totalPixels;
};

// ─── Core ML Analysis ─────────────────────────────────────────────────────

const analyzeArtifacts = async (imagePath) => {
    try {
        const { data, info } = await sharp(imagePath)
            .resize(224, 224)
            .raw()
            .toBuffer({ resolveWithObject: true });

        const pixels = new Uint8Array(data);
        const totalPixels = info.width * info.height;

        let score = 50; // neutral baseline

        // ── Color variance check ──────────────────────────────────────────────
        // AI images tend to be unnaturally smooth (low variance).
        const { avgVariance, rSum, gSum, bSum } = computeVariance(pixels, totalPixels);
        if (avgVariance < 1000) score += 25;       // Too smooth → synthetic
        else if (avgVariance > 3000) score -= 15;  // Natural texture → real

        // ── Edge sharpness check ─────────────────────────────────────────────
        // AI images often lack natural micro-edge detail.
        const edgeRatio = computeEdgeRatio(pixels, totalPixels);
        if (edgeRatio < 0.1) score += 15;       // Too few edges → synthetic
        else if (edgeRatio > 0.3) score -= 10;  // Rich edges → real

        // ── Brightness check ─────────────────────────────────────────────────
        // AI images are often unnaturally bright/perfected.
        const avgBrightness = (rSum + gSum + bSum) / (totalPixels * 3);
        if (avgBrightness > 200) score += 10;    // Unnaturally bright → synthetic
        else if (avgBrightness < 50) score -= 5; // Dark → slight real signal

        // Clamp to [0, 100]
        const clampedScore = Math.min(100, Math.max(0, Math.round(score)));

        return {
            model_score: clampedScore,
            artifact_score: clampedScore, // deterministic — no random noise
            status: 'success'
        };

    } catch (err) {
        console.error('❌ ML Service Error:', err.message);
        return {
            model_score: 50,
            artifact_score: 50,
            status: 'error'
        };
    }
};

// ─── Public API ───────────────────────────────────────────────────────────
const runMLModel = async (imagePath) => analyzeArtifacts(imagePath);

module.exports = { runMLModel };
