import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as itemsService from "../services/itemsService.js";


const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
        status: 303,
        headers: {
            Location: path,
        },
    });
};

const addItems = async (request, id) => {
    const formData = await request.formData();
    const nameList = formData.get("name");

    await itemsService.create(nameList, id);

    return redirectTo(`/lists/${id}`);
};

const collectItem = async (request, listId, itemId) => {
	await itemsService.collect(itemId, listId);

	return redirectTo(`/lists/${listId}`);
};

export { addItems, collectItem };
