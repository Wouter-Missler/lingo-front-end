"use client";

import GameCard from "@/components/game/game-card";
import Navbar from "@/components/navbar";
import { getGameProgress, makeGuessAttempt, startRound } from "@/lib/data";
import { GameProgress, GameState } from "@/lib/definitions";
import { parseDateTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import GameBreadcrumb from "@/components/game-breadcrumb";
import { AxiosError } from "axios";
import GameInput from "@/components/game/game-input";
import { Button } from "@/components/ui/button";

type GamePageProps = {
    params: {
        id: number;
    };
};

export default function GamePage({ params }: GamePageProps) {
    const [game, setGame] = useState<GameProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        async function fetchGame() {
            try {
                const game = await getGameProgress(params.id);
                setGame(game);
                setLoading(false);
            } catch (error: any) {
                setGame(null);
                setLoading(false);
                setError(error);
            }
        }

        fetchGame();
    }, [params.id]);

    async function handleAttempt(attempt: string) {
        try {
            const updatedGame = await makeGuessAttempt(params.id, attempt);
            setGame(updatedGame);
        } catch (error: any) {
            setError(error);
        }
    }

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container mx-auto p-4">
                    <GameBreadcrumb id={params.id} />
                    <h1 className="text-5xl font-bold text-primary mb-3">
                        Game {params.id}
                    </h1>
                    <div>Loading...</div>
                </div>
            </>
        );
    }

    if (!game) {
        return (
            <>
                <Navbar />
                <div className="container mx-auto p-4">
                    <GameBreadcrumb id={params.id} />
                    <h1 className="text-5xl font-bold text-primary mb-3">
                        Game {params.id}
                    </h1>
                    <h2 className="text-xl font-regular text-primary mb-12">
                        Something went wrong..
                    </h2>
                    <p className="text-orange-500">Error: {error?.message}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <GameBreadcrumb id={params.id} />

                <h1 className="text-5xl font-bold text-primary mb-3">
                    Game {params.id}
                </h1>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-regular text-primary mb-12">
                        Started on {parseDateTime(game.createDate)}
                    </h2>
                    <h2 className="text-xl font-regular text-primary mb-12">
                        Score: {game.score}
                    </h2>
                </div>

                {game.state === GameState.ELIMINATED && (
                    <p className="text-red-500 text-xl mb-12">
                        Game over! You have been eliminated.
                    </p>
                )}

                {game.state === GameState.WAITING_FOR_ROUND && (
                    <div className="flex items-center justify-between mb-12">
                        <p className="text-green-500 text-xl">
                            Good job! You got the word right.
                        </p>
                        <Button
                            onClick={async () => {
                                const updatedGame = await startRound(params.id);
                                setGame(updatedGame);
                            }}
                            className="bg-primary text-primary-foreground"
                        >
                            Next round
                        </Button>
                    </div>
                )}

                <GameCard game={game} playing={true}>
                    {game.state === GameState.PLAYING && (
                        <GameInput hint={game.hint} onSubmit={handleAttempt} />
                    )}
                </GameCard>
            </div>
        </>
    );
}
