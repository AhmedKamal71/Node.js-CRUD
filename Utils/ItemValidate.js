const Ajv = require("ajv");
const ajv = new Ajv();

const ItemSchema = {
    type: "object",
    properties: {
        Name: { type: "string", minLength: 3 },
        Price: { type: "integer", minimum: 10 },
        Description: { type: "string", minLength: 10 }
    },
    required: ["Name", "Price", "Description"],
    additionalProperties: false
};

module.exports = ajv.compile(ItemSchema);   // Export function
