import mongoose from 'mongoose';
import { Database } from './database.js';

import '../models/mongodb/index.js';

class MongoDbDatabase extends Database {
  async create(collectionName, item) {
    
    const Model = mongoose.models[collectionName];
    if (!Model) throw new Error(`Model ${collectionName} not found`);

    const doc = new Model(item);
    await doc.save();
    return doc;
  }

  async getById(collectionName, id,populate=null,select=null) {
        
    const Model = mongoose.models[collectionName];
    if (!Model) throw new Error(`Model ${collectionName} not found`);

    var query = Model.findById(id);

    if(select){
      query = query.select(select);
    }

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

  async get(collectionName, query = {}, projection = {}, options = {},populate=null,select=null) {
    
    const Model = mongoose.models[collectionName];
    if (!Model) throw new Error(`Model ${collectionName} not found`);

    var query = Model.find(query, projection, options);

    if(select){
      query = query.select(select);
    }
    
    if(populate){
      if (Array.isArray(populate)) {
        populate.forEach(pop => query = query.populate(pop));
      } else {
        query = query.populate(populate);
      }
    }
    
    return await query;
  }

  async getOne(collectionName, query = {}, projection = {}, options = {},populate=null,select=null) {
        
    const Model = mongoose.models[collectionName];
    if (!Model) throw new Error(`Model ${collectionName} not found`);

    var query = Model.findOne(query, projection, options);

    if(select){
      query = query.select(select);
    }
    
    if(populate){
      if (Array.isArray(populate)) {
        populate.forEach(pop => query = query.populate(pop));
      } else {
        query = query.populate(populate);
      }
    }
    
    return await query;
  }

  async update(collectionName, id, item) {
        
    const Model = mongoose.models[collectionName];
    if (!Model) throw new Error(`Model ${collectionName} not found`);

    return await Model.findByIdAndUpdate(id, item, { new: true });
  }

  async remove(collectionName, id) {
        
    const Model = mongoose.models[collectionName];
    if (!Model) throw new Error(`Model ${collectionName} not found`);

    return await Model.findByIdAndDelete(id);
  }

  async userAuthenticate(email, password) {
    
    const Model = mongoose.models['User'];
    if (!Model) throw new Error(`Model ${collectionName} not found`);

    var user = await Model.authenticate(email, password);
    
    return user;
  }

  async userSSOAuthenticate(email, provider) {
    
    const Model = mongoose.models['User'];
    if (!Model) throw new Error(`Model ${collectionName} not found`);

    var user = await Model.authenticateSSO(email, provider);
    
    return user;
  }
}

export { MongoDbDatabase };
