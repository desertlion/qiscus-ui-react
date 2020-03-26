import React from 'react';
import { useObserver } from 'mobx-react';
import QiscusContext from '../QiscusContext';
import Loader from './Loader';

const Comments = () => {
    const qiscus = React.useContext(QiscusContext);
    return useObserver(() => (
        <div className="qcw-comments">
            <h3>
                <span onClick={() => {
                    qiscus.setPage('rooms');
                    qiscus.activeComments = [];
                }}>&larr;</span>
                <div>{qiscus.activeRoom ? qiscus.activeRoom.name : ''}</div>
                {qiscus.isLoadingRoom ? <Loader /> : ''}
            </h3>
            <ul className="qcw-rooms-list">
                {qiscus.activeComments.map(comment => (
                    <li key={`cmt-${comment.unique_id}`}>
                        {comment.message}
                    </li>
                ))}
            </ul>
        </div>
    ));
}
export default Comments;