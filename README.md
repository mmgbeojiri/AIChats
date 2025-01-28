# AIChats
Meant to be used as a backend for any ai chat interface.

git remote add origin https://github.com/mmgbeojiri/AIChats.git
git branch -M main
git push -u origin main

## How does it work?
After the user submits a message, it is sent to responseAPI.js. This deals with the response. it adds it to the memory json database, which automatically updates for the frontend. Then, it sends the message to apperanceAPI.js. This is made up of 2 AI's, a parser, and a displayer. The Parser identifies the action, expression, setting, and clothes as a prompt, and the displayer creates a image. this image is then set as the background image for a more immerse roleplay.

## Appearance & Personality
Personality is set in memoryInital.json. Apperance is in ApperanceInital.json.