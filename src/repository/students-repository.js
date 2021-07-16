const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../../config/index");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

//const MONGO_URI = "mongodb+srv://user:SJh388vXheaPlZrG@cluster0.jnrz8.mongodb.net/students_db?retryWrites=true&w=majority"
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
const dbName = DB_NAME;

async function connect() {
  if (!client.isConnected()) {
    await client.connect();
    console.log("Connected succesfully to MongoDB");
  }
  return client.db(dbName);
}
function getAll(collection, query) {
  return connect().then((db) => {
    return db.collection(collection).find(query).toArray();
  });
}
function getById(collection, id) {
  return connect().then((db) => {
    return db.collection(collection).findOne({ _id: ObjectId(id) });
  });
}
function update(collection, id, data) {
  return connect()
    .then((db) => {
      return db
        .collection(collection)
        .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    })
    .then((result) => result.upsertedId || id);
}

function drop(collection) {
  return connect().then((db) => {
    return db.collection(collection).drop();
  });
}
const repository = {
  getAll,
  getById,
  update,
  drop,
};
module.exports = repository;
