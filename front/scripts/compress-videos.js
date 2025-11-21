const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

const inputDir = path.join(__dirname, '../public/assets/videos');

const videoFiles = fs.readdirSync(inputDir).filter(file =>
  path.extname(file).toLowerCase() === '.mp4' &&
  !file.includes('_temp') &&
  !fs.existsSync(path.join(inputDir, path.parse(file).name + '.webm'))
);

console.log(`Found ${videoFiles.length} video files to compress.`);

let processed = 0;

videoFiles.forEach(file => {
  const inputPath = path.join(inputDir, file);
  const baseName = path.parse(file).name;
  const outputWebM = path.join(inputDir, baseName + '.webm');
  const outputMP4 = path.join(inputDir, baseName + '_temp.mp4');

  console.log(`Compressing ${file} to WebM...`);

  // Compress to WebM with VP9 for better efficiency
  ffmpeg(inputPath)
    .videoCodec('libvpx-vp9')
    .audioCodec('libopus')
    .outputOptions([
      '-crf 30',  // Higher CRF for more compression
      '-b:v 0',   // Variable bitrate
      '-vf scale=-2:480',  // Lower resolution for better performance
      '-deadline best',  // Best quality
      '-cpu-used 4'  // Balance speed/quality
    ])
    .output(outputWebM)
    .on('end', () => {
      console.log(`Compressed to WebM: ${file}`);
      // Also create MP4 fallback
      ffmpeg(inputPath)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          '-crf 28',
          '-preset fast',
          '-vf scale=-2:480'
        ])
        .output(outputMP4)
        .on('end', () => {
          console.log(`Compressed to MP4: ${file}`);
          // Remove original if not needed
          if (path.extname(file).toLowerCase() !== '.mp4') {
            fs.unlinkSync(inputPath);
          }
          processed++;
          if (processed === videoFiles.length) {
            console.log('All videos optimized.');
          }
        })
        .on('error', err => {
          console.error(`Error compressing MP4 ${file}:`, err);
          processed++;
        })
        .run();
    })
    .on('error', err => {
      console.error(`Error compressing WebM ${file}:`, err);
      processed++;
    })
    .run();
});