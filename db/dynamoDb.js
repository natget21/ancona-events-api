import { Database } from './database';
import { dynamoDb} from './dbUtils';

class DynamoDbDatabase extends Database {
  async create(model, item) {
    const params = {
      TableName: model, 
      Item: item
    };
    await dynamoDb.put(params).promise();
    return item;
  }

  async getById(model, id) {
    const params = {
      TableName: model, 
      Key: { id }
    };
    const result = await dynamoDb.get(params).promise();
    return result.Item;
  }

  async get(model, query = {}) {
    const params = {
      TableName: model,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': query.id
      }
    };
    const result = await dynamoDb.query(params).promise();
    return result.Items;
  }

  async update(model, id, item) {
    const params = {
      TableName: model, 
      Key: { id },
      UpdateExpression: 'set #title = :title, #editable = :editable',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#editable': 'editable'
      },
      ExpressionAttributeValues: {
        ':title': item.title,
        ':editable': item.editable
      },
      ReturnValues: 'ALL_NEW'
    };
    const result = await dynamoDb.update(params).promise();
    return result.Attributes;
  }

  async delete(model, id) {
    const params = {
      TableName: model, 
      Key: { id }
    };
    await dynamoDb.delete(params).promise();
  }
}

export { DynamoDbDatabase };
