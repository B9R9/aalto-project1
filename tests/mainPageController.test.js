import { assertSpyCall, assertSpyCalls, spy } from "https://deno.land/std@0.200.0/testing/mock.ts";
import { assertEquals } from "https://deno.land/std@0.200.0/testing/asserts.ts";
import { viewStat } from "../shopping-list/controllers/mainPageController.js";
import * as mainPageService from "../shopping-list/services/mainPageService.js";
import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";

// Créer des fonctions de moquage
const mockCountLists = spy(async () => 5);
const mockCountItems = spy(async () => 10);

// Remplacer les fonctions réelles par les fonctions mock en utilisant un proxy
const mainPageServiceProxy = new Proxy(mainPageService, {
  get(target, prop) {
    if (prop === 'countLists') return mockCountLists;
    if (prop === 'countItems') return mockCountItems;
    return target[prop];
  }
});

// Mocking the renderFile function
const mockRenderFile = spy(() => "<html>Mocked HTML</html>");
globalThis.renderFile = mockRenderFile;

Deno.test("viewStat should return correct response", async () => {
  // Mock request object
  const request = {};

  // Appeler la fonction viewStat avec l'objet de requête mocké
  const response = await viewStat.call({ mainPageService: mainPageServiceProxy }, request);

  // Vérifiez les appels des fonctions mock
  assertSpyCalls(mockCountLists, 1);
  assertSpyCalls(mockCountItems, 1);
  assertSpyCalls(mockRenderFile, 1);
  assertSpyCall(mockRenderFile, 0, {
    args: ["index.eta", { listsCount: 5, itemsCount: 10 }],
  });

  // Vérifiez le contenu de la réponse
  assertEquals(await response.text(), "<html>Mocked HTML</html>");
  assertEquals(response.headers.get("Content-Type"), "text/html;charset=UTF-8");
});