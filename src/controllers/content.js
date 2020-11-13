import HttpStatus from 'http-status-codes';

import * as contentService from 'services/content';
import {
  en
} from 'lang/en';

import {
  isEmpty
} from 'lodash';

import NotFoundError from 'errors/NotFoundError';
import {CONTENT} from 'constants/content';

import {sendMail} from 'utils/email';

import {readFile} from 'utils/xlsxReader';

/**
 * Create a new email.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function create(req, res, next) {
  const savePayLoad = req.body;

  try {
    const data = await contentService.create(savePayLoad);

    res.status(HttpStatus.CREATED).json({
      data
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Update email body.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function updateContent(req, res, next) {
  const {
    actionType
  } = req.body;

  try {
    let content = await contentService.getById(req.params.id);
    if (isEmpty(content)) {
      throw new NotFoundError(en.CONTENT.CONTENT_NOT_FOUND);
    }

    await contentService.updateByKey(content[0].createAt, actionType);

    if(actionType!==CONTENT.ACTION_TYPE.RELEASE){
      await sendMail(content[0].emailLead, content[0], actionType)
    }

    res.status(HttpStatus.CREATED).json({});
  } catch (err) {
    next(err);
  }
}

/**
 * Update email body.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function getAvailableContent(req, res, next) {
  try {
    let contents = await contentService.getAvailableContent();
    if (isEmpty(contents)) {
      throw new NotFoundError(en.CONTENT.CONTENT_NOT_FOUND);
    }
    console.log("content ", contents[0])
    await contentService.updateByKey(contents[0].createAt, CONTENT.ACTION_TYPE.ON_HOLD)

    res.status(HttpStatus.CREATED).json({
      data: contents[0]
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Update email body.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function findAll(req, res, next) {
  try {
    let contents = await contentService.getAllContent();

    res.status(HttpStatus.CREATED).json({
      contents
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Update email body.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function uploadXlsxFile(req, res, next) {
  try {
    let contents = await readFile(req.file);
    await contentService.createMultipleContent(contents);

    res.status(HttpStatus.CREATED).json({contents});
  } catch (err) {
    next(err);
  }
}
