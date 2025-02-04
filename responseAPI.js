// run `node index.js` in the terminal
import {createCompletion, createCompletionStream, loadModel} from './client/node_modules/gpt4all/src/gpt4all.js'
import { prompt } from 'readline-sync';
import * as fs from 'fs';


let debugMode = true;

const reponseModel = await loadModel('orca-mini-3b-gguf2-q4_0.gguf', { // change this to uncensored model STAT!!!
  verbose: debugMode,
  device: "gpu",
  nCtx: 2048,
})

const personalityPrompt = "### System:\nYou are a fantasy game master. The setting is a magical fantasy world called Eldoria. You are the assistant Glem, an artifical assistant who will assist the player through this world./n/n";

const reponseChatData = await reponseModel.createChatSession({
  temperature: 1,
  systemPrompt: personalityPrompt,
})

function addToDatabase(role, newMessage, memoryfile) {
  let data = readfromDatabase(memoryfile) // Read the existing data

  data = [...data, { role: role, content: newMessage }];

  fs.writeFile(memoryfile, JSON.stringify(data), function (err) {
    if (err) {
      console.log("Error writing to memory file: " + err);
      fs.writeFile(memoryfile, JSON.stringify([])) // this is the true failsafe.
    }
  });
};

function readfromDatabase(memoryfile) {
  return JSON.parse(fs.readFileSync(memoryfile, 'utf8'));
}

// Load External Memory
if (readfromDatabase('./memory.json').length > 0) {
  await createCompletion(reponseChatData, readfromDatabase('./memory.json'));
}

const dispose = () => {
  reponseModel.dispose();
  if(debugMode) {
    console.log('Model disposed');
  }
}

const respond = async (newMessage) => {
 

  if (debugMode) {
    console.log('sending request now');
    console.log(reponseChatData);
    console.log(newMessage);
    console.log('waiting for response...');
  }

  await addToDatabase('user', newMessage, 'memory.json');
  
  await addToDatabase('assistant', "", "memory.json"); // initalize a message
  
  const reponseDataOutput = await createCompletionStream(reponseChatData, newMessage)
  
  reponseDataOutput.tokens.on("data", (string) => {
    process.stdout.write(string);
    data[data.length-1].content += string;
  })

  await reponseDataOutput.result;
  process.stdout.write("\n")

  console.log('response received');
  if (debugMode) {
    console.log(reponseDataOutput);
  }

  console.log("Role: " + reponseDataOutput.choices[0].message.role);
  console.log("Content: " + reponseDataOutput.choices[0].message.content);

  addToDatabase(
    reponseDataOutput.choices[0].message.role,
    reponseDataOutput.choices[0].message.content,
    'memory.json'
  );

  return reponseDataOutput.choices[0].message.content;
    
};

//dispose();
let newMessage = prompt();
respond(newMessage);
