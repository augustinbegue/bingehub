import { e as error, j as json } from "../../../../../chunks/index.js";
import { p as prisma } from "../../../../../chunks/prisma.js";
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
export {
  PATCH
};
