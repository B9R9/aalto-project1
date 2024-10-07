import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";

import * as listController from "./controllers/listsController.js";
import * as itemsController from "./controllers/itemsController.js";
import * as mainPageController from "./controllers/mainPageController.js";

configure({
    views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const handleRequest = async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/" && request.method === "GET") {
        return await mainPageController.viewStat(request);
    }
    if (request.method === "GET" && url.pathname === "/lists") {
        return await listController.viewLists(request);
    }
    if (request.method === "POST" && url.pathname === "/lists") {
        return await listController.addList(request);
    }

    const viewListMatch = url.pathname.match(/^\/lists\/(\d+)$/);
    if (request.method === "GET" && viewListMatch) {
        const id = viewListMatch[1];
        return await listController.viewList(request, id);
    }
    const viewItemsMatch = url.pathname.match(/^\/lists\/(\d+)\/items$/);
    if (request.method === "POST" && viewItemsMatch) {
        const id = viewItemsMatch[1];
        return await itemsController.addItems(request, id);
    }

    const deactivateListMatch = url.pathname.match(/^\/lists\/(\d+)\/deactivate$/);
    if (request.method === "POST" && deactivateListMatch) {
        const id = deactivateListMatch[1];
        return await listController.deactivateList(request, id);
    }

    const collectedItemsMatch = url.pathname.match(/^\/lists\/(\d+)\/items\/(\d+)\/collect$/);
    if (request.method === "POST" && collectedItemsMatch) {
        const listId = collectedItemsMatch[1];
        const itemId = collectedItemsMatch[2];
        return await itemsController.collectItem(request, listId, itemId);
    }


    return new Response("Not found", { status: 404 });
};

const port = parseInt(Deno.env.get("PORT"));
serve(handleRequest, { port });
