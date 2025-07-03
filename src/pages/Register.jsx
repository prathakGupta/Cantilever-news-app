import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Register(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try{
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Registered");
      navigate("/");
    }
    catch(error){
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="font-bold text-2xl md-6 text-center">Register</h2>

        <label className="font-medium block mb-2 text-sm text-gray-700">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full mb-4 p-2 border border-gray-300 rounded" />
        <label className="font-medium block mb-2 text-sm text-gray-700">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full mb-6 p-2 border border-gray-300 rounded" />

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"> Register </button>

      </form>
    </div>
  )

}