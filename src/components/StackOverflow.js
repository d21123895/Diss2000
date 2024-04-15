import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilteredAnswersPage from './Answers';

const StackOverflow = ({onLogout, loggedInUser}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [questionId, setQuestionId] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [showNoCode, setShowNoCode] = useState(false);

    // Set initial checkbox state based on the logged-in user
    useEffect(() => {
      if (loggedInUser === 'thomasjcurran92@gmail.com') {
        setShowCode(true); // User1 sees code-based answers
      } else if (loggedInUser === 'lara1kenny@gmail.com') {
        setShowCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'shaneleeelliottss@gmail.com') {
        setShowNoCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'simon.thomas.king@gmail.com') {
        setShowCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'niallotoole00@hotmail.com') {
        setShowNoCode(true); // User2 sees no-code answers
      } else if (loggedInUser === '	aidanoreilly93@gmail.com') {
        setShowCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'alexandramereuta3am@yahoo.com') {
        setShowNoCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'ellemce96@gmail.com') {
        setShowCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'lara.obrien2598@gmail.com') {
        setShowNoCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'lanairwin@gmail.com') {
        setShowCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'danielirwin21@gmail.com') {
        setShowNoCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'cassieleavyx@gmail.com') {
        setShowNoCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'fogofisher@gmail.com') {
        setShowCode(true); // User2 sees no-code answers
      } else if (loggedInUser === 'thomas1314.td@gmail.com') {
        setShowNoCode(true); // User2 sees no-code answers
      }
    }, [loggedInUser]);

    useEffect(() => {
      fetchQuestions();
    }, [currentPage, pageSize, searchTerm, showCode, showNoCode]);
  
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://ec2-3-255-73-147.eu-west-1.compute.amazonaws.com/fetch_stackoverflow_questions`, {
          params: {
            page: currentPage,
            pagesize: pageSize,
            search_term: searchTerm,
            show_code: showCode,
            show_no_code: showNoCode
          }
        });
        const { questions: fetchedQuestions, total_pages: fetchedTotalPages } = response.data;
        setQuestions(fetchedQuestions);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
      setQuestions([]);
    };

  useEffect(() => {
    fetchQuestions();
  }, []); // Fetch questions when the component mounts

  const handleSearch = () => {
    fetchQuestions();
  };

  const handleQuestionClick = (questionId) => {
    setQuestionId(questionId);
  };

  const filterQuestions = (question) => {
    if (showCode && !showNoCode) {
      return question.has_code;
    } else if (!showCode && showNoCode) {
      return question.has_no_code; // Modify to check for questions with at least one answer with no code
    } else if (showCode && showNoCode) {
      return true; // Display all questions regardless of code presence
    }
    return true;
  };
  

  // Function to navigate to answers page when question is clicked
  const navigateToAnswersPage = () => {
    if (questionId) {
      return (
        <FilteredAnswersPage
          questionId={questionId}
          onBackClick={() => setQuestionId(null)}
          showCode={showCode}
          showNoCode={showNoCode}
          onLogout={onLogout}
        />
      );
    }
  };

  return (
    <div>
      {navigateToAnswersPage()} {/* Render answers page if questionId is set */}
      <h2>Stack Overflow Questions <button onClick={onLogout}>Logout</button></h2>
      <div className="search-container">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="options-container">
        <label>Show Code-based Answers:</label>
        <input type="checkbox" checked={showCode} onChange={() => setShowCode(!showCode)} disabled />
      </div>
      <div>
        <label>Show No Code Answers:</label>
        <input type="checkbox" checked={showNoCode} onChange={() => setShowNoCode(!showNoCode)} disabled/>
      </div>
      
      {questions.length === 0 ? (
        <div>
        <p>Loading...</p>
        <p>No Questions found yet matching search criteria</p>
        </div>
      ) : (
        <ul className="questions-list"> 
          {questions.filter(filterQuestions).map((question, index) => (
            <li key={index}>
              <button onClick={() => handleQuestionClick(question.question_id)}>
                {question.title}
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination controls */}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default StackOverflow;
