const redis = require('redis');
const _ = require('lodash');
const client = redis.createClient(6379, '127.0.0.1');

const databaseApi = new function() {

    this.searchStudent = (findingName) => {
        return new Promise((resolve, reject) => {
            client.get(findingName, (err, val) => {
                // value is null when the key is missing
                if(!_.isNil(val)) {
                    resolve(val);
                } else {
                    reject(err);
                }
            });

        });
    };

    this.getAllStudents = () => {
        return new Promise((resolve, reject) => {
            client.keys('*', async function (err, keys) {
                const usersJson = {};

                if (err) return console.log(err);
                if (keys) {
                    const promises = _.map(keys, async (key) => {
                        return await databaseApi.searchStudent(key);
                    });

                    const userArray = await Promise.all(promises);

                    _.forEach(userArray, (user) => {
                        const userJson = JSON.parse(user);
                        usersJson[userJson.name] = userJson;
                    });

                    // console.log(usersJson);
                    resolve(usersJson);
                } else {
                    reject(err);
                }
            });
        });

    };


    this.addStudent = (jsonData) => {
        return new Promise((resolve, reject) => {
            let key = jsonData.name;
            let value = JSON.stringify(jsonData);

            client.get(key, (err, val) => {
                // value is null when the key is missing
                if (_.isNil(val)) {
                    client.set(key, value);
                    resolve();
                }
                else reject(err);
            })
        });
    };

    this.deleteStudent = (deletingName) => {
        return new Promise((resolve, reject) => {
            let key = deletingName;

            client.get(key, (err, val) => {
                if (!_.isNil(val)) {
                    client.del(key);
                    resolve();
                }
                else {
                    reject(err);
                }
            });
        });
    };

    this.editStudent = (jsonData) => {
        return new Promise((resolve, reject) => {
            let key = jsonData.name;
            let value = JSON.stringify(jsonData);

            client.get(key, (err, val) => {
                if (!_.isNil(val)) {
                    client.set(key, value);
                    resolve();
                }
                else {
                    reject(err);
                }
            });
        });
    };

};


// async function test() {
//     console.log('hi');
//     await databaseApi.getAllStudents();
// }
//
// test();


module.exports = databaseApi;