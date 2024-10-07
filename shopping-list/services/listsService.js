import { connection } from "../database/database.js";

export const create = async (name, sql = connection) => {
	await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

export const findAllShoppingLists = async (sql = connection) => {
	const result = await sql`SELECT * FROM shopping_lists WHERE active = true`;
	return result;
}

export const findById = async (id, sql = connection) => {
	const result = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;
	
	if (result && result.length > 0) {
		return result[0];
	  }
	
	  return { id: 0, name: "Unknown" };
}

export const deactivate = async (id, sql = connection) => {
	await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
}