function guard(name) {
  return () => {
    throw new Error(`Cannot call ${name}(...) on the server`);
  };
}
const goto = guard("goto");

export { goto as g };
//# sourceMappingURL=navigation-483aa8de.js.map
