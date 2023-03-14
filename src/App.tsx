import React from 'react';
import repos from "./assets/repos.json"

export const App = () => {
  return (
    <div className="App">
        <p>
          {repos.map(r => <span>{r.name}</span>)}
        </p>
    </div>
  );
}
