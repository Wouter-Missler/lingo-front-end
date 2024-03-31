import { GameProgress } from "@/lib/definitions";
import { Card } from "../ui/card";
import Link from "next/link";
import { gameStateToString } from "@/lib/utils";

type GameCardProps = {
    game: GameProgress;
};

export default function GameCard({ game }: GameCardProps) {
    return (
        <Card className="hover:bg-accent transition-colors">
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
                        Turn {game.turn}
                    </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>hint: {game.hint}</span>
                    <span>{gameStateToString(game.state)}</span>
                </div>
                <div className="mt-4">
                    <h3 className="text-sm font-semibold">Feedback</h3>
                    <ul className="mt-2 space-y-1">
                        {game.feedbackHistory.map((feedback) => (
                            <li
                                key={feedback.id}
                                className="flex items-center justify-between space-x-2"
                            >
                                <span>{feedback.attempt}</span>
                                <ul className="flex space-x-1">
                                    {feedback.marks.map((mark, index) => (
                                        <li key={index}>
                                            <span
                                                className={`inline-block w-4 h-4 rounded-full ${
                                                    mark === "INVALID"
                                                        ? "bg-gray-500"
                                                        : mark === "ABSENT"
                                                        ? "bg-red-500"
                                                        : mark === "PRESENT"
                                                        ? "bg-orange-500"
                                                        : mark === "CORRECT"
                                                        ? "bg-green-500"
                                                        : ""
                                                }`}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </Link>
        </Card>
    );
}
