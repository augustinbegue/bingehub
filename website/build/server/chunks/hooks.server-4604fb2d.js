import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

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

export { handle };
//# sourceMappingURL=hooks.server-4604fb2d.js.map
