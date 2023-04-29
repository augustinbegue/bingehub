import { h as hashPassword } from './index4-fdf292d6.js';
import { p as prisma } from './prisma-68db7c66.js';
import { e as error, j as json } from './index-1dce6fb5.js';
import 'bcrypt';
import '@prisma/client';

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

export { POST };
//# sourceMappingURL=_server.ts-7c077aab.js.map
