import React,{createContext,useContext,useState} from 'react'
import axios from 'axios'

const quizForm = createContext(null);

export const useQuizForm=()=>{
    return useContext(quizForm);
}

export const QuizFormProvider=(props)=>{
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: [''], correctOption: '' }
    ]);

    const handleTitleChange=(value)=>{
        setQuizTitle(value);
    }
    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push('');
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: [''], correctOption: '' }]);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        await submitQuiz();
    };
    const submitQuiz=async ()=>{
        await axios.post(`${import.meta.env.VITE_API_URL}/api/quiz/create`,
            {'title':quizTitle,'questions':questions},
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        )
        .then((data)=>{
            if(data.statusText=='Created')
                console.log("success");
        })
        .catch(err=>{
            console.error(err);
        })      
    }
    return (
        <quizForm.Provider value={{
            quizTitle,
            questions,
            setQuestions,
            handleQuestionChange,
            handleOptionChange,
            handleTitleChange,
            addOption,
            addQuestion,
            handleSubmit,
            submitQuiz,
        }}>
            {props.children}
        </quizForm.Provider>
    );
}