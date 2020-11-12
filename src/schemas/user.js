export default {
  username: {
    type: String,
    required: true,
    maxlength: 90
  },
  password: {
    type: String,
    required: true,
    maxlength: 90
  },
  id: {
    type: String,
    required: true,
    maxlength: 90,
    index: {
      global: true,
      name: "actiontype-index"
    }
  },
  role: {
    type: String,
    required: true,
    maxlength: 90
  },
  refreshToken: {
    type: Array,
    required: false
  },
};
