const Ajv = require("ajv")
const ajv = new Ajv()

let UserSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 3 },
        age: { type: "integer", minimum: 10 },
        address: { type: "string", minLength: 5 },
        email: { type: "string", minLength: 10 },
        password: { type: "string", minLength: 10 }
    },
    required: ["name", "age", "address", "email", "password"],
    additionalProperties: false
};

module.exports = ajv.compile(UserSchema);   // return function