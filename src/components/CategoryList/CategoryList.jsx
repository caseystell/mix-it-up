import './CategoryList.css';

export default function CategoryList({ categories, activeCat, setActiveCat }) {
  const cats = categories.map(cat =>
    <li
      key={cat}
      className={cat === activeCat ? 'active' : ''}
      onClick={() => setActiveCat(cat)}
    >
      {cat}
    </li>
  );
  console.log(`These are my categories: ${cats}`)
  return (
    <ul className="CategoryList">
      {cats}
    </ul>
  );
}