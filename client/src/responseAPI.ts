// run `node index.js` in the terminal
import {createCompletion, createCompletionStream, loadModel} from 'gpt4all'
import * as fs from 'fs';

let debugMode = true;

const reponseModel = await loadModel('orca-mini-3b-gguf2-q4_0.gguf', { // change this to uncensored model STAT!!!
  verbose: debugMode,
  device: "gpu",
  nCtx: 2048,
})

const personalityPrompt = "### System:\nYou are a fantasy game master. The setting is a magical fantasy world called Eldoria. You are the assistant Glem, an artifically-made assistant who will assist the player through this world. You take the form of a physical human body. You will assist the player in their ventures through Eldoria, and answer any questions they have about the world./n/n";

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
  await fs.writeFile(memoryfile, JSON.stringify(jsonData), function (err: Error) {
    if (err) {
      console.log("Error writing to memory file: " + err);
    }
  });
  return jsonData;
};

async function readfromDatabase(memoryfile: string): Promise<Message[] | null> {
  jsonData = await JSON.parse(
    await fs.readFileSync(memoryfile, 'utf8', 
      function (err: Error) { 
        console.log("Error reading from memory file: " + err); 
        return Error("Read Halted");
      }
    )
  );
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

const respond = async (newMessage: string) => {

  if (debugMode) {
    console.log('sending request now');
    console.log(reponseChatData);
    console.log(newMessage);
    console.log('waiting for response...');
  }
  await addToDatabase('user', newMessage, './memory.json');

  // Look, this is too fast. It's going to break. set a timeout so that the file finishes writing before we read it again.
  await new Promise(resolve => setTimeout(resolve, 100)); // Wait for a new response. This will resolve in 100 milliseconds.

  await addToDatabase('assistant', "", "./memory.json"); // initalize a message

  const reponseDataOutput = await createCompletionStream(reponseChatData, newMessage)
  
  reponseDataOutput.tokens.on("data", async (data: string) => {
    process.stdout.write(data);
    await readfromDatabase('./memory.json');
    jsonData[jsonData.length-1].content += data;
    await fs.writeFile("./memory.json", JSON.stringify(jsonData), function (err: Error) { return Error("Appendation Halted"); });
    
  })

  let APIResponse = await reponseDataOutput.result;
  process.stdout.write("\n")

  console.log('response received');
  if (debugMode) {
    console.log(reponseDataOutput.result);
    console.log(APIResponse)
  }

   console.log("Role: " + APIResponse.choices[0].message.role);
   console.log("Content: " + APIResponse.choices[0].message.content);

  return APIResponse.choices[0].message.content;
    
};

//dispose();
let newMessage = prompt();
respond(newMessage);
