/**
 * Get the copy of object without attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrsToExclude
 * @returns {Object}
 */
export function withoutAttrs(obj, attrsToExclude) {
  const result = {};

  Object.keys(obj).forEach((key) => {
    if (!attrsToExclude.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}

/**
 * Get the copy of object with only specified attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrs
 * @returns {Object}
 */
export function withAttrs(obj, attrs) {
  const result = {};

  Object.keys(obj).forEach((key) => {
    if (attrs.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}

/**
 * Filter pagination object keys.
 *
 * @param {Object} param
 * @param {Array} param.docs
 * @param {Number} param.totalDocs
 * @param {Number} param.limit
 * @param {Number} param.size
 */
export function filterPaginationLabels({ docs, totalDocs, limit, page }) {
  return { data: docs, meta: { total: totalDocs, size: limit, page } };
}
