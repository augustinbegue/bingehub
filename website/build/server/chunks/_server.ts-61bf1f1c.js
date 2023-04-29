import { e as error, j as json } from './index-1dce6fb5.js';
import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

const PATCH = async ({ locals, request }) => {
  const userBody = await request.json();
  if (!userBody.uid) {
    throw error(400, "Missing user UID");
  }
  const updatedUser = await prisma.user.update({
    where: {
      uid: userBody.uid
    },
    data: {
      username: userBody.username,
      isActive: userBody.isActive,
      roles: {
        connect: userBody.roles
      }
    }
  });
  return json({
    success: true,
    user: updatedUser
  });
};

export { PATCH };
//# sourceMappingURL=_server.ts-61bf1f1c.js.map
