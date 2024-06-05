import { startTransition } from "react";

function Questions({ questions }) {
    return (
        <>
            <div>
                <header>
                    <h2>Coding Questions</h2>
                    {
                        questions.length === 0 ? (
                            <p> No questions available, kindly first generate Questions</p>
                        ) : (
                            questions.map((question, index) => (
                                <div key={index} style={{ textAlign: "left" }} className="question">
                                    <h3 >Q{index + 1}. {question.title}</h3>
                                    <p><strong>Problem Statement:</strong> {question.problem_statement}</p>
                                    <p><strong>Expected Input:</strong> {question.expected_input}</p>
                                    <p><strong>Expected Output:</strong> {question.expected_output}</p>
                                </div>
                            ))
                        )
                    }
                </header>
            </div>
        </>
    );
}

export default Questions;