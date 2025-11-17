

import mongoose from "mongoose";

const someModelSchema =  new mongoose.Schema({
    sthL: {

    },

})

const someMod = mongoose.model("someMod", someModelSchema, "somemod")

export default someMod;
