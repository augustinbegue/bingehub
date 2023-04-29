import { i as isLogged, h as hasRole } from "../../../chunks/utils.js";
import { r as redirect, e as error } from "../../../chunks/index.js";
const load = async ({ parent, url }) => {
  const parentData = await parent();
  if (!isLogged(parentData.user)) {
    throw redirect(307, "/auth/login?redirect=" + url.pathname);
  }
  if (!hasRole("admin", parentData.user)) {
    throw error(403, "You are not allowed to access this page");
  }
};
export {
  load
};
