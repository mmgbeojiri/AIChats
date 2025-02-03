# ChatAPI
ChatAPI is meant to be used as a backend to support any character in a personalized chatting enviroment.

## How does it work?
After the user submits a message, it is sent to responseAPI.js. This deals with the response. it adds it to the memory json database, which automatically updates for the frontend. Then, it sends the message to apperanceAPI.js. This is made up of 2 AI's, a parser, and a displayer. The Parser identifies the action, expression, setting, and clothes as a prompt, and the displayer creates a image. this image is then set as the background image for a more immerse roleplay.

The memory jsons are stored in local storage.

## Appearance & Personality
Personality is set in ResponseAPI.js as the ``personalityPrompt`` variable. Likewise, Apperance is in the second half of the ``appearancePrompt.``.

## Planned Features ranked from most planned to least
+ Text Streaming
+ Memory in browser storage
+ Editing of Messages
+ Removal of Messages
+ Calling (depicted as a phone call button with the /call domain)
+ Holographic Mode (depicted as the /holo domain with a 3d cube)
+ Phone Messaging???

## How will calling/holographic mode work?
The mic will serve as the input, with the responseAPI being passed through a TTS voice. The calling mode will be a closeup of the face, so perhaps a talking head plastered onto an image of the character.

Holographic mode will be a live3d model with a black background. This full body shot can perform animations and be much more expressive. Meant as a pepper's ghost way of making it come to life.

## Why?
1) To edcuate myself on json parsing, file systems, and passing data from frontend to backend.
2) I am incredibly lonely.
