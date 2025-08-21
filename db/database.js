class Database {
    async create(model, item) {
      throw new Error("Method 'create()' must be implemented.");
    }
  
    async getById(model, id) {
      throw new Error("Method 'getById()' must be implemented.");
    }

    async get(model,query = {}, projection = {}, options = {}) {
        throw new Error("Method 'get()' must be implemented.");
      }
  
    async update(model, id, item) {
      throw new Error("Method 'update()' must be implemented.");
    }
  
    async delete(model, id) {
      throw new Error("Method 'delete()' must be implemented.");
    }
  }
  
  export { Database };
  