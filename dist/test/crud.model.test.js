import { generateDynamicSchema } from "..";
import mongoose from "mongoose";
const table = generateDynamicSchema({
    modelName: "TABLE",
    fields: {
        name: {
            type: String
        }
    }, model: mongoose.model,
});
//# sourceMappingURL=crud.model.test.js.map