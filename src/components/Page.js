import React from 'react';
import { useObserver } from 'mobx-react';
import QiscusContext from '../QiscusContext';

const Page = () => {
    const qiscus = React.useContext(QiscusContext);
    return useObserver(() => (
        <div className="qcw-rooms">
            <h3>Available Rooms</h3>
            <ul className="qcw-rooms-list">
                {qiscus.rooms.map(room => (
                    <li key={room.id}
                        onClick={() => qiscus.changeRoom(room.id)}>
                        {room.room_name}
                    </li>
                ))}
            </ul>
        </div>
    ));
}
export default Page;