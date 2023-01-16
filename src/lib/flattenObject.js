import _ from "lodash";

export function flattenObject(o, prefix = "", result = {}, keepNull = true) {
  if (
    _.isString(o) ||
    _.isNumber(o) ||
    _.isBoolean(o) ||
    (keepNull && _.isNull(o))
  ) {
    result[prefix] = o;
    return result;
  }

  if (_.isArray(o) || _.isPlainObject(o)) {
    for (let i in o) {
      let pref = prefix;
      if (_.isArray(o)) {
        pref = pref + `[${i}]`;
      } else {
        if (_.isEmpty(prefix)) {
          pref = i;
        } else {
          pref = prefix + "." + i;
        }
      }
      flattenObject(o[i], pref, result, keepNull);
    }
    return result;
  }
  return result;
}
