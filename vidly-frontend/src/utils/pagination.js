import _ from "lodash";

export function pagination(item, pagenumber, pagesize) {
  let startindex = (pagenumber - 1) * pagesize;
  return _(item).slice(startindex).take(pagesize).value();
}
