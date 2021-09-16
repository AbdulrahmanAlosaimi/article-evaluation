/**
 * @jest-environment jsdom
 */

import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit(url) function", () => {
        expect(handleSubmit).toBeDefined();
    })
})