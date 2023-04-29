import { i as isLogged, h as hasRole } from "../../../../../chunks/utils.js";
import { e as error, j as json } from "../../../../../chunks/index.js";
import { p as prisma } from "../../../../../chunks/prisma.js";
const POST = async ({ request, locals }) => {
  const { title, content, type, subType, mediaType, mediaUrl } = await request.json();
  if (!isLogged(locals.user) || !hasRole("admin", locals.user)) {
    throw error(401, "Unauthorized");
  }
  if (!title || !content || !type || !subType || !mediaType || !mediaUrl) {
    throw error(400, "Missing required fields");
  }
  const { uid } = await prisma.post.create({
    data: {
      title,
      content,
      type,
      subType,
      authorId: locals.user.uid,
      media: {
        create: {
          type: mediaType,
          url: mediaUrl
        }
      }
    }
  });
  return json({
    success: true,
    uid
  });
};
export {
  POST
};
