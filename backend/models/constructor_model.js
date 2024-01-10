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
    get: function (query, callback) {
        this.findOne(query).exec(callback)
    },
    getAll: function (query, callback) {
        this.find(query).exec(callback)
    },
    removeById: function (removeData, callback) {
        this.findOneAndRemove(removeData, callback)
    },
    create: function (data, callback) {
        const package = new this(data)
        package.save(data)
    }
}

ConstructorSchema.plugin(mongoosePaginate);

const packaging = (module.exports = mongoose.model('constructor', ConstructorSchema))