"use client";

import { getAllGames, startGame } from "@/lib/data";
import GameCard from "./game-card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { GameProgress, GameState } from "@/lib/definitions";
import { toast } from "sonner";
import { Toggle } from "../ui/toggle";
import GameListSkeleton from "./skeleton/game-list-skeleton";
import { Axios, AxiosError } from "axios";
import { useApiUrl } from "@/lib/utils";

import { AnimatePresence } from "framer-motion";

export default function GameList() {
    const [games, setGames] = useState<GameProgress[]>([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    const { apiUrl } = useApiUrl() as { apiUrl: string };

    useEffect(() => {
        async function fetchGames() {
            try {
                const games = await getAllGames(apiUrl);
                setGames(games);
            } catch (error: any) {
                setError(error);
                console.error(error);
            }

            setLoading(false);
        }

        fetchGames();
    }, []);

    async function handleStartGame() {
        const game = await startGame(apiUrl);
        setGames((games) => [game, ...games]);
        toast.success("Your game has started with ID " + game.gameId);
    }

    function getGamesToShow() {
        return games
            .filter(
                (game) => game.state !== GameState.ELIMINATED || showCompleted
            )
            .sort(
                (a, b) =>
                    new Date(b.createDate).getTime() -
                    new Date(a.createDate).getTime()
            );
    }

    function getCompletedGamesCount() {
        return games.filter((game) => game.state === GameState.ELIMINATED)
            .length;
    }

    return (
        <>
            <div className="flex max-sm:flex-col max-sm:space-y-4 items-center space-x-4 mb-12">
                <Button onClick={handleStartGame} disabled={!!error}>
                    Start a new game
                </Button>
                <Toggle
                    disabled={!!error}
                    onPressedChange={(toggleState) => {
                        setShowCompleted(toggleState);
                    }}
                >
                    Show completed games ({getCompletedGamesCount()})
                </Toggle>
            </div>
            {loading ? (
                <GameListSkeleton />
            ) : error ? (
                <div className="text-orange-500">
                    Error loading games: {error?.message}
                </div>
            ) : (
                <GameListContent games={getGamesToShow()} />
            )}
        </>
    );
}

function GameListContent({ games }: { games: GameProgress[] }) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
                {games.map((game) => (
                    <GameCard key={game.gameId} game={game} />
                ))}
            </AnimatePresence>

            {games.length === 0 && (
                <div className="col-span-3 text-center text-gray-600">
                    No games found. Start a new game above.
                </div>
            )}
        </div>
    );
}
