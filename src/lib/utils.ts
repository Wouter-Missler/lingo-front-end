import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GameState } from "./definitions";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const gameStateToString = (status: GameState) => {
    switch (status) {
        case GameState.WAITING_FOR_ROUND:
            return "Waiting for round";
        case GameState.PLAYING:
            return "Playing";
        case GameState.ELIMINATED:
            return "Eliminated";
    }
};

export const parseDateTime = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleString();
};
