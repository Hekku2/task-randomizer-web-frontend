declare namespace TaskRandomizerApi {
    export interface GameSessionModel {
        id;
        gameName;
        errands: TaskRandomizerApi.ErrandModel[] 
        players: string[]
    }
}