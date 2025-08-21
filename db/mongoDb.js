import mongoose from 'mongoose';
import { Database } from './database.js';

class MongoDbDatabase extends Database {
  async create(Model, item) {
    const doc = new Model(item);
    await doc.save();
    return doc;
  }

  async getById(Model, id,populate=null) {
    var query = Model.findById(id);

    if(populate){
      if (Array.isArray(populate)) {
        populate.forEach(pop => query = query.populate(pop));
      } else {
        query = query.populate(populate);
      }
    }else{
    }
    return await query;
  }

  async get(Model, query = {}, projection = {}, options = {},populate=null) {
    var query = Model.find(query, projection, options);
    
    if(populate){
      if (Array.isArray(populate)) {
        populate.forEach(pop => query = query.populate(pop));
      } else {
        query = query.populate(populate);
      }
    }
    
    return await query;
  }

  async update(Model, id, item) {
    return await Model.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(Model, id) {
    return await Model.findByIdAndDelete(id);
  }
}

export { MongoDbDatabase };
