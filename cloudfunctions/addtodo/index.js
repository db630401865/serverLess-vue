const app = require('./cloudDb');

async function addTodo(event) {
  if(event.title === undefined){
    return
  }
  var todo = {
    title: event.title,
    createTime: Date.now(),
    done: false
  }

  let data = await app.collection('todo').add(todo)

  return data
} 

exports.main = async (event, context) => {
  return addTodo(event);
};
