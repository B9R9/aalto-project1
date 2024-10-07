import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as mainPageService from "../services/mainPageService.js";

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

const viewStat = async (request) => {
	const data = {
		listsCount: await mainPageService.countLists(),
		itemsCount: await mainPageService.countItems(),
	};
	return new Response(await renderFile("index.eta", data), responseDetails);
}

export { viewStat };