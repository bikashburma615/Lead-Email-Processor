import {
  CONTENT
} from 'constants/content'

export default {
  type: {
    type: String,
    required: true,
    default: 'content'
  },
  id: {
    type: String,
    required: true,
    maxlength: 90,
    index: {
      global: true,
      name: "id-index"
    }
  },
  actionType: {
    type: String,
    required: false,
    enum: [CONTENT.ACTION_TYPE.POSITIVE, CONTENT.ACTION_TYPE.NEUTRAL, CONTENT.ACTION_TYPE.NOT_A_LEAD, CONTENT.ACTION_TYPE.RELEASE, CONTENT.ACTION_TYPE.ON_HOLD],
    default: CONTENT.ACTION_TYPE.RELEASE
  },
  body: {
    type: String,
    required: true,
    maxlength: 500
  },
  subject: {
    type: String,
    required: true,
    maxlength: 500
  },
  emailLead: {
    type: String,
    required: true,
    maxlength: 500
  },
  updatedBy: {
    type: String,
    required: false,
    maxlength: 90
  },
  createAt: {
    type: Date,
    rangeKey: true,
    default: Date.now,
  }
};
