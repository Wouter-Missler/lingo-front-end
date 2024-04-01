import axios from "axios";
import { GameProgress } from "./definitions";
import { useApiUrl } from "./utils";

export async function getAllGames(): Promise<GameProgress[]> {
    const { apiUrl: api } = useApiUrl();

    try {
        const response = await axios.get(api + "/game");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getGameProgress(gameId: number): Promise<GameProgress> {
    const { apiUrl: api } = useApiUrl();

    try {
        const response = await axios.get(api + `/game/${gameId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function startGame(): Promise<GameProgress> {
    const { apiUrl: api } = useApiUrl();

    try {
        const response = await axios.post(api + "/game/start");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function startRound(gameId: number): Promise<GameProgress> {
    const { apiUrl: api } = useApiUrl();

    try {
        const response = await axios.post(api + `/game/${gameId}/round/start`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function makeGuessAttempt(
    gameId: number,
    attempt: string
): Promise<GameProgress> {
    const { apiUrl: api } = useApiUrl();

    try {
        const response = await axios.post(api + `/game/${gameId}/guess`, {
            attempt,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getSolution(gameId: number): Promise<string> {
    const { apiUrl: api } = useApiUrl();

    try {
        const response = await axios.get(api + `/game/${gameId}/solution`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
