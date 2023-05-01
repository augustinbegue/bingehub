import { i as isLogged, h as hasRole } from "../../../../../chunks/utils.js";
import "../../../../../chunks/prisma.js";
import { MediaType } from "@prisma/client";
import { e as error, j as json } from "../../../../../chunks/index.js";
import { readdir } from "fs/promises";
const POST = async ({ request, locals }) => {
  const { paths, mediaType, title } = await request.json();
  if (!isLogged(locals.user) || !hasRole("admin", locals.user)) {
    throw error(401, "Unauthorized");
  }
  if (!paths || !mediaType || !title) {
    throw error(400, "Missing required fields");
  }
  if (mediaType === MediaType.VIDEO_HARDLINKED) {
    const basePath = paths[0]?.replace(/\\/g, "/");
    if (!basePath) {
      throw error(400, "Missing required fields");
    }
    try {
      const res = await readdir(basePath);
      const medias = res.filter(
        (path) => path.endsWith(".mkv") || path.endsWith(".mp4") || path.endsWith(".avi") || path.endsWith(".webm") || path.endsWith(".mov")
      ).map((path) => {
        return {
          basePath,
          path,
          title: `${title} - ${path.match(/S\d{2}E\d{2}/)?.[0]}`
        };
      });
      return json({
        success: true,
        medias
      });
    } catch (e) {
      throw error(400, "Invalid path");
    }
  } else if (mediaType === MediaType.VIDEO_UPLOADED) {
    throw error(501, "Not implemented");
  }
  throw error(400, "Invalid media type");
};
export {
  POST
};
