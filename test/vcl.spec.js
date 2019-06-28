import VCL from "../src/VCL";

describe("VCL test coverage", () => {
    it("Create VCL instance", () => {
        const vcl = new VCL({

            global: {
                speechApi: {
                    W3C: {
                        lang: 'sk-SK',
                        continuous: false,
                        interimResults: true,
                        maxAlternatives: 1
                    },
                    GoogleCloudApi: {},
                    debug: true
                }
            }
        });
        expect(vcl).toBeDefined();
        expect(vcl).toEqual(jasmine.any(VCL));
    })
});