import logger from 'utils/logger';
import Content from 'models/content';
import {
  v1
} from 'uuid';

const log = logger.withNamespace('services.user');


/**
 * Create a new user.
 *
 * @param {Object} payload
 *
 * @returns {Promise}
 */
export async function create(payload) {
  try {
    log.info(`Creating new content.`);
    payload.id = v1();
    console.log("payload content ", payload)
    const result = await Content.save(payload);

    log.info(`content created with id: ${result.id}`);

    return result;
  } catch (err) {
    log.error(`Could not create new content: ${err}`);

    throw err;
  }
}

/**
 * Create a new user.
 *
 * @param {string} id
 *
 * @returns {Promise}
 */
export async function getById(id) {
  try {
    log.info(`Fetching content.`, id);

    let content = await Content.getById(id);

    return content.toJSON()
  } catch (err) {
    log.error(`Could not create new content: ${err}`);

    throw err;
  }
}

/**
 * Create a new user.
 *
 * @param {string} id
 * @param {string} actionType
 *
 * @returns {Promise}
 */
export async function updateByKey(createAt, actionType) {
  try {
    log.info(`Updating content.`, createAt);

    let content = await Content.updateByKey({
      type: 'content',
      createAt: Number(new Date(createAt))
    }, {
      actionType
    });

    return content.toJSON();
  } catch (err) {
    log.error(`Could not update content: ${err}`);

    throw err;
  }
}

/**
 * Create a new user.
 *
 * @param {string} id
 * @param {string} actionType
 *
 * @returns {Promise}
 */
export async function getAvailableContent() {
  try {
    log.info(`Fetching available content.`);

    let content = await Content.getAvailableContent();

    return content.toJSON()
  } catch (err) {
    log.error(`Could not create new content: ${err}`);

    throw err;
  }
}

/**
 * Create a new user.
 *
 * @param {string} id
 * @param {string} actionType
 *
 * @returns {Promise}
 */
export async function getAllContent() {
  try {
    log.info(`Fetching all content.`);

    let content = await Content.getAllContent();

    return content.toJSON()
  } catch (err) {
    log.error(`Could not create new content: ${err}`);

    throw err;
  }
}

/**
 * Create a new user.
 *
 * @param {Array} contents
 *
 * @returns {Promise}
 */
export async function createMultipleContent(contents = []) {
  try {
    log.info(`Uploading email file.`);

    let payload={};

    contents.forEach(async (content, tIndex) => {
      (async (index) => {
				setTimeout(async () => {
          payload = {
            id: v1(),
            body: content.Body,
            date: content.Date,
            emailLead: content.Email_lead,
            subject: content.Subject
          };
          
          // promise.push(Content.save(payload));
          Content.save(payload);
        }, tIndex * 1000);
			})(tIndex);
		})

    
    // let response = await Promise.all(promise);
    return;
  } catch (err) {
    log.error(`Could not create new content: ${err}`);

    throw err;
  }
}


