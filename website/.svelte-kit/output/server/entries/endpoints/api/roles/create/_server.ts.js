import { e as error, j as json } from "../../../../../chunks/index.js";
import { p as prisma } from "../../../../../chunks/prisma.js";
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
export {
  POST
};
