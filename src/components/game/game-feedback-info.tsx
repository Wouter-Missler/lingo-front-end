import { Feedback, Mark } from "@/lib/definitions";
import styles from "./game-feedback-info.module.css";

function GameFeedbackInfoLarge({ feedback }: { feedback: Feedback }) {
    // show the attempt in little boxes, colored accordingly, large size, the letters of the attempt in the boxes
    return (
        <li className="flex items-center justify-center space-x-2">
            <ul className="flex space-x-2 mb-2 md:space-x-4 md:mb-4">
                {feedback.marks.map((mark, index) => (
                    <li key={index}>
                        <span
                            className={
                                `text-lg md:text-4xl lg:text-5xl text-white w-10 md:w-16 lg:w-24 grid place-items-center font-black aspect-square rounded-full ${
                                    mark === Mark.INVALID
                                        ? "bg-gray-500"
                                        : mark === Mark.ABSENT
                                        ? "bg-red-500"
                                        : mark === Mark.PRESENT
                                        ? "bg-orange-500"
                                        : mark === Mark.CORRECT
                                        ? "bg-green-500"
                                        : ""
                                } ` + styles.feedbackBubble
                            }
                        >
                            {feedback.attempt[index]}
                        </span>
                    </li>
                ))}
            </ul>
        </li>
    );
}

function GameFeedbackInfoSmall({ feedback }: { feedback: Feedback }) {
    return (
        <li className="flex items-center justify-between space-x-2">
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
