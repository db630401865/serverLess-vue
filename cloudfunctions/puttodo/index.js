const app = require('./cloudDb');

async function putTod(event) {
  if(event._id === undefined){
    return
  }

  let data = await app.collection('todo').dov(event._id).update({fileId :event.fileId})

  return data
}

exports.main = async (event, context) => {
  return putTod(event);
};
