import { i as isLogged, h as hasRole } from "../../../../../chunks/utils.js";
import { e as error, j as json } from "../../../../../chunks/index.js";
import { p as prisma } from "../../../../../chunks/prisma.js";
const POST = async ({ locals, request }) => {
  if (!isLogged(locals.user) || !hasRole("admin", locals.user)) {
    throw error(401, "Unauthorized");
  }
  const { type, data, mediaUid } = await request.json();
  if (!type || !data || !mediaUid) {
    throw error(400, "Missing required fields");
  }
  const job = await prisma.job.create({
    data: {
      type,
      data,
      media: {
        connect: {
          uid: mediaUid
        }
      },
      user: {
        connect: {
          uid: locals.user.uid
        }
      },
      progress: 0
    }
  });
  return json({ job });
};
export {
  POST
};
