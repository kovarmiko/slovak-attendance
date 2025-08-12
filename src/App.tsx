import { Routes, Route } from 'react-router-dom';
import Attendance from './Attendance';
import About from './About';
import Guides from './Guides';
import Examples from './Examples';
import Landing from './Landing';
import Layout from './Layout';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/about" element={<About />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/examples" element={<Examples />} />
      </Route>
    </Routes>
  );
}

