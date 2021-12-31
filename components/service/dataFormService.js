let fs = require("fs");

class Data {
    constructor(url) {
        this.url = url
    }
    async sendData(newData) {
        try {
            let data = await this.getData()
            data.push(newData);
            return await fs.promises.writeFile(`${this.url}`, JSON.stringify(data, null, 2));
        } catch (error) {
            console.log(error)
        }
    }

    async getData () {
        try {
            let getAllData = await fs.promises.readFile(`${this.url}`, "utf-8");
            return JSON.parse(getAllData);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Data;