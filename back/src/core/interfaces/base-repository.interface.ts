export interface BaseRepositoryInterface<T> {
    findById(id: string): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    findAll(filter?: Partial<T>): Promise<T[]>;
    search(query: string): Promise<T[]>;
  }