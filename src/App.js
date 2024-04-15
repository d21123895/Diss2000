// App.js
import React, { useState } from 'react';
import LoginPage from './components/login'; // Make sure to provide the correct path
import StackOverflow from './components/StackOverflow';
import FilteredAnswersPage from './components/Answers';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState('Login');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // Define loggedInUser state

  // Array to store usernames and passwords
  const users = [
    { username: 'thomasjcurran92@gmail.com', password: '1234' },
    { username: 'lara1kenny@gmail.com', password: '1234' },
    { username: 'shaneleeelliottss@gmail.com', password: '1234' },
    { username: 'simon.thomas.king@gmail.com', password: '1234' },
    { username: 'niallotoole00@hotmail.com', password: '1234' },
    { username: 'aidanoreilly93@gmail.com', password: '1234' },
    { username: 'alexandramereuta3am@yahoo.com', password: '1234' },
    { username: 'ellemce96@gmail.com', password: '1234' },
    { username: 'lara.obrien2598@gmail.com', password: '1234' },
    { username: 'lanairwin@gmail.com', password: '1234' },
    { username: 'danielirwin21@gmail.com', password: '1234' },
    { username: 'cassieleavyx@gmail.com', password: '1234' },
    { username: 'fogofisher@gmail.com', password: '1234' },
    { username: 'thomas1314.td@gmail.com', password: '1234' }



    // Add more users as needed
  ];

  // Function to handle login
  const handleLogin = (enteredUsername, enteredPassword) => {
    // Check if the entered username and password match any user in the array
    const user = users.find(user => user.username === enteredUsername && user.password === enteredPassword);
    
    if (user) {
      setIsLoggedIn(true);
      setUsername(enteredUsername);
      setLoggedInUser(enteredUsername); // Set loggedInUser to the username of the logged-in user
      setCurrentPage('StackOverflow');
    } else {
      alert('Invalid username or password');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setLoggedInUser(null); // Reset loggedInUser state on logout
    setCurrentPage('Login');
    setSelectedQuestionId(null);
  };

  // Function to navigate to answers page
  const goToAnswers = (questionId) => {
    setSelectedQuestionId(questionId);
    setCurrentPage('FilteredAnswersPage');
  };

  // Function to navigate to stack overflow page
  const goToStackOverflow = () => {
    setCurrentPage('StackOverflow');
    setSelectedQuestionId(null);
  };

  return (
    <div className="App">
      {currentPage === 'Login' && (
        <LoginPage onLogin={handleLogin} />
      )}
      {isLoggedIn && (
        <StackOverflow
          username={username}
          loggedInUser={loggedInUser} // Pass loggedInUser as a prop
          onQuestionClick={goToAnswers}
          onLogout={handleLogout}
        />
      )}
      {isLoggedIn && (
        <FilteredAnswersPage questionId={selectedQuestionId} onBackClick={goToStackOverflow} onLogout={handleLogout}/>
      )}
    </div>
  );
}

export default App;
