import { p as prisma } from './prisma-68db7c66.js';
import { e as error, j as json } from './index-1dce6fb5.js';
import { c as comparePassword } from './index4-fdf292d6.js';
import '@prisma/client';
import 'bcrypt';

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

export { POST };
//# sourceMappingURL=_server.ts-f24bc838.js.map
