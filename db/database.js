class Database {
    async create(model, item) {
      throw new Error("Method 'create()' must be implemented.");
    }
  
    async getById(model, id,populate=null,select=null) {
      throw new Error("Method 'getById()' must be implemented.");
    }

    async get(model,query = {}, projection = {}, options = {},populate=null,select=null) {
        throw new Error("Method 'get()' must be implemented.");
    }

    async getOne(model,query = {}, projection = {}, options = {},populate=null,select=null) {
        throw new Error("Method 'getOne()' must be implemented.");
    }
  
    async update(model, id, item) {
      throw new Error("Method 'update()' must be implemented.");
    }
  
    async remove(model, id) {
      throw new Error("Method 'remove()' must be implemented.");
    }

    async userAuthenticate(email, password) {
      throw new Error("Method 'userAuthenticate()' must be implemented.");
    }
  }
  
  export { Database };
  