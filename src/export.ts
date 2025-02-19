/**
 * SPDX-License-Identifier: Apache-2.0
 */
import 'dotenv/config';
import * as process from 'process';
import axios, {type AxiosRequestConfig} from 'axios';

async function main() {
    //////////////////////////////////////////////////////////////////////
    ////   Global Variables                              /////////////////
    //////////////////////////////////////////////////////////////////////
    // let content; // holds site-wide content (gear names and stats, quests, etc)
    // let tavern; // holds tavern data
    // let party; // holds party data
    // let user; // holds user's data
    // let tasksFromDb; // holds user's tasks except for ...
    // let completedTodosFromDb; // completed To Do's

    //////////////////////////////////////////////////////////////////////
    ////   Global Connection Variables      //////////////////////////////
    //////////////////////////////////////////////////////////////////////
    // const serverName = 'Habitica'; // used in "loading" message
    const serverUrl = 'https://habitica.com/api/v3';
    // const serverPathContent = '/content?language=en';
    // const serverPathTavern = '/groups/habitrpg';
    // const serverPathParty = '/groups/party';
    // const serverPathGuildBase = '/groups?type=guilds';
    // const serverPathUser = '/user';
    const serverPathTasks = '/tasks/user';
    // const serverPathCompletedTodos = '/tasks/user?type=_allCompletedTodos';
    const clientId = 'd904bd62-da08-416b-a816-ba797c9ee265-DataDisplayTool';
    const userId = process.env.HABITICA_USER;
    const apiToken = process.env.API_TOKEN;
    // const debug = false;
    const habitMap: Map<string, string> = new Map<string, string>();

    console.log(`user: ${userId}, apiToken:${apiToken}`);
    const response = await axios.get(`${serverUrl}${serverPathTasks}`, {
        headers: {
            'x-client': clientId,
            'x-api-user': userId,
            'x-api-key': apiToken,
        },
    } as AxiosRequestConfig);

    console.log('response: ', response);
    response.data.data.forEach(habit => {
        const dateString: string = new Date(habit.updatedAt).toISOString().replace('T', '@').slice(0, 19);
        let polarity: Polarity = Polarity.UNKNOWN;
        if (habit.up) {
            polarity = Polarity.WHITE;
        }
        if (habit.down) {
            polarity = Polarity.BLACK;
        }
        const habitDescription: string = '';
        habitMap.set(dateString, `polarity:${polarity}`);
        // console.log(`${dateString}:${habitDescription}`)
    });
    Array.from(habitMap.keys()).sort().forEach(habitDate => {
        console.log(`${habitDate}:${habitMap.get(habitDate)}`)
    })
}

main()
    .then()
    .catch(e => console.log(e.message, e));
