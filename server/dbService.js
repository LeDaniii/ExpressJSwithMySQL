const mysql = require('mysql');
const dotenv = require('dotenv');
const { errorMonitor } = require('stream');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: "root",
    password: "",
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state)
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM name";
                // https://www.youtube.com/watch?v=vrj9AohVhPA&t=3187s at min 32 upwards sql injection with id
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });

            // console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        };
    };

    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO name (name, date_added) VALUES (?,?)";
            // https://www.youtube.com/watch?v=vrj9AohVhPA&t=3187s at min 43 upwards sql injection with id
            connection.query(query, [name,dateAdded] ,(err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.insertId);
            })
        });

            // console.log(insertId);
            return {
                id : insertId,
                name: name,
                dateAdded: dateAdded
            }
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = DbService;