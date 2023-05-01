import { i as isLogged, h as hasRole } from "../../../../../../chunks/utils.js";
import { p as prisma } from "../../../../../../chunks/prisma.js";
import { e as error, j as json } from "../../../../../../chunks/index.js";
const POST = async ({ request, locals, params }) => {
  if (!isLogged(locals.user) || !hasRole("admin", locals.user)) {
    throw error(401, "Unauthorized");
  }
  const { uid } = params;
  await prisma.post.update({
    where: { uid },
    data: {
      isDeleted: true,
      isActive: false,
      media: {
        update: {
          isDeleted: true,
          isActive: false
        }
      }
    }
  });
  return json({
    success: true
  });
};
export {
  POST
};
