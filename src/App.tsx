const App = () => {
  return (
    <div>
      <header>
        <h2>The fellowship of the tretton37</h2>
      </header>
      <main>
        <p>Server defined at: {process.env.REACT_APP_SERVER}</p>
      </main>
    </div>
  );
};

export default App;
