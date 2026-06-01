declare module 'meilisearch' {
  export class MeiliSearch {
    constructor(config: any);
    index(indexName: string): any;
    health(): Promise<any>;
    version(): Promise<any>;
    createIndex(uid: string, options?: any): Promise<any>;
    deleteIndex(uid: string): Promise<any>;
    getIndexes(): Promise<any>;
    getIndex(uid: string): Promise<any>;
  }
}
