"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://test_owner:ymZAs4WwUYt0@ep-sparkling-sun-a53cnapa.us-east-2.aws.neon.tech/test?sslmode=require"
});
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
        console.log(result);
    });
}
function insertData(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
            const values = [name, email, password];
            const res = yield client.query(insertQuery, values);
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getData(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertQuery = "SELECT * FROM users WHERE email = $1";
            const values = [email];
            const res = yield client.query(insertQuery, values);
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    });
}
// createUserTable();
// insertData("shubham","aadead@gmail.com", "eqwfcwefc")
getData("aadead@gmail.com");
