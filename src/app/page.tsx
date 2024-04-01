import GameList from "@/components/game/game-list";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { startGame } from "@/lib/data";
import { Suspense } from "react";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="my-12 xl:my-24">
                    <h1 className="text-5xl font-bold text-primary mb-2 max-sm:text-center">
                        Welcome to Lingo Trainer.
                    </h1>
                    <h2 className="text-xl font-regular text-primary max-sm:text-center">
                        Continue a game below, or start a new game.
                    </h2>
                </div>
                <GameList />
            </div>
        </>
    );
}
