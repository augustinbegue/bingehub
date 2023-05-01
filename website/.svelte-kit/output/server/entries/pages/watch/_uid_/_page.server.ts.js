import { i as isLogged } from "../../../../chunks/utils.js";
import { r as redirect } from "../../../../chunks/index.js";
import { p as prisma } from "../../../../chunks/prisma.js";
const ssr = false;
const load = async ({ parent, params, url }) => {
  const { uid } = params;
  const { user } = await parent();
  if (!isLogged(user)) {
    throw redirect(301, `/login?redirect=${url.pathname}`);
  }
  const media = await prisma.post.findUnique({
    where: {
      uid
    },
    include: {
      media: true
    }
  });
  if (!media || !media.media) {
    throw redirect(301, "/");
  }
  return {
    media
  };
};
export {
  load,
  ssr
};
