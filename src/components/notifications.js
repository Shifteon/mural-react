import React from "react";
import { FaRegTimesCircle } from 'react-icons/fa';

export default () => {
  const [notifications, setNotifications] = React.useState([]);
  const [currentKey, setCurrentKey] = React.useState(0);

  const Notifications = () => {
    const closeNotif = (key) => {
      setNotifications(notifications.filter(n => n.key !== key));
    };
  
    return (
      <>
        {notifications.map(n => {
          return (
            <div className="notification" key={n.key}>
              <p className={n.status}>{n.text}</p>
              <FaRegTimesCircle className="close" onClick={closeNotif(n.key)} />
            </div>
          );
        })
        }
      </>
    )
  };

  const addNotification = (n) => {
    const notification = {
      ...n,
      key: currentKey
    };
    setCurrentKey(currentKey + 1);

    setNotifications([...notifications, notification]);
    console.log(notifications);
  };

  return [Notifications, addNotification];
};
