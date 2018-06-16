/* eslint-disable no-unused-vars */
import path from "path";

const config = {
  all: {
    root: path.join(__dirname, ".."),
    port: process.env.PORT || 9000,
    ip: process.env.IP || "0.0.0.0",
    apiRoot: process.env.API_ROOT || "",
    mongo: {
      uri: process.env.MONGODB_URI || "mongodb://localhost/hackathon",
      options: {
        db: {
          safe: true
        },
        debug: true
      }
    }
  }
};

module.exports = Object.assign(config.all, config[config.all.env]);
export default module.exports;
