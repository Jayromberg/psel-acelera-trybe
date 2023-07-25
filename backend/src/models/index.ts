export interface CustomerModel<T> {
  create(data: T): Promise<T>;
  pay(id: string, data: T): Promise<T>;
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}

export interface AdminModel<T> extends CustomerModel<T> {
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<void>;
}
