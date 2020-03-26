import React from 'react';
import ReactDOM from 'react-dom';
import { useLocalStore } from 'mobx-react';
import QiscusSDK from 'qiscus-sdk-core';
import './index.css';
import App from './App';
import QiscusContext from './QiscusContext';
import * as serviceWorker from './serviceWorker';

if(!document.getElementById('qiscus-widget'))
  document.body.insertAdjacentHTML('beforeend', '<div id="qiscus-widget"></div>');

// this is the code to store our loaded rooms, so we don't need
// to see loading screen again and again
let ls = localStorage.getItem('qiscus-data');
let localQiscusData = {};
if(ls) localQiscusData = JSON.parse(ls);
const StoreProvider = ({children}) => {
  const store = useLocalStore(() => ({
    core: new QiscusSDK(),
    userData: null,
    isLogin: false,
    rooms: [],
    activeComments: [],
    activeRoom: null,
    localRooms: localQiscusData,
    isLoadingRoom: false,
    page: 'rooms',
    setRooms(rooms) { store.rooms = rooms; },
    setActiveRoom(room) { store.activeRoom = room; },
    setActiveComments(comments) { if(comments.length) store.activeComments = comments },
    setUserData(data) { store.userData = data; },
    setLoginStatus(status) { store.isLogin = status; },
    setPage(page) {
      if(page == 'rooms') store.setActiveComments = [];
      store.page = page;
    },
    changeRoom(roomId) {
      store.isLoadingRoom = true;
      store.setPage('comments');
      // first we check our local storage
      // if the room is already loaded, let's load all available comments first
      if(store.localRooms[roomId]) {
        store.setActiveRoom(store.localRooms[roomId]);
        store.activeComments = store.localRooms[roomId].comments;
      }
      // then we call the API for more reliability, at least user didn't have to wait this api
      // to finish first, they'll see the local data first
      store.core.getRoomById(roomId).then(res => {
        store.activeComments = res.comments;
        store.setActiveRoom(res);
        store.updateLocalQiscusData(roomId, res);
        store.isLoadingRoom = false;
      });
    },
    loadRooms() { store.core.userAdapter.loadRoomList().then(res => store.setRooms(res)) },
    updateLocalQiscusData(roomId, data) { 
      store.localRooms[roomId] = data;
      // let's also update the local storage
      localStorage.setItem('qiscus-data', JSON.stringify(store.localRooms));
    }
  }));
  return <QiscusContext.Provider value={store}>{children}</QiscusContext.Provider> 
}
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('qiscus-widget')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
