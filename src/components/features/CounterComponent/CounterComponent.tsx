import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const CounterComponent: React.FC = () => {
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    const socket = io('https://demien92.github.io/dzencode_test_react/#/orders');

    socket.on('sessionCount', (count: number) => {
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
        {' '}
        {sessionCount}
      </h1>
    </div>
  );
};

export default CounterComponent;
