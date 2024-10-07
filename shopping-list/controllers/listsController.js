import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listsService from "../services/listsService.js";
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

const addList = async (request) => {
    const formData = await request.formData();
    const nameList = formData.get("name");

    await listsService.create(nameList);

    return redirectTo("/lists");
};

const viewLists = async (request) => {
    const data = {
        lists: await listsService.findAllShoppingLists(),
    };
    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewList = async (request, id) => {
    const url = new URL(request.url);
    const listId = url.pathname.split("/")[2];
    const data = {
		list: await listsService.findById(listId),
		items: await itemsService.findAllItems(listId),
	};
    return new Response(await renderFile("list.eta", data), responseDetails);
};

const deactivateList = async (request, id) => {
    await listsService.deactivate(id);
    return redirectTo("/lists");
};

export { addList, viewLists, viewList, deactivateList };
