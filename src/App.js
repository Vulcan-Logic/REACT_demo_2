/* 
    Project: REACT Demo for Education Horizons Group
    Sprint: 1
    Task: 1
    Author: Vineet W. Singh 
    Start Date: 22/4/21
    Date of last edit: 23/4/2021
    Date of last review:
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Header, MainSection, Footer} from './components';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
};

export default App;
