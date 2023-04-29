import { p as prisma } from "../../../../../chunks/prisma.js";
import { j as json } from "../../../../../chunks/index.js";
const POST = async ({ locals, request }) => {
  if (locals.user) {
    await prisma.session.deleteMany({
      where: {
        userId: locals.user.uid
      }
    });
    locals.user = void 0;
  }
  return json({
    success: true
  });
};
export {
  POST
};
