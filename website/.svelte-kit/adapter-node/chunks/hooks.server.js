import { p as prisma } from "./prisma.js";
const handle = async ({ event, resolve }) => {
  const { cookies, locals } = event;
  const sessiondId = cookies.get("session");
  if (sessiondId) {
    const session = await prisma.session.findUnique({
      where: {
        uid: sessiondId
      },
      include: {
        user: {
          select: {
            uid: true,
            username: true,
            isActive: true,
            isDeleted: true,
            roles: true
          }
        }
      }
    });
    locals.user = session?.user;
  }
  return resolve(event);
};
export {
  handle
};
