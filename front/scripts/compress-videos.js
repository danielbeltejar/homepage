const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

const inputDir = path.join(__dirname, '../public/assets/videos');

const videoFiles = fs.readdirSync(inputDir).filter(file =>
  ['.mp4', '.mov', '.avi', '.mkv', '.webm'].includes(path.extname(file).toLowerCase()) &&
  !file.includes('_compressed')
);

console.log(`Found ${videoFiles.length} video files to compress.`);

let processed = 0;

videoFiles.forEach(file => {
  const inputPath = path.join(inputDir, file);
  const baseName = path.parse(file).name;
  const isMp4 = path.extname(file).toLowerCase() === '.mp4';
  const outputPath = isMp4 ? path.join(inputDir, baseName + '_temp.mp4') : path.join(inputDir, baseName + '.mp4');

  console.log(`Compressing ${file}...`);

  ffmpeg(inputPath)
    .videoCodec('libx264')
    .audioCodec('aac')
    .outputOptions([
      '-crf 25',
      '-preset slow',
      '-vf scale=-2:720'
    ])
    .output(outputPath)
    .on('end', () => {
      console.log(`Compressed: ${file}`);
      if (isMp4) {
        fs.renameSync(outputPath, inputPath);
      } else {
        fs.unlinkSync(inputPath);
      }
      processed++;
      if (processed === videoFiles.length) {
        console.log('All videos optimized.');
      }
    })
    .on('error', err => {
      console.error(`Error compressing ${file}:`, err);
      // Clean up temp if exists
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      processed++;
    })
    .run();
});