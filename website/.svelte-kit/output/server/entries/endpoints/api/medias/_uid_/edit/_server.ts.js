import { p as prisma } from "../../../../../../chunks/prisma.js";
import { e as error, j as json } from "../../../../../../chunks/index.js";
const POST = async ({ params, request }) => {
  const { uid } = params;
  const { title, content, type, subType, mediaType, mediaUrl, isActive } = await request.json();
  if (!uid) {
    throw error(400, "Missing uid");
  }
  const res = await prisma.post.update({
    where: { uid },
    data: {
      title,
      content,
      type,
      subType,
      isActive,
      media: {
        update: {
          type: mediaType,
          url: mediaUrl
        }
      }
    }
  });
  return json({
    success: true,
    updated: res
  });
};
export {
  POST
};
