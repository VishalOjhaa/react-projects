import { useCallback, useState, useEffect,useRef } from "react";

import "./App.css";

function App() {
  const passwordRef = useRef(null);
  const [length, setlength] = useState(8);
  const [password, setPassword] = useState("");
  const [isNumberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const generatePassword = useCallback(() => {
    var pass="";
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(isNumberAllowed) str+="0123456789"
    if(charAllowed) str+= "!@#$%^&*-_+=[]{}~`";
    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length+1 );
      pass+=str.charAt(char);
    }
    setPassword(pass);
  }, [
    length,
    isNumberAllowed,
    charAllowed
  ]);

  useEffect(()=>{
    generatePassword()
  },[length,isNumberAllowed,charAllowed,generatePassword])

  const copyPassword = ()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();

  }
  return (
    <>
      <div>
        <p className="bg-red-500 text-center">Password Generator</p>
        <h1 className=" animate-bounce mt-20 text-center mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">
        Customize your <span className="text-blue-900">password</span>:
      </h1>
        <div className="text-center mt-10">
          <label htmlFor="range" className=" text-xl">
            Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            name=""
            id=""
            placeholder="password"
            className="ml-2 cursor-pointer"
            onChange={(e) => setlength(e.target.value)}
          />

          <label className="ml-4 text-xl" htmlFor="number">
            Number Allowed?
          </label>
          <input
            className="ml-1 accent-blue-950"
            type="checkbox"
            name=""
            id=""
            defaultChecked={isNumberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />

          <label className="ml-4  text-xl" htmlFor="number">
            Special Characters Allowed?
          </label>
          <input
            className="ml-1  accent-blue-950"
            type="checkbox"
            name=""
            id=""
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <div className="text-center mt-5">
            <input
              className="w-"
              type="text"
              value={password}
              name="password"
              ref={passwordRef}
              id=""
              readOnly
            />
            <button onClick={copyPassword} className="ml-2 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
              Copy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
