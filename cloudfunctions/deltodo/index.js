const app = require('./cloudDb');

async function delTodo(event) {
  req = event
  if(req._id === undefined){
    return
  } 
  let data = await app.collection('todo').doc(req._id).remove()
  return data
}

exports.main = async (event, context) => {
  return delTodo(event);
};

