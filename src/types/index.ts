import { ItemInterface } from 'react-sortablejs'

export type AnswerValue = 'A' | 'B' | 'C' | 'D'

export enum AnswerType {
  userAnswer,
  theAnswer
}

export type AnswerData = Pick<ListData, 'id' | 'value'>

export interface ListData extends ItemInterface {
  id: string
  value: string
}
