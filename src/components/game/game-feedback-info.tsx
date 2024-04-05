import { Feedback, Mark, MarkColors } from "@/lib/definitions";
import styles from "./game-feedback-info.module.css";
import clsx from "clsx";

function GameFeedbackInfoLarge({ feedback }: Readonly<{ feedback: Feedback }>) {
    return (
        <li className="flex items-center justify-center space-x-2">
            <ul className="flex space-x-2 mb-2 md:space-x-4 md:mb-4">
                {feedback.marks.map((mark, index) => (
                    <li key={mark + "-" + index}>
                        <span
                            className={clsx(
                                "text-lg md:text-4xl lg:text-5xl text-white w-10 md:w-16 lg:w-24 grid place-items-center font-black aspect-square rounded-full",
                                MarkColors[mark as Mark],
                                styles.feedbackBubble
                            )}
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            {feedback.attempt[index]}
                        </span>
                    </li>
                ))}
            </ul>
        </li>
    );
}

function GameFeedbackInfoSmall({ feedback }: Readonly<{ feedback: Feedback }>) {
    return (
        <li className="flex items-center justify-between space-x-2">
            <span>{feedback.attempt}</span>
            <ul className="flex space-x-1">
                {feedback.marks.map((mark, index) => (
                    <li key={mark + "-" + index}>
                        <span
                            className={clsx(
                                "inline-block w-4 h-4 rounded-full",
                                MarkColors[mark as Mark]
                            )}
                        />
                    </li>
                ))}
            </ul>
        </li>
    );
}

type GameFeedbackInfoProps = {
    feedback: Feedback;
    size: "small" | "large";
};

export default function GameFeedbackInfo({
    feedback,
    size,
}: GameFeedbackInfoProps) {
    return size === "small" ? (
        <GameFeedbackInfoSmall feedback={feedback} />
    ) : (
        <GameFeedbackInfoLarge feedback={feedback} />
    );
}
