import { isURL } from "../src/client/js/urlChecker";

describe("Testing the url checker functionality", () => {
    test("Testing the isURL(url) function", () => {
        expect(isURL).toBeDefined();
    })
})