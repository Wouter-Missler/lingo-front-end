import axios from "axios";
import { GameProgress } from "./definitions";
import { useApiUrl } from "./utils";

export async function getAllGames(api: string): Promise<GameProgress[]> {
    try {
        const response = await axios.get(api + "/game");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getGameProgress(
    api: string,
    gameId: number
): Promise<GameProgress> {
    try {
        const response = await axios.get(api + `/game/${gameId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function startGame(api: string): Promise<GameProgress> {
    try {
        const response = await axios.post(api + "/game/start");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function startRound(
    api: string,
    gameId: number
): Promise<GameProgress> {
    try {
        const response = await axios.post(api + `/game/${gameId}/round/start`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function makeGuessAttempt(
    api: string,
    gameId: number,
    attempt: string
): Promise<GameProgress> {
    try {
        const response = await axios.post(api + `/game/${gameId}/guess`, {
            attempt,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getSolution(
    api: string,
    gameId: number
): Promise<string> {
    try {
        const response = await axios.get(api + `/game/${gameId}/solution`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
