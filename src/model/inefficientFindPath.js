// TODO: this is very inefficient
export default function inefficientFindPath(comp, query, path) {
  if (comp === query) {
    path && path.push(query);
    return true;
  }

  for (let i = 0; i < comp.children.length; i++) {
    var child = comp.children[i];
    if (inefficientFindPath(child, query, path)) {
      path && path.unshift(comp);
      return true;
    }
  }

  return false;
}