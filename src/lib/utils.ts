import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GameState } from "./definitions";
import { useEffect, useState } from "react";

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

export const useApiUrl = () => {
    const getApi = () => {
        if (typeof window === "undefined") {
            return process.env.NEXT_PUBLIC_API_URL;
        }

        return (
            localStorage.getItem("API_URL") || process.env.NEXT_PUBLIC_API_URL
        );
    };

    const setApiUrl = (url: string) => {
        localStorage.setItem("API_URL", url);
    };

    const resetApiUrl = () => {
        console.log("resetting");
        localStorage.setItem(
            "API_URL",
            process.env.NEXT_PUBLIC_API_URL as string
        );
    };

    return {
        apiUrl: getApi(),
        setApiUrl,
        resetApiUrl,
    };
};
