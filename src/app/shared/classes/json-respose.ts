export interface JsonResponse {
    status: string;
    total: number;
    filtered: number;
    data:  Object | Object[];
}
