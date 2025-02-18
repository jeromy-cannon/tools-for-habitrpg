import 'dotenv/config';
import * as process from 'process';
import axios, {AxiosRequestConfig} from 'axios';

async function main(argv: string[]) {
//////////////////////////////////////////////////////////////////////
////   Global Variables                              /////////////////
//////////////////////////////////////////////////////////////////////
    var content;  // holds site-wide content (gear names and stats, quests, etc)
    var tavern;   // holds tavern data
    var party;    // holds party data
    var user;     // holds user's data
    var tasksFromDb;          // holds user's tasks except for ...
    var completedTodosFromDb; // completed To Do's


//////////////////////////////////////////////////////////////////////
////   Global Connection Variables      //////////////////////////////
//////////////////////////////////////////////////////////////////////
    var serverName = 'Habitica'; // used in "loading" message
    var serverUrl = 'https://habitica.com/api/v3';
    var serverPathContent = '/content?language=en';
    var serverPathTavern = '/groups/habitrpg';
    var serverPathParty = '/groups/party';
    var serverPathGuildBase = '/groups?type=guilds';
    var serverPathUser = '/user';
    var serverPathTasks = '/tasks/user';
    var serverPathCompletedTodos = '/tasks/user?type=_allCompletedTodos';
    var clientId = 'd904bd62-da08-416b-a816-ba797c9ee265-DataDisplayTool';
    var userId = process.env.HABITICA_USER;
    var apiToken = process.env.API_TOKEN;
    var debug = false;

    console.log(`user: ${userId}, apiToken:${apiToken}`)
    const response = await axios.get(`${serverUrl}${serverPathTasks}`, {
        headers: {
            'x-client': clientId,
            'x-api-user': userId,
            'x-api-key': apiToken,
        }
    } as AxiosRequestConfig);
    console.log('response: ',     response);



}

main(process.argv).then().catch(e => console.log(e.message, e));