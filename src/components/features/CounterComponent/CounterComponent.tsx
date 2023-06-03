import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const CounterComponent = () => {
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:4000'); // Замените URL на ваш серверный URL

    socket.on('sessionCount', (count) => {
      setSessionCount(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>
        Количество активных сессий:
        {sessionCount}
      </h1>
    </div>
  );
};

export default CounterComponent;
