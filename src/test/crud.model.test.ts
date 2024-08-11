import { generateDynamicSchema } from "..";
import mongoose from "mongoose";

interface TableI {
    name: string
}

interface e {

}
const table = generateDynamicSchema<TableI, e>({
    modelName: "TABLE",
    fields: {
        name: {
            type: String
        }
    }, model: mongoose.model,
    
})