import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useQuizForm} from '../context/QuizFormContext'

export default function QuizForm() {
    const quizContext =useQuizForm();
    

    return (
        <div className="container mt-5">
            <form onSubmit={quizContext.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="quizTitle" className="form-label">Quiz Title:</label>
                    <input
                        type="text"
                        id="quizTitle"
                        className="form-control"
                        value={quizContext.quizTitle}
                        onChange={(e)=>quizContext.handleTitleChange(e.target.value)}
                        required
                    />
                </div>

                {quizContext.questions.map((q, questionIndex) => (
                    <div key={questionIndex} className="border p-3 mb-3">
                        <div className="mb-3">
                            <label htmlFor={`question${questionIndex}`} className="form-label">Question {questionIndex + 1}:</label>
                            <input
                                type="text"
                                id={`question${questionIndex}`}
                                className="form-control"
                                value={q.question}
                                onChange={(e) => quizContext.handleQuestionChange(questionIndex, e.target.value)}
                                required
                            />
                        </div>

                        <div id="optionsContainer">
                            {q.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="mb-3">
                                    <label htmlFor={`option${questionIndex}${optionIndex}`} className="form-label">Option {optionIndex + 1}:</label>
                                    <input
                                        type="text"
                                        id={`option${questionIndex}${optionIndex}`}
                                        className="form-control"
                                        value={option}
                                        onChange={(e) => quizContext.handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        <button type="button" className="btn btn-primary mb-3" onClick={() => quizContext.addOption(questionIndex)}>
                            Add Option
                        </button>

                        <div className="mb-3">
                            <label htmlFor={`correctAnswer${questionIndex}`} className="form-label">Correct Answer:</label>
                            <select
                                id={`correctAnswer${questionIndex}`}
                                className="form-select"
                                value={q.correctOption}
                                onChange={(e) => {
                                    const newQuestions = [...quizContext.questions];
                                    newQuestions[questionIndex].correctOption = e.target.value;
                                    quizContext.setQuestions(newQuestions);
                                }}
                                required
                            >
                                <option value="" disabled>Select correct answer</option>
                                {q.options.map((_, index) => (
                                    <option key={index} value={q.options[index]}>
                                        {q.options[index]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}

                <div className="d-flex justify-content-start">
                    <button type="button" className="btn btn-secondary mb-3" onClick={quizContext.addQuestion}>
                        Add Question
                    </button>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    );
}
