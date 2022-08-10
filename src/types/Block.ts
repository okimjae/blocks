export interface Block {
  id: string;
  type: string;
  attributes: Attributes;
}

type Attributes = {
  index: number;
  timestamp: number;
  data: string;
  "previous-hash": string;
  hash: string;
};
