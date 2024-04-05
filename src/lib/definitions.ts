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

export enum MarkColors {
    INVALID = "bg-gray-500",
    ABSENT = "bg-red-500",
    PRESENT = "bg-orange-500",
    CORRECT = "bg-green-500",
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
