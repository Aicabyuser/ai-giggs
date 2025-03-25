import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [16, 32, 180, 192, 512];
const inputFile = path.join(process.cwd(), 'public', 'images', 'favicon.svg');
const outputDir = path.join(process.cwd(), 'public', 'images');

async function generateFavicons() {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate PNG versions for each size
    for (const size of sizes) {
      const outputFile = path.join(outputDir, `favicon-${size}x${size}.png`);
      await sharp(inputFile)
        .resize(size, size)
        .png()
        .toFile(outputFile);
      console.log(`Generated ${size}x${size} favicon`);
    }

    // Generate apple-touch-icon.png (180x180)
    await sharp(inputFile)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png');

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons(); 