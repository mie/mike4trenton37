const fs = require("fs");
const https = require("https");

class GetKey {
  constructor(filename) {
    this.api_key = "";
    this.filename = filename;
  }
  read_key = () => {
    if (this.filename !== "" && fs.existsSync(this.filename)) {
      try {
        this.api_key = JSON.parse(fs.readFileSync(this.filename)).header.split(": ")[1];
      } catch (err) {
        console.log(err);
      }
      return this.api_key;
    }
  };
}

class DataClient {
  constructor() {
    this.options = {
      hostname: "api.1337co.de",
      path: "/v3/employees",
    };
  }
  fetch(api_key) {
    return new Promise((resolve, reject) => {
      https.get(
        { ...this.options, headers: { Authorization: api_key, 'Content-Type': 'application/json' } },
        (response) => {
					response.setEncoding('utf8');
          let buffer = [];
          response.on("data", (data) => {
            buffer.push(data);
          });
          response.on("error", (error) => {
            reject(error);
          });
          response.on("end", (data) => {
						console.log(buffer);
            const output = JSON.parse(buffer.join(""));
            resolve(output);
          });
        }
      );
    });
  }
}

module.exports = {
  GetKey,
  DataClient,
};
