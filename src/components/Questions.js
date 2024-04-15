import React, { useState } from 'react';
import axios from 'axios';

const QuestionsComponent = () => {
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [questionSearchTerm, setQuestionSearchTerm] = useState('');

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/fetch_stackoverflow_questions/${numQuestions}`);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const searchQuestions = () => {
    // Implement search logic here
    const filteredQuestions = questions.filter(question =>
      question.title.toLowerCase().includes(questionSearchTerm.toLowerCase())
    );
    setQuestions(filteredQuestions);
  };

  return (
    <div>
      <h2>Stack Overflow Questions</h2>
      <div>
        <label>Number of Questions:</label>
        <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
        <button onClick={fetchQuestions}>Fetch Questions</button>
        <input
          type="text"
          placeholder="Search Questions"
          value={questionSearchTerm}
          onChange={(e) => setQuestionSearchTerm(e.target.value)}
        />
        <button onClick={searchQuestions}>Search Questions</button>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <a href={`/answers/${question.question_id}`}>{question.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionsComponent;
