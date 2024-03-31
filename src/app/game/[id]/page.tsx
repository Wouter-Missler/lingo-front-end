"use client";

import GameCard from "@/components/game/game-card";
import Navbar from "@/components/navbar";
import { getGameProgress } from "@/lib/data";
import { GameProgress } from "@/lib/definitions";
import { useEffect, useState } from "react";

type GamePageProps = {
    params: {
        id: number;
    };
};

export default function GamePage({ params }: GamePageProps) {
    const [game, setGame] = useState<GameProgress | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGame() {
            const game = await getGameProgress(params.id);
            setGame(game);
            setLoading(false);
        }

        fetchGame();
    }, [params.id]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 pt-12">
                <h1 className="text-5xl font-bold text-primary mb-12">
                    Game {params.id}
                </h1>
                {loading ? <div>Loading...</div> : <GameCard game={game!} />}
            </div>
        </>
    );
}
