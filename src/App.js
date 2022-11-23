import React, {useEffect, useState} from 'react';
import Lesson from "./Lesson";
import BarLoader from 'react-spinners/BarLoader';

export const BaseURL = "http://localhost:8000/api/lessons";

function App() {
    const [lessons, setLessons] = useState({lessons: ''});
    const [currentPage, setCurrentPage] = useState(1);
    const [color] = useState("rgb(139 92 246)");
    const body = document.body;
    body.classList.add( 'bg-gray-700');

    useEffect(() => {
        const fetchData = async (pageNumber= currentPage) => {
            const api = await fetch(`${BaseURL}?page=${pageNumber}`);
            setLessons({
                lessons: await api.json()
            });
            setCurrentPage(pageNumber);
        };
        fetchData();
    }, [currentPage]);




  return (
          <div>
              <img className={'w-40 my-3 block mx-auto drop-shadow-lg z-10'} src="/images/logo.png" alt="play-logo"/>
              {lessons?.lessons?.data ?
              lessons?.lessons?.data?.map((lesson) =>
              <div className={'flex flex-col'} key={lesson.id}>
                  <Lesson
                      lesson={lesson}
                      lessons={lessons}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}/>
              </div>
              ) :
                  <BarLoader
                      color={color}
                      height={4}
                      width={'100%'}
                      aria-label="Loading Spinner"
                  />
              }
          </div>
  );
}

export default App;
