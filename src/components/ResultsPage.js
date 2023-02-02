import React from 'react'
import Result from './Result'
import LoadingScreen from "./LoadingScreen"
import { useRef, useEffect } from 'react'
import { useSelector} from 'react-redux';
import { selectAllUsers} from '../features/users';



export default function ResultsPage() {
  const { users, status } = useSelector(selectAllUsers)

  let content;
  switch (status) {
    case 'loading':
      content = <LoadingScreen />;
      break;
    case 'success':
      content = users.map(user => 
        <Result
          key={user.id}
          name={user.name}
          gender={user.gender}
          height={user.height}
          mass={user.mass}
          vehicles={user.vehicles}
          className="fade-in"
        />
      );
      break;
    case 'failed':
      content = <h1 className='loading-text'>Something went wrong</h1>;
      break;
    default:
      content = null;
  }

  const observer = useRef(null);
  useEffect(() => {
    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("load-in"), 250)
          observer.current.unobserve(entry.target);
        }
      });
    });

    const results = document.querySelectorAll(".result");
    results.forEach(result => observer.current.observe(result));

    return () => {
      observer.current.disconnect();
    };
  }, [users]);

  return (
    <main>
      {content}
    </main>
  );
}
