import {
    assertSpyCall,
    assertSpyCalls,
    spy,
} from "https://deno.land/std@0.200.0/testing/mock.ts"; // Importing functions for mocking and assertions
import { assertEquals } from "https://deno.land/std@0.200.0/testing/asserts.ts"; // Importing assertion functions
import {
    countLists,
    countItems,
} from "../shopping-list/services/mainPageService.js"; // Importing the functions to be tested

// Mocking the SQL connection
// This function simulates the behavior of a real SQL connection
const mockSql = spy(async (strings, ...values) => {
    // Combine the parts of the SQL query into a single string
    const query = strings.join("");
    // Check if the query is a SELECT statement for counting lists
    if (query.includes("SELECT COUNT(*) FROM shopping_lists")) {
        return [{ count: 5 }]; // Simulate returning a count of 5 lists
    } 
    // Check if the query is a SELECT statement for counting items
    else if (query.includes("SELECT COUNT(*) FROM shopping_list_items")) {
        return [{ count: 10 }]; // Simulate returning a count of 10 items
    }
    return []; // Default return value for other queries
});

// Test for the countLists function
// This test checks if the countLists function returns the correct count of shopping lists
Deno.test(
    "countLists should return the correct count of shopping lists",
    async () => {
        // Call the countLists function with the mock SQL connection
        const result = await countLists(mockSql);
        // Check if the result is equal to 5
        assertEquals(result, 5);
        // Check if the mock SQL function was called exactly once
        assertSpyCalls(mockSql, 1);
        // Check if the mock SQL function was called with the correct arguments
        assertSpyCall(mockSql, 0, {
            args: [["SELECT COUNT(*) FROM shopping_lists"]],
        });
    }
);

// Test for the countItems function
// This test checks if the countItems function returns the correct count of shopping list items
Deno.test(
    "countItems should return the correct count of shopping list items",
    async () => {
        // Call the countItems function with the mock SQL connection
        const result = await countItems(mockSql);
        // Check if the result is equal to 10
        assertEquals(result, 10);
        // Check if the mock SQL function was called exactly twice
        assertSpyCalls(mockSql, 2);
        // Check if the mock SQL function was called with the correct arguments during the second call
        assertSpyCall(mockSql, 1, {
            args: [["SELECT COUNT(*) FROM shopping_list_items"]],
        });
    }
);