import config from 'config';
/**
 * Checks the node environment if it is 'dev' or not.
 *
 * @returns {Boolean}
 */
export function isDev() {
  if (config.node_env === 'dev') {
    return true;
  }

  return false;
}
