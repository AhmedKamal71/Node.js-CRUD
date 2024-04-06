const Ajv = require("ajv")
const ajv = new Ajv()

let OrderSchema = {
    type: "object",
    properties: {
        totalPrice: { type: "integer", minimum: 100 },
        items: {
            type: "array"
        }
    },
    required: ["totalPrice", "items"],
    additionalProperties: false
};

module.exports = ajv.compile(OrderSchema);   // return function