// run `node index.js` in the terminal
import {createCompletion, loadModel} from './client/node_modules/gpt4all/src/gpt4all.js'
import question, { prompt } from 'readline-sync';
import * as fs from 'fs';

let data = JSON.parse(fs.readFileSync('./memory.json', 'utf8'));

let debugMode = true;

const reponseModel = await loadModel('orca-mini-3b-gguf2-q4_0.gguf', {
  verbose: debugMode,
  device: "gpu",
  nCtx: 2048,
})
const personalityPrompt = "### System:\nYou are a fantasy game master. The setting is a magical fantasy world called Eldoria. You are the assistant Glem, a man who will assist the player through this world./n/n";
const reponseChatData = await reponseModel.createChatSession({
  temperature: 1,
  systemPrompt: personalityPrompt,
})

function addToDatabase(role, newMessage, memoryfile) {
  let data = JSON.parse(fs.readFileSync(memoryfile, 'utf8')); // Read the existing data

  data[0] = [...data, { role: role, content: newMessage }];

  fs.writeFile(memoryfile, JSON.stringify(data), function (err) {
    if (err) {
      console.log(err);
    }
  });
};


// Load External Memory


const ask = async () => {
  let newMessage = prompt('User: ');

  if (debugMode) {
    console.log('sending request now');
    console.log(reponseChatData);
    console.log(newMessage);
    console.log('waiting for response...');
  }
  
  let reponseDataOutput = await createCompletion(reponseChatData, newMessage)

  console.log('response received');
  //chatAPI.addToDatabase('user', newMessage, 'memory.json');
  //let dataOutput = chatAPI.sendMessage(data, debugMode);
  if (debugMode) {
    console.log(reponseDataOutput);
  }
  console.log(reponseDataOutput.choices[0].message.content);
  addToDatabase(
    reponseDataOutput.choices[0].message.role,
    reponseDataOutput.choices[0].message.content,
        'memory.json'
      );
};

ask();
//reponseModel.dispose();