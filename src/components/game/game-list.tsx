"use client";

import { getAllGames, startGame } from "@/lib/data";
import GameCard from "./game-card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { GameProgress, GameState } from "@/lib/definitions";
import { toast } from "sonner";
import { Toggle } from "../ui/toggle";
import GameListSkeleton from "./skeleton/game-list-skeleton";

export default function GameList() {
    const [games, setGames] = useState<GameProgress[]>([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGames() {
            const games = await getAllGames();
            setGames(games);
            setLoading(false);
        }

        fetchGames();
    }, []);

    async function handleStartGame() {
        const game = await startGame();
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

    return (
        <>
            <div className="flex items-center space-x-4 mb-12">
                <Button onClick={handleStartGame}>Start a new game</Button>
                <Toggle
                    onPressedChange={(toggleState) => {
                        setShowCompleted(toggleState);
                    }}
                >
                    Show completed games (
                    {
                        games.filter(
                            (game) => game.state === GameState.ELIMINATED
                        ).length
                    }
                    )
                </Toggle>
            </div>
            {loading ? (
                <GameListSkeleton />
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {getGamesToShow().map((game) => (
                        <GameCard key={game.gameId} game={game} />
                    ))}

                    {getGamesToShow().length === 0 && (
                        <div className="col-span-3 text-center text-gray-600">
                            No games found. Start a new game above.
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
