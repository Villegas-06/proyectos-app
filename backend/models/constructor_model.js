const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ConstructorSchema = new mongoose.Schema({
    project_name: { type: String, required: false },
    initial_project_date: { type: Date, required: false },
    final_project_date: { type: Date, required: false },
    images: { type: Array, required: false },
    items_list: [
        {
            item_name: { type: String, required: false },
            unit_value: { type: Number, required: false }
        }
    ],
    createdAt: { type: Date, required: false, default: Date.now }
});

ConstructorSchema.statics = {
    get: function (query) {
        return this.findOne(query).exec();
    },
    getAll: function (query) {
        return this.find(query).exec();
    },
    removeById: function (removeData) {
        return this.findOneAndRemove(removeData).exec();
    },
    create: function (data) {
        const package = new this(data);
        return package.save();
    }
};


ConstructorSchema.plugin(mongoosePaginate);

const packaging = (module.exports = mongoose.model('constructor', ConstructorSchema))