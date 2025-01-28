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

// let data = JSON.parse(fs.readFileSync('./memory.json', 'utf8'));

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

let url = 'https://api.pawan.krd/cosmosrp/v1/chat/completions';


function addToDatabase(role, newMessage, memoryfile) {
  let data = JSON.parse(fs.readFileSync(memoryfile, 'utf8')); // Read the existing data

  data[0].messages = [...data[0].messages, { role: role, content: newMessage }];

  fs.writeFile(memoryfile, JSON.stringify(data), function (err) {
    if (err) {
      console.log(err);
    }
  });
};


async function sendMessage(dataInput, debugMode) {
  if (debugMode) {
    console.log('sending request now');
    console.log(dataInput);
    console.log('waiting for response...');
  }

  let response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(dataInput),
  })
    .then((res) => res.json())
    .then((data) => {
        return data;
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
};

export default {addToDatabase, sendMessage};
