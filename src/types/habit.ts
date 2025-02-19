/**
 * SPDX-License-Identifier: Apache-2.0
 */
export interface Habit {
  up: boolean;
  down: boolean;
  tags: string[];
  text: string;
  notes: string;
  history: {completed: boolean; date: Date}[];
}
