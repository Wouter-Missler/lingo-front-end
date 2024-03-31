export enum GameState {
    WAITING_FOR_ROUND = "WAITING_FOR_ROUND",
    PLAYING = "PLAYING",
    ELIMINATED = "ELIMINATED",
}

export enum Mark {
    INVALID = "INVALID",
    ABSENT = "ABSENT",
    PRESENT = "PRESENT",
    CORRECT = "CORRECT",
}

export type Feedback = {
    id: number;
    attempt: string;
    marks: Mark[];
};

export type GameProgress = {
    gameId: number;
    state: GameState;
    turn: number;
    score: number;
    feedbackHistory: Feedback[];
    hint: string;
    createDate: string;
    modifyDate: string;
};
