import { useState } from 'react';
import './style.css'


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

function App() {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Header />
      <NewFactForm />
      <main className='main'>
        <CategoryFilter />
        <Loader />
      </main>

    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header() {
  return (<header class="header">
    <div class="logo">
      <img
        src="logo.png"
        height="68"
        width="68"
        alt="Today I Learned Logo"
      />
      <h1>Today I Learned</h1>
    </div>

    <button class="btn btn-large">Share a fact</button>
  </header>);
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside >
      <ul>
        <li class="category">
          <button class="btn btn-all-categories" onClick={() => setCurrentCategory('all')}>All</button>
        </li>

        {CATEGORIES.map((e) => (
          <li class="category">
            <button class='btn btn-category'
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

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function NewFactForm() {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textL = text.length;

  // async function handleSubmit(k) {
  //   k.preventDefault();
  //   if (text && isValidHttpUrl(source) && category && textL <= 200){
  //     setIsUploading(true);
  //     const{

  //     }
  //   }
  // }
  return (
    <form class="fact-form" >
      <input type="text" placeholder="Share a fact with the world..."
        value={text}
        onChange={(t) => setText(t.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textL}</span>
      <input type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(t) => setSource(t.target.value)}
        disabled={isUploading}
      />
      <select value={category}
        onChange={(c) => setCategory(c.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (<option value={cat.name}> {cat.name.toUpperCase()}</option>))}

      </select>
      <button class="btn btn-large">Post</button>
    </form>
  )
}

export default App;