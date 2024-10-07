import { connection } from "../database/database.js";

export const countLists = async ( sql = connection ) => {
	const result = await sql`SELECT COUNT(*) FROM shopping_lists`;
	return result[0].count;
};

export const countItems = async ( sql = connection ) => {
	const result = await sql`SELECT COUNT(*) FROM shopping_list_items`;
	return result[0].count;
};