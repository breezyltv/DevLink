const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    frameworks: [
      {
        title: { type: String },
        level: { type: Number }
      }
    ],
    languages: [
      {
        title: { type: String },
        level: { type: Number }
      }
    ],
    tools: [
      {
        title: { type: String }
      }
    ]
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  project: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      github_link: {
        type: String
      },
      demo_link: {
        type: String
      }
    }
  ],
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      major: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: [
    {
      youtube: {
        type: String
      },
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
      instagram: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
