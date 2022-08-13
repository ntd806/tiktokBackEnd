export interface SearchServiceInterface<T> {
    insertIndex(bulkData: T, path: string): Promise<T>;

    updateIndex(updateData: T): Promise<T>;

    searchIndex(searchData: T): Promise<T>;

    deleteIndex(indexData: T): Promise<T>;

    deleteDocument(indexData: T): Promise<T>;
}
