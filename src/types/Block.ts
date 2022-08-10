export interface Block {
  id: string;
  type: string;
  attributes: Attributes;
}

type Attributes = {
  index: 1;
  timestamp: 1530679678;
  data: "The Human Torch";
  "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=";
  hash: "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=";
};
