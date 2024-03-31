import GameList from "@/components/game/game-list";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { startGame } from "@/lib/data";
import { Suspense } from "react";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 pt-12">
                <h1 className="text-5xl font-bold text-primary mb-2">
                    Welcome to Lingo Trainer.
                </h1>
                <h2 className="text-2xl font-semibold text-primary mb-12">
                    Continue a game below, or start a new game.
                </h2>
                <Suspense fallback={<div>Loading...</div>}>
                    <GameList />
                </Suspense>
            </div>
        </>
    );
}
