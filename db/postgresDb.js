import { Database } from './database';
import { sequelizeInstance as sequelize } from './dbUtils';

class PostgresDbDatabase extends Database {
  async create(model, item) {
    const Model = sequelize.models[model]; // Dynamically get the model
    const doc = await Model.create(item);
    return doc;
  }

  async getById(model, id) {
    const Model = sequelize.models[model];
    return await Model.findByPk(id);
  }

  async get(model, query = {}) {
    const Model = sequelize.models[model];
    return await Model.findAll({
      where: query, // You can filter by fields here
    });
  }

  async update(model, id, item) {
    const Model = sequelize.models[model];
    const doc = await Model.update(item, { where: { id }, returning: true });
    return doc[1][0]; // Returning the updated row
  }

  async delete(model, id) {
    const Model = sequelize.models[model];
    await Model.destroy({ where: { id } });
  }
}

export { PostgresDbDatabase, connectPostgres };
