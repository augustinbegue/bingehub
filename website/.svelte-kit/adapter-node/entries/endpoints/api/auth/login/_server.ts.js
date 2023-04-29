import { p as prisma } from "../../../../../chunks/prisma.js";
import { e as error, j as json } from "../../../../../chunks/index.js";
import { c as comparePassword } from "../../../../../chunks/index4.js";
const POST = async ({ locals, request }) => {
  const { username, password } = await request.json();
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      roles: true
    }
  });
  if (!user) {
    throw error(401, "Invalid username or password");
  }
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    throw error(401, "Invalid username or password");
  }
  await prisma.session.deleteMany({
    where: {
      userId: user.uid
    }
  });
  const session = await prisma.session.create({
    data: {
      userId: user.uid
    }
  });
  locals.user = {
    isActive: user.isActive,
    roles: user.roles,
    uid: user.uid,
    username: user.username,
    isDeleted: user.isDeleted
  };
  return json(
    {
      user: locals.user
    },
    {
      headers: {
        "Set-Cookie": `session=${session.uid}; HttpOnly; Path=/; SameSite=Lax;`
      }
    }
  );
};
export {
  POST
};
