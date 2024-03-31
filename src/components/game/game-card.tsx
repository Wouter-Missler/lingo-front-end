import styles from "./game-card.module.css";
import { GameProgress } from "@/lib/definitions";
import { Card } from "../ui/card";
import Link from "next/link";
import { gameStateToString } from "@/lib/utils";
import GameFeedbackInfo from "./game-feedback-info";
import type { ReactNode } from "react";

type GameCardProps = {
    game: GameProgress;
    playing?: boolean;
    children?: ReactNode;
};

function GameCardInfo({ game, children }: GameCardProps) {
    return (
        <Card className={`hover:bg-accent transition-colors ` + styles.card}>
            <Link
                className="h-full block p-4"
                href={`/game/${game.gameId}`}
                passHref
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        Game {game.gameId}
                    </h2>
                    <span className="text-sm font-semibold">
                        Turn {game.turn} — {game.score} points
                    </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>hint: {game.hint}</span>
                    <span>{gameStateToString(game.state)}</span>
                </div>
                <div className="mt-6 bg-primary-foreground/50 p-4 rounded-md">
                    <h3 className="text-sm font-semibold">Feedback</h3>
                    <ul className="mt-2 space-y-1">
                        {game.feedbackHistory.map((feedback) => (
                            <GameFeedbackInfo
                                key={feedback.id}
                                feedback={feedback}
                                size="small"
                            />
                        ))}
                    </ul>
                </div>
            </Link>

            {children}
        </Card>
    );
}

function GameCardPlaying({ game, children }: GameCardProps) {
    return (
        <Card className={`p-4 ` + styles.card}>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Turn {game.turn}</h2>
            </div>
            <div className="flex items-center justify-between mt-2 text-gray-600 mb-12">
                <span>hint: {game.hint}</span>
                <span>{gameStateToString(game.state)}</span>
            </div>

            {game.feedbackHistory.map((feedback) => (
                <GameFeedbackInfo
                    key={feedback.id}
                    feedback={feedback}
                    size="large"
                />
            ))}

            {children}
        </Card>
    );
}

export default function GameCard({ game, playing, children }: GameCardProps) {
    return playing ? (
        <GameCardPlaying game={game}>{children}</GameCardPlaying>
    ) : (
        <GameCardInfo game={game}>{children}</GameCardInfo>
    );
}
