const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ConstructorSchema = new mongoose.Schema({
    project_name: { type: String, required: true },
    initial_project_date: { type: Date, required: true },
    final_project_date: { type: Date, required: true },
    images: { type: Array, required: true },
    items_list: [
        {
            item_name: { type: String, required: true },
            unit_value: { type: Number, required: true }
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