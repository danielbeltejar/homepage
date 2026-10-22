const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

const videoDir = path.join(__dirname, '../public/assets/videos');
const imageDir = path.join(__dirname, '../public/assets/images');
const force = process.env.FORCE_MEDIA_OPTIMIZATION === '1';

const videoFiles = fs.readdirSync(videoDir)
  .filter((file) => path.extname(file).toLowerCase() === '.mp4')
  .filter((file) => !file.endsWith('_temp.mp4'))
  .sort();

fs.mkdirSync(imageDir, { recursive: true });

function runFfmpeg(command, outputPath) {
  return new Promise((resolve, reject) => {
    command
      .output(outputPath)
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
}

async function optimizeVideo(file) {
  const inputPath = path.join(videoDir, file);
  const baseName = path.parse(file).name;
  const webmPath = path.join(videoDir, `${baseName}.webm`);

  if (force || !fs.existsSync(webmPath)) {
    const tempPath = `${webmPath}.tmp-${process.pid}.webm`;
    try {
      await runFfmpeg(
        ffmpeg(inputPath)
          .videoCodec('libvpx-vp9')
          .audioCodec('libopus')
          .outputOptions([
            '-map 0:v:0',
            '-map 0:a?',
            '-crf 31',
            '-b:v 0',
            '-vf scale=-2:480',
            '-row-mt 1',
            '-deadline good',
            '-cpu-used 4',
          ]),
        tempPath,
      );
      fs.renameSync(tempPath, webmPath);
      console.log(`Optimized video: ${file} -> ${path.basename(webmPath)}`);
    } finally {
      fs.rmSync(tempPath, { force: true });
    }
  }

  const posterPath = path.join(imageDir, `${baseName}.jpg`);
  if (baseName !== 'background' && !fs.existsSync(posterPath)) {
    const tempPath = `${posterPath}.tmp-${process.pid}.jpg`;
    try {
      await runFfmpeg(
        ffmpeg(inputPath)
          .seekInput(0.5)
          .frames(1)
          .outputOptions(['-q:v 2']),
        tempPath,
      );
      fs.renameSync(tempPath, posterPath);
      console.log(`Generated poster: ${path.basename(posterPath)}`);
    } finally {
      fs.rmSync(tempPath, { force: true });
    }
  }
}

async function main() {
  for (const file of videoFiles) {
    await optimizeVideo(file);
  }

  console.log(`Checked ${videoFiles.length} video${videoFiles.length === 1 ? '' : 's'}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
