import './app.css';

function App() {
  return (
    <>
      <div className="flex flex-row justify-between items-center border-solid border-[1px] max-h-[40px] min-h-[40px]" id="top-bar">
        <h1 className="text-sky-400">Hello demo-03</h1>
      </div>
      <div id="app-space" className="flex-1 overflow-hidden text-slate-400 border-solid border-[1px] mt-[-1px]  min-h-[600px]">
        App Space
      </div>
      <div
        id="bottom-bar"
        className="bg-slate-800 flex flex-row justify-center flex-1 text-slate-400 items-stretch border-solid border-[1px] max-h-[40px]  mt-[-1px]"
      >
        bottom bar
      </div>
    </>
  );
}

export default App;
