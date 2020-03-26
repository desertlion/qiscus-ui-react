import React, { useState, useEffect, useContext } from 'react';
import { useObserver } from 'mobx-react';
import QiscusContext from './QiscusContext';
import Loader from './components/Loader';
import Page from './components/Page';
import Comments from './components/Comments';
import './App.css';

const App = () => {
  const qiscus = useContext(QiscusContext);
  useEffect(() => {
    qiscus.core.init({
      AppId: 'sdksample',
      options: {
        loginSuccessCallback: (data) => {
          console.log('login successfull', data);
          // set needed parameter
          qiscus.setUserData(data);
          qiscus.setLoginStatus(true);
          // load rooms by this user
          qiscus.loadRooms();
        }
      }
    });
    qiscus.core.setUser('fikri@qiscus.com','password','Fikri (Qiscus)');
  }, []);

  const displayContent = () => {
    if(!qiscus.isLogin) return <Loader />
    if(qiscus.page == 'rooms') return <Page />
    return <Comments />
  }

  return useObserver(() => (
    <div className="qcw-container">
      {displayContent()}
    </div>
  ));
};

export default App;
