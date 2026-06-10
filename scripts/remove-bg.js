import { Jimp } from 'jimp';
import path from 'path';

async function run() {
  const srcPath = 'C:\\Users\\saumy\\.gemini\\antigravity-ide\\brain\\62bb8fd9-eb73-4b4f-9a9d-2ef0af893c29\\media__1780941320586.png';
  const destPath = 'c:\\Users\\saumy\\My-Portfolio-Site\\artifacts\\portfolio\\public\\calmcash_mockup_nobg.png';

  console.log(`Reading image from: ${srcPath}`);
  const image = await Jimp.read(srcPath);
  
  // Get background color from top-left pixel (0,0)
  const bgTarget = image.getPixelColor(0, 0);
  // In Jimp, getPixelColor returns a 32-bit hex number RGBA
  const targetR = (bgTarget >> 24) & 255;
  const targetG = (bgTarget >> 16) & 255;
  const targetB = (bgTarget >> 8) & 255;
  
  console.log(`Detected background color: RGB(${targetR}, ${targetG}, ${targetB})`);

  let count = 0;
  
  // Scan all pixels
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Euclidean distance in RGB color space
    const dist = Math.sqrt(
      Math.pow(r - targetR, 2) +
      Math.pow(g - targetG, 2) +
      Math.pow(b - targetB, 2)
    );
    
    // Threshold distance. Since the background is very uniform, 
    // a threshold of 28 is safe and removes the dark blue background
    // without affecting the dark grey phone frames or internal black text.
    if (dist < 28) {
      this.bitmap.data[idx + 3] = 0; // Set alpha to 0
      count++;
    }
  });

  console.log(`Made ${count} background pixels transparent.`);
  await image.write(destPath);
  console.log(`Successfully saved transparent image to: ${destPath}`);
}

run().catch(console.error);
