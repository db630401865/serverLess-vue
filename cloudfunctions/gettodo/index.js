const app = require('./cloudDb');

async function showTod() {
  const data = app.collection('todo').get()
  return data
}

exports.main = async (event, context) => {
  return showTod();
};
