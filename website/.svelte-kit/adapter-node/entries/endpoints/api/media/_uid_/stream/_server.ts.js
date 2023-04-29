import * as fs from "fs";
import { e as error } from "../../../../../../chunks/index.js";
import parseRange from "range-parser";
import { p as prisma } from "../../../../../../chunks/prisma.js";
import { path } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { Writable } from "stream";
ffmpeg.setFfmpegPath(path);
const GET = async ({ request, params }) => {
  const rangeHeader = request.headers.get("range");
  const { uid } = params;
  const media = await prisma.post.findUnique({
    where: {
      uid
    },
    include: {
      media: true
    }
  });
  const videoPath = `${media?.media?.url}`;
  console.log("videoPath", videoPath);
  try {
    const stats = await fs.promises.stat(videoPath);
    if (!rangeHeader) {
      const readStream = fs.createReadStream(videoPath);
      const res2 = new Response(readStream, {
        status: 200,
        headers: {
          "Content-Type": "video/mp4"
        }
      });
      return res2;
    }
    const videoSize = stats.size;
    const ranges = parseRange(videoSize, rangeHeader, true);
    if (ranges === -1 || ranges === -2) {
      throw error(400, "Invalid range");
    }
    const range = ranges[0];
    const CHUNK_SIZE = 100 ** 6;
    const start = Number(range.start);
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const stream = fs.createReadStream(videoPath, { start, end });
    const ffmpegStream = new Writable();
    const contentLength = end - start + 1;
    const res = new Response(ffmpegStream, {
      status: 206,
      headers: {
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength.toString(),
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Content-Type": "video/mp4"
      }
    });
    ffmpeg(stream).videoCodec("libx264").audioCodec("aac").format("hls").on("error", (err) => {
      console.log("An error occurred: " + err.message);
    }).on("end", () => {
      console.log("Processing finished !");
    }).on("progress", (progress) => {
      console.log("Processing: " + progress.percent + "% done");
    }).output(res, { end: true });
    return res;
  } catch (err) {
    console.log("err", err);
    throw error(404, "Video not found");
  }
};
export {
  GET
};
