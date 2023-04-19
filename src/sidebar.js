import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

// working...

export default props => {
    const[currentCategory , setCurrentCategory] =  useState("all");
    const[facts , setFacts] = useState([]);


  return (
    <Menu>
       <CategoryFilter setCurrentCategory={setCurrentCategory}  />
    </Menu>
  );
};

const CATEGORIES = [
    { name: 'technology', color: '#3b82f6' },
    { name: 'science', color: '#16a34a' },
    { name: 'finance', color: '#ef4444' },
    { name: 'society', color: '#eab308' },
    { name: 'entertainment', color: '#db2777' },
    { name: 'health', color: '#14b8a6' },
    { name: 'history', color: '#f97316' },
    { name: 'news', color: '#8b5cf6' },
  ];


function CategoryFilter({ setCurrentCategory }) {
    return (
      <aside >
        <ul className='fix' > 
          <li className="category">
            <button className="btn btn-all-categories " onClick={() => setCurrentCategory('all')}>All</button>
          </li>
  
          {CATEGORIES.map((e) => (
            <li key={e.name} className="category ">
              <button className='btn btn-category'
                style={{ backgroundColor: e.color }}
                onClick={() => setCurrentCategory(e.name)}>
                {e.name}
              </button>
            </li>
          ))}
        </ul>
      </aside >
    )
  }

  