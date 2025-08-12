import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="flex gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/attendance">Attendance</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/guides">Guides</Link></li>
          <li><Link to="/examples">Examples</Link></li>
        </ul>
      </nav>
    </header>
  );
}

