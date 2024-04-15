import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilteredAnswersPage = ({ questionId, onBackClick, showCode, showNoCode, onLogout }) => {
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`http://ec2-3-255-73-147.eu-west-1.compute.amazonaws.com/fetch_stackoverflow_answers/${questionId}`);
        setAnswers(response.data.answers);
      } catch (error) {
        console.error('Error fetching answers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnswers();

    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, [questionId]);

  return (
    <div>
      <h2><button onClick={onBackClick}>Back to Questions</button> Filtered Stack Overflow Answers <button onClick={onLogout}>Logout</button></h2>
      
      {isLoading && <p>Loading...</p>}
      {!isLoading && answers.length === 0 && (
        <p>No answers found matching search criteria</p>
      )}
      {!isLoading && answers.length > 0 && (
        <div className="questions-list">
          {answers.map((answer, index) => {
            const hasCode = containsCode(answer);
            if ((showCode && hasCode) || (showNoCode && !hasCode) || (!showCode && !showNoCode)) {
              return (
                <div key={index} className="answer-card">
                  <div dangerouslySetInnerHTML={{ __html: answer }} />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

// Function to check if an answer contains code
const containsCode = (answer) => {
  // You can customize this logic based on how you define code in an answer
  // For simplicity, let's say an answer contains code if it contains "<code>" tag
  return answer.includes('<code>');
};

export default FilteredAnswersPage;
