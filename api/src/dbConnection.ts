import { createConnection, Connection } from "mysql2/promise";

let connection: Connection | undefined;

export function getConnection() {
    if (!connection) {
        throw new Error("Must init connection first!");
    }

    return connection;
}

export async function initConnection() {
    connection = await createConnection({
        host: "sql11.freesqldatabase.com",
        user: "sql11696756",
        password: "8BelbyyTNx",
        database: "sql11696756"
    });
}