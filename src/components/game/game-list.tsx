"use client";

import { getAllGames, startGame } from "@/lib/data";
import GameCard from "./game-card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { GameProgress } from "@/lib/definitions";

export default function GameList() {
    const [games, setGames] = useState<GameProgress[]>([]);
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
    }

    return (
        <>
            <Button className="mb-12" onClick={handleStartGame}>
                Start a new game
            </Button>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {games.map((game) => (
                        <GameCard key={game.gameId} game={game} />
                    ))}
                </div>
            )}
        </>
    );
}
