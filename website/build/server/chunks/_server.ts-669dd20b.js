import { i as isLogged, h as hasRole } from './utils-cbdd992a.js';
import { e as error, j as json } from './index-1dce6fb5.js';
import { p as prisma } from './prisma-68db7c66.js';
import './index3-84056cf6.js';
import './index5-493b4a72.js';
import './index2-ea984e2e.js';
import '@prisma/client';

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

export { POST };
//# sourceMappingURL=_server.ts-669dd20b.js.map
