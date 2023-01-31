import React from 'react'
import Result from './Result'
import { useRef, useEffect } from 'react'


export default function ResultsPage(props) {

  const observer = useRef(null);

  //intersection observer to dynamically display results
  useEffect(() => {
    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("load-in"), 250)
          ;
          observer.current.unobserve(entry.target);
        }
      });
    });

    const results = document.querySelectorAll(".result");
    results.forEach(result => observer.current.observe(result));

    return () => {
      observer.current.disconnect();
    };
  }, []);

  return (

    < main >
    {
      props.data.length > 0 ? (
        props.data.map(person => (
            
          <Result
            key={person.id}
            name={person.name}
            gender={person.gender}
            height={person.height}
            mass={person.mass}
            vehicles={person.vehicles}
            classsName="fade-in"
          />
        ))
      ) : (
        <h1 className='loading-text'>No Users Found By That Name</h1>
      )
    }

    </main >
        )
}