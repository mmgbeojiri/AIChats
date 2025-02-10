// run `node index.js` in the terminal
import {createCompletion, createCompletionStream, loadModel} from 'gpt4all'
import * as fs from 'fs';
import axios from 'axios';

let debugMode: boolean = true;

const reponseModel = await loadModel('orca-mini-3b-gguf2-q4_0.gguf', { // change this to uncensored model STAT!!!
  verbose: debugMode,
  device: "gpu",
  nCtx: 2048,
})

const personalityPrompt: string = "### System:\nYou are a fantasy game master. The setting is a magical fantasy world called Eldoria. You are the assistant Glem, an artifically-made assistant who will assist the player through this world. You take the form of a physical human body. You will assist the player in their ventures through Eldoria, and answer any questions they have about the world./n/n";
export const firstMessage: string = "Hi! My name is Glem, and welcome to the magical world of Eldoria. Let me know if there's anything you want to know."

const reponseChatData = await reponseModel.createChatSession({
  temperature: 1,
  systemPrompt: personalityPrompt,
})

type role = "system" | "user" | "assistant";

interface Message {
  role: role,
  content: string
}

let jsonData: Message[] | null = null;

async function addToDatabase(role:role, newMessage:string, memoryfile:string) {
  await readfromDatabase(memoryfile) // Read the existing data

  jsonData = [...(jsonData || []), { role: role, content: newMessage }];
  //failsafe.com
  if (jsonData == undefined || jsonData == null ) {
    console.log("MemoryWrite halted to preserve memory.json. The data we got has no value and would delete the entire file.")
    return Error("Write Halted");
  }
  try {
  await axios.post("localhost:3000/memory", jsonData)
  } catch (err: any) {
    if (err) {
      console.log("Error writing to memory file: " + err);
    }
  }

  return jsonData;
};

async function readfromDatabase(memoryfile: string): Promise<Message[] | null> {
  try {
    await axios.get("localhost:3000/memory")
    .then((response) => {
      jsonData = JSON.parse(response.data);
    });
    
  } catch (err) {
    console.log("Error reading memory file: " + err);
  }
  return jsonData;
}

// Load External Memory
let externalMemory: Message[] | null = await readfromDatabase('./memory.json');
if (externalMemory != null) {
  if(externalMemory.length > 0) {
    await createCompletion(reponseChatData, externalMemory);
  }
}

const dispose = () => {
  reponseModel.dispose();
  if(debugMode) {
    console.log('Model disposed');
  }
}

export const respond = async (newMessage: string) => {

  if (debugMode) {
    console.log('sending request now');
    console.log(reponseChatData);
    console.log(newMessage);
    console.log('waiting for response...');
  }
  await addToDatabase('user', newMessage, './memory.json');

  // Look, this is too fast. It's going to break. set a timeout so that the file finishes writing before we read it again.
  await new Promise(resolve => setTimeout(resolve, 100)); // Wait for a new response. This will resolve in 100 milliseconds.

  // initalize a message
  await readfromDatabase("./memory.json")
  jsonData = [...(jsonData || []), { role: "assistant", content: "" }];

  const reponseDataOutput = await createCompletionStream(reponseChatData, newMessage)
  
  reponseDataOutput.tokens.on("data", async (data: string) => {
    console.log(data);
    if (jsonData != null) {
      jsonData[jsonData.length-1].content += data;
    }
  })

  await fs.writeFile("./memory.json", JSON.stringify(jsonData), function (err: Error | null) { return Error("Appendation Halted"); });


  let APIResponse = await reponseDataOutput.result;
  console.log("\n")

  console.log('response received');
  if (debugMode) {
    console.log(reponseDataOutput.result);
    console.log(APIResponse)
  }

   console.log("Role: " + APIResponse.choices[0].message.role);
   console.log("Content: " + APIResponse.choices[0].message.content);

  return APIResponse.choices[0].message.content;
    
};

export function getData() {
  return jsonData ? jsonData : [];
}

export default {firstMessage}

//dispose();
/*let newMessage = prompt();
respond(newMessage);*/
