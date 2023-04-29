import { g as get_store_value } from './index3-84056cf6.js';
import { c as currentUser } from './index5-493b4a72.js';

function hasRole(role, user = get_store_value(currentUser)) {
  console.log("hasRole", role, user);
  return !!user?.roles?.find((r) => r.name === role);
}
function isLogged(user = get_store_value(currentUser)) {
  return !!user;
}

export { hasRole as h, isLogged as i };
//# sourceMappingURL=utils-cbdd992a.js.map
