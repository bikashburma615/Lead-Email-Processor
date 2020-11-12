/**
 * Returns full name of user.
 *
 * @param {Object} user
 *
 * @returns {String}
 */
export const getFullName = (user) =>
  `${user.firstName || ''} ${user.middleName || ''} ${user.lastName || ''}`;

/**
 * Extract file extension name.
 *
 * @param {String} fileName
 */
export function getExtension(fileName) {
  const extension = fileName.split('.').pop();

  return extension === fileName ? '' : extension;
}

/**
 * Getting the fileName only without extension.
 *
 * @param {String} fileName
 */
export function getFileName(fileName) {
  const extStartIndex = fileName.lastIndexOf('.');

  return fileName.substr(0, extStartIndex);
}

/**
 * Adds timestamp to the original file name.
 *
 * @example
 * addTimestampToFilename('file.ext')
 * => 'file-123456789.ext'
 *
 * @param {String} fileName
 */
export function addTimestampToFilename(fileName) {
  const timeStamp = new Date().getTime();
  const file = getFileName(fileName);
  const ext = getExtension(fileName);

  return `${file}-${timeStamp}.${ext}`;
}
