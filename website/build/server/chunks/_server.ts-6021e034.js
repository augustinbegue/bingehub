import { p as prisma } from './prisma-68db7c66.js';
import { j as json } from './index-1dce6fb5.js';
import '@prisma/client';

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

export { POST };
//# sourceMappingURL=_server.ts-6021e034.js.map
