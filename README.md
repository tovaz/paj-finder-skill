# Alexa Skill with TypeScript

This skill is built to support scalabilily, also was build thinking in good practices and guide lines like tslint and google typescript style guide lines.
You can check your code looking inside the package.json to see what command to run if you like so :D

credits: William Valdez 

## Prerequisites

Here you have the technologies used in this project
1. Amazon Developer Account - [How to get it](http://developer.amazon.com/)
2. AWS Account - [Sign up here for free](https://aws.amazon.com/)
3. ASK CLI - [Install and configure ASK CLI](https://developer.amazon.com/es-ES/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
4. Node.js v10.x
5. TypeScript (Version >3.0.0)
6. Visual Studio Code
7. npm Package Manager
8. Alexa ASK for Node.js (Version >2.7.0)
9. ngrok

**ngrok** is used as a proxy to share your local server throght a public http|https url

The **Alexa Skills Kit Command Line Interface** (ASK CLI) is a tool for you to manage your Alexa skills and related resources, such as AWS Lambda functions.

## Creating the Skill with ASK CLI

If you want how to create your Skill with the ASK CLI, please follow the first step explained in my [Node.js Skill](https://github.com/xavidop/alexa-nodejs-lambda-helloworld) sample

Once we have created the Skill in Node.js, we have to rewrite or 'transpile' our code to TypeScript. I have made that work for you. **Let's take a look on it!**

## Project Files 

These are the main files of the project:

```bash

    ├───.ask/
    │       schema
    ├───.vscode/
    │       launch.json
    |---skill-package
    |   |---interactionModels
    |   |   |---custom
    |   |   |------en-ES|de-DE|en-US -> All locales interaction models
    ├───lambda/
    │   │   [compiled files]
    │   │   local-debugger.js
    │   │   package.json
    └───src/
    │   ├───assets
    |   |   ├───translations
    |   |   |   ├───de|en|es -> translations files
    │   ├───envirionments
    │   ├───errors/
    │   ├───intents/
    │   ├───interceptors/
    │   ├───services
    │   └───utils/
    │   ├───views
    │   ├───index.ts
    │---- ask-resources.json
    │---- local-debugger.js
    │---- package.json
    │---- tsconfig.json
    │---- tslint.json

```

* .ask: folder which contains the ASK CLI's config file. This config files will remain empty until we execute the command `ask deploy`
* `.vscode/launch.json`: Launch preferences to run locally your Skill for local testing. This setting launch `lambda/local-debugger.js`. This script runs a server on http://localhost:3001 for debug the Skill. It is not traspilled to TypeScript because it is not a part from our lambda. It is a local tool.
* src: This folder that contains the source code for the skill's AWS Lambda function:
  * `index.ts`: the lambda main entry point
  * `package.json`: this file is core to the Node.js ecosystem and is a basic part of understanding and working with Node.js, npm, and even modern TypeScript
  * `tsconfig.json`: configuration file that we are going to use for compiling our TypeScript code
  * `tslint.json`: configuration file used by `gts` (Google TypeScript Style) to check the style of our TypeScript code
  * `local-debugger.js`: used for debug our skill locally
  * `errors`: folder that contains all error handlers
  * `intents`: this one contains all the intent handlers
    * `default`: contains all amazon default intents
    * `customer`: contains all customer intents includes devices intents an so on
  * `interceptors`: interceptors' folder with the i18n initialization and session handler to inject into atributes
  * `services`: this one contains all shared data for specific or multiple uses case
  * `utils`: this folder contains helper functions, constants and TypeScript interfaces
  * `lambda`: the output folder after compiling the TypeScript code
* `skill-package`
  * `interactionModels/custom` A folder that contains interaction models for the skill. Each interaction model is defined in a JSON file named according to the locale. For example, es-ES.json
  * `skill.json` – The skill manifest. One of the most important files in our project


## Lambda function in TypeScript

The ASK SDK for Node.js makes it easier for you to build highly engaging skills by allowing you to spend more time implementing features and less time writing boilerplate code. 

We are going to use this SDK but now in TypeScript!

You can find documentation, samples and helpful links in their official [GitHub repository](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)

The main TypeScript file in our lambda project is `index.ts` located in `lambda/custom/src` folder. This file contains all handlers, interceptors and exports the Skill handler in `exports.handler`.


## Building the Skill with Visual Studio Code

With TypeScript we have to compile our code to generate the JavaScript code. For build our Skill, we can run the following command:

```bash

  npm run build

```
This command will execute these actions:
1. Remove the `lambda` folder located in `/` with the command `rimraf build`. This folder contains the output of compiling the TypeScript code
2. Build the code for testing, not check gts guidelines.
3. Copy the `package.json` to the `build` folder because is needed to generate the final lambda code


**To build a script to deploy run the following command**
```bash

  npm run deploy

```
1. Remove the `lambda` folder located in `/` with the command `rimraf build`. This folder contains the output of compiling the TypeScript code
2. Check the style of our TypeScript code with the command `gts check` using the file `tslint.json`
3. Compiles the TypeScript and generates the JavaScript code in the output folder `lambda/custom/build` using the command `tsc --build tsconfig.json --pretty`
4. Copy the `package.json` to the `build` folder because is needed to generate the final lambda code
5. Finally, it will run the `npm install --production` in `build` folder to get the final lambda code that we are going to upload to AWS with the ASK CLI.

As you can see, this process in a TypeScript environment is more complex than in JavaScript one.

## **VERY HELPFUL** 
## If you dont know how to debug node apps using Visual Studio Code

## Running the Skill with Visual Studio Code

The `launch.json` file in `.vscode` folder has the configuration for Visual Studio Code which allow us to run our lambda locally:

```json

  {
      "version": "0.2.0",
      "configurations": [
          {
              "type": "node",
              "request": "launch",
              "name": "Launch Skill",
              // Specify path to the downloaded local adapter(for nodejs) file
              "program": "${workspaceRoot}/lambda/custom/local-debugger.js",
              "args": [
                  // port number on your local host where the alexa requests will be routed to
                  "--portNumber", "3001",
                  // name of your nodejs main skill file
                  "--skillEntryFile", "${workspaceRoot}/lambda/custom/build/index.js",
                  // name of your lambda handler
                  "--lambdaHandler", "handler"
              ]
          }
      ]
  }

```
This configuration file will execute the following command:

```bash

  node --inspect-brk=28448 lambda\custom\local-debugger.js --portNumber 3001 --skillEntryFile lambda/custom/build/index.js --lambdaHandler handler

```

This configuration uses the `local-debugger.js` file which runs a [TCP server](https://nodejs.org/api/net.html) listening on http://localhost:3001

For a new incoming skill request a new socket connection is established.
From the data received on the socket the request body is extracted, parsed into JSON and passed to the skill invoker's lambda handler.
The response from the lambda handler is parsed as a HTTP 200 message format as specified [here](https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#http-header-1)
The response is written onto the socket connection and returned.

After configuring our launch.json file and understanding how the local debugger works, it is time to click on the play button:

After executing it, you can send Alexa POST requests to http://localhost:3001.