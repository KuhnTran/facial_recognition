import React from 'react';
import './App.css';
import 'tachyons'; 
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import NaviBar from './components/NaviBar.js';
import BrainIcon from './components/BrainIcon.js';
import Ranking from './components/Home/Ranking.js';
import SearchBox from './components/Home/SearchBox.js';
import ImageResult from './components/Home/ImageResult.js';
import Signin from './components/Accounts/Signin.js';
import Register from './components/Accounts/Register.js';

const app = new Clarifai.App({apiKey: '78e31c188b5743be9e43f5e9ff672684'});

const particleParam = {
  particles: {
    number: {
      value: 120
    }
  }
}

function App() {
  const [input, setInput] = React.useState('');
  const [imageLink, setImageLink] = React.useState('');
  const [faces, setFaces] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState('Signin');
  const [currentUser, setCurrentUser] = React.useState({
    id: '',
    name: '',
    email: '',
    count: 0,
    date: Date.parse('01 Jan 1970 00:00:00 GMT'),
  });

  const onAccountChange = (newUser) =>
  {
    setCurrentUser(newUser);
    setImageLink('');
    setFaces([]);
  }

  const onInputChange = (event) =>
  {
    setInput(event.target.value);
  }

  const calculateFaceLocations = (responseFromServer, imgHeight, imgWidth) =>
  {
    return {
      left: responseFromServer.left_col*imgWidth,
      right: imgWidth - responseFromServer.right_col*imgWidth,
      top: responseFromServer.top_row*imgHeight,
      bottom: imgHeight - responseFromServer.bottom_row*imgHeight,
    }
  }

  const onSearchClick = () =>
  {
    setImageLink(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(response => {
      var img = document.getElementById('resultImg');
      setFaces(response.outputs[0].data.regions.map(
        (item)=>calculateFaceLocations(item.region_info.bounding_box,
            img.offsetHeight, img.offsetWidth)));

      fetch('https://sheltered-depths-20030.herokuapp.com/update/',
        {
          method: 'PUT',
          mode: 'cors',
          cache: 'no-cache',
          headers: { 'Content-Type':'application/JSON' },
          body: JSON.stringify({id: currentUser.id}),
        }).then(response=>response.json())
        .then(data=>setCurrentUser(
          {
          ...currentUser,
          count: data.newCount,
          }
        ))
        .catch(error=>console.log(error));
    })
    .catch(error => {
      console.log(error);
    });
  }

  const changeRoute = (newRoute) =>
  {
    setCurrentPage(newRoute);
  }

  return (
    <div>
      <Particles params={particleParam} className='particle'/>
      <NaviBar currentPage={currentPage} 
        changeRoute={changeRoute}
        accountChange={onAccountChange}/>
      <BrainIcon/>
      {(currentPage === 'Signin') ? 
        <Signin changeRoute={changeRoute}
          accountChange={onAccountChange}/> :
          (currentPage ==='Home') ?
            <div>
              <Ranking currentUser={currentUser}/>
              <SearchBox onInputChange={onInputChange} 
                onSearchClick={onSearchClick}/>
              <ImageResult imageLink={imageLink} 
                faceLocations={faces}/>
            </div> :
          <div>
            <Register changeRoute={changeRoute}
              accountChange={onAccountChange}/>
          </div>
      }   
    </div>
  
  );
}

export default App;
