/**
 * SPDX-License-Identifier: Apache-2.0
 */
// eslint-disable-next-line n/no-unpublished-import
import 'dotenv/config';
import * as process from 'process';
import axios, {type AxiosRequestConfig} from 'axios';
import {Polarity} from './types/polarity';
import {Elements} from './types/elements';
import {type Habit} from './types/habit';

function getOffsetMidnight(offsetDays: number = 0): Date {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  targetDate.setDate(targetDate.getDate() + offsetDays); // Apply the offset
  return targetDate;
}

async function main(argv: string[]) {
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
  let dateOffset = 0;
  if (argv[2]) {
    dateOffset = +argv[2];
  }
  const midnightOfToday = getOffsetMidnight(dateOffset);
  const response = await axios.get(`${serverUrl}${serverPathTasks}`, {
    headers: {
      'x-client': clientId,
      'x-api-user': userId,
      'x-api-key': apiToken,
    },
  } as AxiosRequestConfig);

  response.data.data.forEach((habit: Habit) => {
    let polarity: Polarity = Polarity.UNKNOWN;
    if (habit.up) {
      polarity = Polarity.WHITE;
    }
    if (habit.down) {
      polarity = Polarity.BLACK;
    }
    let element: Elements = Elements.UNKNOWN;
    habit.tags.forEach(tag => {
      if (tag === Elements.FIRE) {
        element = Elements.FIRE;
      } else if (tag === Elements.WATER) {
        element = Elements.WATER;
      } else if (tag === Elements.AIR) {
        element = Elements.AIR;
      } else if (tag === Elements.EARTH) {
        element = Elements.EARTH;
      }
    });
    if (habit.text === 'M:Vitamins') {
      console.log(habit.text);
    }
    // if (habit.type === 'habit') {
    //   console.log(habit.type);
    // } else { // daily
    //   console.log(habit.type);
    // }
    let habitDescription: string = '';
    if (polarity !== Polarity.UNKNOWN) {
      habitDescription += polarity;
    }
    if (element !== Elements.UNKNOWN) {
      habitDescription += `:${element}`;
    }
    habitDescription += `:${habit.text}`;
    if (habit.notes) {
      habitDescription += `:${habit.notes}`;
    }
    habit.history.forEach(historyItem => {
      if (historyItem.completed && midnightOfToday.valueOf() < new Date(historyItem.date).valueOf()) {
        const dateString: string = new Date(historyItem.date).toISOString().replace('T', '@').slice(0, 19);
        habitMap.set(dateString, habitDescription);
      }
    });
    // console.log(`${dateString}:${habitDescription}`)
  });
  Array.from(habitMap.keys())
    .sort()
    .forEach(habitDate => {
      console.log(`${habitDate}:${habitMap.get(habitDate)}`);
    });
}

main(process.argv)
  .then()
  .catch(e => console.log(e.message, e));
