// run `node index.js` in the terminal
import * as chatAPI from './chatAPI.js';

let data = JSON.parse(fs.readFileSync('./memory.json', 'utf8'));

let debugMode = true;

/*const addToDatabase = (role, newMessage) => {
  let data = JSON.parse(fs.readFileSync('./memory.json', 'utf8')); // Read the existing data

  data[0].messages = [...data[0].messages, { role: role, content: newMessage }];

  fs.writeFile('memory.json', JSON.stringify(data), function (err) {
    if (err) {
      console.log(err);
    }
  });
};*/

const ask = () => {
  let newMessage = prompt('User: ');
  chatAPI.addToDatabase('user', newMessage, 'memory.json');
  let dataOutput = chatAPI.sendMessage(data, debugMode);

  console.log(data.choices[0].message.content);
  chatAPI.addToDatabase(
        data.choices[0].message.role,
        data.choices[0].message.content,
        'memory.json'
      );
};

/*

const send = async () => {
  if (debugMode) {
    console.log('sending request now');
    console.log(data);
    console.log('waiting for response...');
  }

  let response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (debugMode) {
      console.log(data)
      }
      console.log(data.choices[0].message.content);
      addToDatabase(
        data.choices[0].message.role,
        data.choices[0].message.content
      );
    }).then(() => {
      if (debugMode) {
        console.log('response received');
      }
    })
    .finally(() => {
      ask();
    });
};

*/
ask();