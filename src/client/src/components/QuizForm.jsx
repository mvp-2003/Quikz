import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuizForm } from '../context/QuizFormContext';

export default function QuizForm() {
    const quizContext = useQuizForm();
    
    return (
        <div className="dark:bg-gray-500 bg-gray-100 min-h-screen p-4 flex items-center justify-center">
            
            <div className="container max-w-2xl dark:bg-gray-900 text-black dark:text-gray-200 rounded-lg shadow-lg p-6">
                <form onSubmit={quizContext.handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="quizTitle" className="block text-lg font-semibold mb-2 dark:text-white">Quiz Title:</label>
                        <input
                            type="text"
                            id="quizTitle"
                            className="form-control bg-gray-50 dark:bg-gray-400 text-black dark:text-white dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            value={quizContext.quizTitle}
                            onChange={(e) => quizContext.handleTitleChange(e.target.value)}
                            placeholder="Enter the quiz title"
                            required
                        />
                    </div>

                    {quizContext.questions.map((q, questionIndex) => (
                        <div key={questionIndex} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                            <div className="mb-4">
                                <label htmlFor={`question${questionIndex}`} className="block text-lg font-semibold mb-2 dark:text-white">Question {questionIndex + 1}:</label>
                                <input
                                    type="text"
                                    id={`question${questionIndex}`}
                                    className="form-control bg-gray-50 dark:bg-gray-400 text-black dark:text-white dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    value={q.question}
                                    onChange={(e) => quizContext.handleQuestionChange(questionIndex, e.target.value)}
                                    placeholder="Enter the question text"
                                    required
                                />
                            </div>

                            <div id="optionsContainer">
                                {q.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="mb-3">
                                        <label htmlFor={`option${questionIndex}${optionIndex}`} className="block text-md font-medium mb-1 dark:text-white">Option {optionIndex + 1}:</label>
                                        <input
                                            type="text"
                                            id={`option${questionIndex}${optionIndex}`}
                                            className="form-control bg-gray-50 dark:bg-gray-400 text-black dark:text-white dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            value={option}
                                            onChange={(e) => quizContext.handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                            placeholder="Enter the option text"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            <button type="button" className="btn btn-outline-primary dark:border dark:border-gray-100 mb-3 mt-2 dark:text-white" onClick={() => quizContext.addOption(questionIndex)}>
                                Add Option
                            </button>

                            <div className="mb-3">
                                <label htmlFor={`correctAnswer${questionIndex}`} className="block text-md font-medium mb-1 dark:text-white">Correct Answer:</label>
                                <select
                                    id={`correctAnswer${questionIndex}`}
                                    className="form-select bg-gray-900 dark:bg-gray-400 text-black dark:text-white dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    value={q.correctOption}
                                    onChange={(e) => {
                                        const newQuestions = [...quizContext.questions];
                                        newQuestions[questionIndex].correctOption = e.target.value;
                                        quizContext.setQuestions(newQuestions);
                                    }}
                                    required
                                >
                                    <option value="" disabled>Select the correct answer</option>
                                    {q.options.map((_, index) => (
                                        <option key={index} value={q.options[index]}>
                                            {q.options[index]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mt-6">
                        <button type="button" className="btn btn-secondary dark:btn-dark" onClick={quizContext.addQuestion}>
                            Add Question
                        </button>
                        <button type="submit" className="btn btn-success dark:btn-primary">
                            Submit Quiz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
