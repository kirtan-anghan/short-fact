import { useEffect, useState } from 'react';
import './style.css';
import supabase from './supabase';


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
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from('data').select('*');

        if (currentCategory !== 'all')
          query = query.eq('category', currentCategory);

        const { data: facts, error } = await query
          .order('votesInteresting', { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else alert('There was a problem getting data');
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm} /> : null}

      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (<Loader />) :
          (<FactList facts={facts} setFacts={setFacts} />)}
      </main>

    </>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0)
    return (
      <p className='message'>
        there are no fact hear !! Create the first one ✌️
      </p>
    );

  return (
    <section>
      <ul className='fact-list'>
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  )
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from('data')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setFacts((facts) => facts.map((k) => (k.id === fact.id ? updatedFact[0] : k)));
  }

  return (
    <li className='fact'>
      <p>
        {isDisputed ? <span className='disputed'>[⛔️ DISPUTED]</span> : null}
        {fact.Contains}

        <a className='source' href={fact.source} target='_blank'>
          (Source)
        </a>
      </p>
      <span
        className='tag'
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className='vote-buttons'>
        <button
          onClick={() => handleVote('votesInteresting')}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote('votesMindblowing')}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}
function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  return (<header className="header">
    <div className="logo">
      <img
        src="logo.png"
        height="68"
        width="68"
        alt="Today I Learned Logo"
      />
      <h1>Today I Learned</h1>
    </div>

    <button className="btn btn-large" onClick={() => setShowForm((show) => !show)}>{showForm ? 'close' : 'share a fact'}</button>
  </header>);
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside >
      <ul>
        <li className="category">
          <button className="btn btn-all-categories" onClick={() => setCurrentCategory('all')}>All</button>
        </li>

        {CATEGORIES.map((e) => (
          <li key={e.name} className="category">
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

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function NewFactForm(setFacts, setShowForm) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textL = text.length;

  async function handleSubmit(k) {
    k.preventDefault();
    console.log(text, source, category);
    if (text && isValidHttpUrl(source) && category && textL <= 200) {
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from('data')
        .insert([{ Contains: text, source, category, votesInteresting: 0, votesMindblowing: 0, votesFalse: 0 }])
        .select();
      setIsUploading(false);

      if (!error) {
        setFacts((fact) => [newFact[0], ...fact])
        console.log("data in")
      }
      else alert('Something went wrong! Please try again. 😞')


      setText('');
      setSource('');
      setCategory('');

      setShowForm(false);
    }
  }
  return (
    <form className="fact-form" onSubmit={handleSubmit} >
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
        {CATEGORIES.map((cat) => (<option key={cat.name} value={cat.name}> {cat.name.toUpperCase()}</option>))}

      </select>
      <button className="btn btn-large" disabled={isUploading}>Post</button>
    </form>
  )
}

export default App;