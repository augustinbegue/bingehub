import { h as get_store_value } from "./index3.js";
import { c as currentUser } from "./index5.js";
function hasRole(role, user = get_store_value(currentUser)) {
  return !!user?.roles?.find((r) => r.name === role);
}
function isLogged(user = get_store_value(currentUser)) {
  return !!user;
}
export {
  hasRole as h,
  isLogged as i
};
