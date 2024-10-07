import { connection } from "../database/database.js";

export const create = async (name, id, sql = connection) => {
	await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${name}, ${id})`;
}

export const findAllItems = async (id, sql = connection) => {
	const result = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} ORDER BY name ASC`;
	return result;
}

export const collect = async (item_id, list_id, sql = connection) => {
	await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${item_id} AND shopping_list_id = ${list_id}`;
}

