import styles from "./game-card.module.css";
import { GameProgress } from "@/lib/definitions";
import { Card } from "../ui/card";
import Link from "next/link";
import { gameStateToString, parseDateTime } from "@/lib/utils";
import GameFeedbackInfo from "./game-feedback-info";
import type { ReactNode } from "react";
import clsx from "clsx";

type GameCardProps = Readonly<{
    game: GameProgress;
    playing?: boolean;
    children?: ReactNode;
}>;

function GameCardInfo({ game, children }: GameCardProps) {
    return (
        <Card className={`hover:bg-accent transition-colors ` + styles.card}>
            <Link
                className="h-full flex flex-col p-4 gap-y-6"
                href={`/game/${game.gameId}`}
                passHref
            >
                <div>
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
                </div>
                <div className="bg-primary-foreground/50 p-4 rounded-md flex-grow">
                    {/* <h3 className="text-sm font-semibold">Feedback</h3> */}
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
                <div className="mt-auto text-sm text-muted-foreground flex justify-end items-center">
                    <span>{parseDateTime(game.createDate)}</span>
                </div>
            </Link>

            {children}
        </Card>
    );
}

function GameCardPlaying({ game, children }: GameCardProps) {
    return (
        <Card className={clsx("p-4 mb-24", styles.card)}>
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
