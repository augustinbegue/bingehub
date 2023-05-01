import { e as error } from "../../../../../../chunks/index.js";
import { p as prisma } from "../../../../../../chunks/prisma.js";
import { createReadStream } from "node:fs";
const GET = async ({ request, params }) => {
  const { uid } = params;
  const media = await prisma.post.findUnique({
    where: {
      uid
    },
    include: {
      media: true
    }
  });
  if (!media) {
    throw error(404, "Media not found");
  }
  const manifestPath = media.media?.url;
  if (!manifestPath) {
    throw error(404, "Media not found");
  }
  const readStream = createReadStream(manifestPath);
  return new Response(readStream, {
    headers: {
      "Content-Type": "application/dash+xml"
    }
  });
};
export {
  GET
};
