import { useState , useCallback ,useEffect,useRef} from "react"
function App() {

  const [length , setLength] = useState(10)
  const [isNumberAllowed,setIsNumberAllowed] = useState(false);
   const [isCharAllowed,setIsCharAllowed] = useState(false);
   const [isSymbolAllowed,setIsSymbolAllowed] = useState(false);
   const [password,setPassword] = useState("");

const passwordRef = useRef(null);

   const Passwordgenerator = useCallback(() => {
  
     const lowerCase = "abcdefghijklmnopqrstuvwxyz";
     const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
     const numbers = "0123456789";
     const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
     let charSet = lowerCase;

     if (isCharAllowed) {
       charSet += upperCase;
     }
     if (isNumberAllowed) {
       charSet += numbers;
     }
     if (isSymbolAllowed) {
       charSet += symbols;
     }

     let Pass = "";
     for (let i = 0; i < length; i++) {
       const charIndex = Math.floor(Math.random() * charSet.length );
       Pass += charSet[charIndex];
     }
     setPassword(Pass);
   }, [length, isNumberAllowed, isCharAllowed, isSymbolAllowed]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.focus();
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

 useEffect(() => {
   Passwordgenerator();
 }, [isNumberAllowed, isCharAllowed, length, Passwordgenerator]);

  return (
    <>
   <div className="w-full max-w-md mx-auto shadow-md bg-gray-600 rounded-xl my-8 text-orange-400 px-4 py-3">
      <h1 className="text-2xl font-bold text-center text-white my-3 mb-4">Password Generator</h1>
     <div className="flex rounded-xl shadow-md overflow-hidden mb-4">
      <input type="text" value={password} className="flex-1 py-1 px-3 w-full outline-none"
      placeholder="Generated Password"
      readOnly
      style={{ backgroundColor: "white" }}
      ref={passwordRef}
     />
     <button
       className="bg-orange-500 text-white outline-none shrink-0 py-1 px-3 rounded-r-xl"
       onClick={copyToClipboard}
     >
       Copy
     </button>
</div>

     <div className="flex text-sm gap-x-2">
      <div className=" flex items-center gap-x-1">
        <input type="range" min="10" max="80" value={length} className="cursor-pointer" onChange={(e) => setLength(e.target.value)} />
        <label htmlFor="length">Length:{length}</label>
      </div>
       <div className=" flex items-center gap-x-1">
        <input id="number" type="checkbox" defaultChecked={isNumberAllowed} onChange={() => setIsNumberAllowed((prev) => !prev)} />
        <label htmlFor="number">Numbers</label>
       </div>
       <div className=" flex items-center gap-x-1">
        <input id="char" type="checkbox" defaultChecked={isCharAllowed} onChange={() => setIsCharAllowed((prev) => !prev)} />
        <label htmlFor="char">Characters</label>
       </div>
     </div>
     </div>
   

    </>
  )
}

export default App
