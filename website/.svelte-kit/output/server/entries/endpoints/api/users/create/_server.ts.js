import { h as hashPassword } from "../../../../../chunks/index4.js";
import { p as prisma } from "../../../../../chunks/prisma.js";
import { e as error, j as json } from "../../../../../chunks/index.js";
const POST = async ({ locals, request }) => {
  const { username, password } = await request.json();
  if (!username || !password) {
    throw error(400, "Missing username or password");
  }
  const user = await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password)
    },
    select: {
      createdAt: true,
      updatedAt: true,
      uid: true,
      username: true
    }
  });
  return json({
    success: true,
    user
  });
};
export {
  POST
};
