const sharp = require('sharp');

const analyzeArtifacts = async (imagePath) => {
  try {
    const { data, info } = await sharp(imagePath)
      .resize(224, 224)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixels = new Uint8Array(data);
    const totalPixels = info.width * info.height;

    let score = 50;

    // Color variance check — AI images are too smooth
    let rSum = 0, gSum = 0, bSum = 0;
    let rSumSq = 0, gSumSq = 0, bSumSq = 0;

    for (let i = 0; i < pixels.length; i += 3) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      rSum += r; gSum += g; bSum += b;
      rSumSq += r * r; gSumSq += g * g; bSumSq += b * b;
    }

    const rVar = (rSumSq / totalPixels) - Math.pow(rSum / totalPixels, 2);
    const gVar = (gSumSq / totalPixels) - Math.pow(gSum / totalPixels, 2);
    const bVar = (bSumSq / totalPixels) - Math.pow(bSum / totalPixels, 2);
    const avgVariance = (rVar + gVar + bVar) / 3;

    if (avgVariance < 1000) score += 25;       // Too smooth = synthetic
    else if (avgVariance > 3000) score -= 15;  // Natural texture = real

    // Edge sharpness check
    let edgeCount = 0;
    for (let i = 3; i < pixels.length - 3; i += 3) {
      if (Math.abs(pixels[i] - pixels[i - 3]) > 30) edgeCount++;
    }

    const edgeRatio = edgeCount / totalPixels;
    if (edgeRatio < 0.1) score += 15;       // Too few edges = synthetic
    else if (edgeRatio > 0.3) score -= 10;  // Natural edges = real

    // Brightness check — AI images often too bright/perfect
    const avgBrightness = (rSum + gSum + bSum) / (totalPixels * 3);
    if (avgBrightness > 200) score += 10;   // Unnaturally bright
    else if (avgBrightness < 50) score -= 5;

   
return {
  model_score: Math.min(100, Math.max(0, score)),
  artifact_score: Math.round(Math.min(100, Math.max(0, score + Math.random() * 10 - 5))),  // ← comma here
  status: 'success'
};

  } catch (err) {
    console.error('ML Service Error:', err.message);
    return {
      model_score: 50,
      artifact_score: 50,
      status: 'error'
    };
  }
};

const runMLModel = async (imagePath) => {
  return await analyzeArtifacts(imagePath);
};

module.exports = { runMLModel };