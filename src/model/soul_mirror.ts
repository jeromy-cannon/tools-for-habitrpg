/**
 * SPDX-License-Identifier: Apache-2.0
 */
import {type Polarity} from '../types/polarity';

export class SoulMirror {
  constructor(
    public readonly polarity: Polarity,
    public readonly element: Element,
  ) {}
}
