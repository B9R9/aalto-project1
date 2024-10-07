import postgres from "https://deno.land/x/postgresjs@v3.4.2/mod.js";

let connection;

const db = Deno.env.get("MODE");
console.log("MODE:", db);

if (Deno.env.get("DATABASE_URL")) {
    console.log("Connecting to the remote database");
    connection = postgres(Deno.env.get("DATABASE_URL"));
} else {
    if (db === "test") {
        console.log("Connecting to the test database");        
        connection = postgres({
            host: Deno.env.get("PG_TEST_HOST"),
            database: Deno.env.get("PG_TEST_DB"), // Base de données de test
            username: Deno.env.get("PG_TEST_USER"),
            password: Deno.env.get("PG_TEST_PASSWORD"),
            port: parseInt(Deno.env.get("PG_TEST_PORT")),
        });
    }
    if (db === "production") {
        console.log("Connecting to the production database");

        connection = postgres({
            host: Deno.env.get("PG_PROD_HOST"),
            database: Deno.env.get("PG_PROD_DB"), // Base de données de production
            username: Deno.env.get("PG_PROD_USER"),
            password: Deno.env.get("PG_PROD_PASSWORD"),
            port: parseInt(Deno.env.get("PG_PROD_PORT")),
        });
    }
}

export { connection };
