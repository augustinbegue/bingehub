import { e as error, j as json } from './index-1dce6fb5.js';
import { p as prisma } from './prisma-68db7c66.js';
import '@prisma/client';

const POST = async ({ locals, request }) => {
  const { name } = await request.json();
  if (!name) {
    throw error(400, "Missing name");
  }
  await prisma.role.create({
    data: {
      name
    }
  });
  return json({
    success: true
  });
};

export { POST };
//# sourceMappingURL=_server.ts-458cf15c.js.map
