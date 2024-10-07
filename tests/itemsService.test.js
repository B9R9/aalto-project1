import {
    assertSpyCall,
    assertSpyCalls,
    spy,
} from "https://deno.land/std@0.200.0/testing/mock.ts"; // Importing functions for mocking and assertions
import { assertEquals } from "https://deno.land/std@0.200.0/testing/asserts.ts"; // Importing assertion functions
import * as itemsService from "../shopping-list/services/itemsService.js"; // Importing the service to be tested

// Mocking the SQL connection
// This function simulates the behavior of a real SQL connection
const mockSql = spy(async (strings, ...values) => {
    // Combine the parts of the SQL query into a single string
    const query = strings.join("");
    // Check if the query is an INSERT statement
    if (query.includes("INSERT INTO shopping_list_items")) {
        return; // Simulate a successful insertion
    } 
    // Check if the query is a SELECT statement for fetching items
    else if (
        query.includes("SELECT * FROM shopping_list_items WHERE shopping_list_id =  ORDER BY name ASC")
    ) {
        return [{ id: 1, name: "item 1" }, { id: 2, name: "item 2" }]; // Simulate returning two items
    } 
    // Check if the query is an UPDATE statement for marking an item as collected
    else if (query.includes("UPDATE shopping_list_items SET collected = true")) {
        return; // Simulate a successful update
    }
    return []; // Default return value for other queries
});

// Test for the create function
// This test checks if the create function inserts a new item correctly
Deno.test("create should insert a new item", async () => {
    // Call the create function with mock data
    await itemsService.create("item 1", 1, mockSql);
    // Check if the mock SQL function was called exactly once
    assertSpyCalls(mockSql, 1);
    // Check if the mock SQL function was called with the correct arguments
    assertSpyCall(mockSql, 0, {
        args: [
            ["INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (", ", ", ")"], // The SQL query
            "item 1", // The name of the item to be inserted
            1, // The ID of the shopping list
        ],
    });
});