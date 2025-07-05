interface CreateItem {
  name: string;
  description: string;
  quantity: number;
}

interface UpdateItem {
  name?: string;
  description?: string;
  quantity?: number;
}

export { CreateItem, UpdateItem };
