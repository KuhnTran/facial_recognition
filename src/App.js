import React from 'react';
import './App.css';
import 'tachyons'; 
import Particles from 'react-particles-js';
import NaviBar from './components/NaviBar.js';
import BrainIcon from './components/BrainIcon.js';
import Ranking from './components/Home/Ranking.js';
import SearchBox from './components/Home/SearchBox.js';
import ImageResult from './components/Home/ImageResult.js';
import Signin from './components/Accounts/Signin.js';
import Register from './components/Accounts/Register.js';
import LoadingCircle from './components/General/LoadingCircle.js'

const particleParam = {
  particles: {
    number: {
      value: 120
    }
  }
}

const backendAddress = 'https://sheltered-depths-20030.herokuapp.com/';

const defaultUser = {
  id: '',
  name: '',
  email: '',
  count: 0,
  date: Date.parse('01 Jan 1970 00:00:00 GMT'),
}

function App() {
  const [input, setInput] = React.useState('');
  const [imageLink, setImageLink] = React.useState('');
  const [faces, setFaces] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState('Signin');
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const [processingImage, setProcessingImage] = React.useState(false);

  const determineRoute = () =>
  {
    switch(currentPage)
    {
      case 'Register': 
        return (
        <div>
          <Register changeRoute={changeRoute}
          accountChange={onAccountChange}
          backendAddress={backendAddress}/>
        </div>);
       
      case 'Home':
        return (<div>
            <Ranking currentUser={currentUser}/>
            <SearchBox onInputChange={onInputChange} 
              onSearchClick={onSearchClick}/>
            {(processingImage) ? <div className="flex center">
              <LoadingCircle/></div> : <div/>}
            <ImageResult imageLink={imageLink} 
              faceLocations={faces}
              setProcessingImage={setProcessingImage}/>
          </div>);

      case 'LoadingUser':
        return (
          <div className="flex center">
              <LoadingCircle/>
          </div>
        );

      default:
        return (<Signin changeRoute={changeRoute}
        accountChange={onAccountChange}
        backendAddress={backendAddress}/>);
    }
  }

  const changeRoute = (newRoute) => {
    setCurrentPage(newRoute);
  }

  const onAccountChange = (newUser) => {
    setCurrentUser(newUser);
    setImageLink('');
    setFaces([]);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const calculateFaceLocations = (responseFromServer, imgHeight, imgWidth) => {
    return {
      left: responseFromServer.left_col*imgWidth,
      right: imgWidth - responseFromServer.right_col*imgWidth,
      top: responseFromServer.top_row*imgHeight,
      bottom: imgHeight - responseFromServer.bottom_row*imgHeight,
    }
  }
  

  const onSearchClick = () => {
    setProcessingImage(true);
    setImageLink(input);
    setFaces([]);

    fetch(backendAddress + 'update/',
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type':'application/JSON' },
        body: JSON.stringify(
          {
            id: currentUser.id,
            imageLink: input,
          }),
      }).then(response=>response.json())
      .then(data=>
        {
          var img = document.getElementById('resultImg');
          setFaces(data.regions.map((item)=>
              calculateFaceLocations(item.region_info.bounding_box,
            img.offsetHeight, img.offsetWidth)));
          setCurrentUser(
            {
              ...currentUser,
              count: data.newCount,
            })
        }
      )
      .catch(error=>console.log(error));
    }
  

  return (
    <div>
      <Particles params={particleParam} className='particle'/>
      <NaviBar currentPage={currentPage} 
        changeRoute={changeRoute}
        accountChange={onAccountChange}
        defaultUser={defaultUser}/>
      <BrainIcon/>
      {determineRoute()}
    </div>
  
  );
}

export default App;
