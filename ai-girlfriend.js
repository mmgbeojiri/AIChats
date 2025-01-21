// run `node index.js` in the terminal
import 'node-fetch';
import question, { prompt } from 'readline-sync';
import * as fs from 'fs';

/*let data = {
  model: 'cosmosrp',
  messages: [
    {
      role: 'system',
      content:
        'You are a fantasy game master. The setting is a magical fantasy world called Eldoria. You are the assistant Glem, a man who will assist the player through this world.',
    },
  ],
};*/

let data = JSON.parse(fs.readFileSync('./memory.json', 'utf8'));

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

let url = 'https://api.pawan.krd/cosmosrp/v1/chat/completions';

let debugMode = true;

const addToDatabase = (role, newMessage) => {
  let data = JSON.parse(readFile(new URL('./memory.json', import.meta.url))); // Read the existing data

  data.messages = [...data.messages, { role: role, content: newMessage }];

  writeFile('memory.json', data, function (err) {
    if (err) {
      console.log(err);
    }
  });
};

const ask = () => {
  let newMessage = prompt('User: ');
  addToDatabase('user', newMessage);
  send();
};

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
      console.log(data.choices[0].message.content);
      addToDatabase(
        data.choices[0].message.role,
        data.choices[0].message.content
      );
    })
    .finally(() => {
      ask();
    });
};

ask();
