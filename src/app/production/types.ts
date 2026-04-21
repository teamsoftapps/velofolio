/** @format */

export interface Card {
  id: string;
  title: string;
  label: string;
  date: string;
  description: string;
  attachments: number;
  comments: number;
  members: string[];
  image?: string;
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
  color?: string;
}

export interface InitialData {
  lists: { [key: string]: List };
  listOrder: string[];
}
