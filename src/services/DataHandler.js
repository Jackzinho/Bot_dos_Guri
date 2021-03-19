const fs = require('fs');

const fsp = fs.promises;

class DataHandler {
  constructor(dataPath) {
    this.dataPath = dataPath;

    if (!fs.existsSync(this.dataPath)) {
      this.dataObject = {};

      fs.writeFileSync(this.dataPath, JSON.stringify(this.dataObject));
    } else {
      const file = fs.readFileSync(this.dataPath, { encoding: 'utf-8' });

      this.dataObject = JSON.parse(file);
    }
  }

  async save() {
    await fsp.writeFile(this.dataPath, JSON.stringify(this.dataObject, null, ' '));
  }

  /**
   * @param {object} data
   */
  set data(data) {
    Object.assign(this.dataObject, data);
  }

  get data() {
    return this.dataObject;
  }
}

module.exports = { DataHandler };
