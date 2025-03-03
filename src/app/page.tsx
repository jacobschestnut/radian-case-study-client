'use client';

import { useState } from "react";

const Home = () => {
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValidEmail(null);
  };

  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/email-validation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      setLoading(true)

      if (res.ok) {
        setIsValidEmail(data?.data?.status === 'valid');
      } else {
        console.log(data.error || 'Email validation failed');
        setIsValidEmail(false);
      }
    } catch (error) {
      console.log('Error occurred while validating the email:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={verifyEmail} className="space-y-4">

        <div className="flex flex-row">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              required
              className="input input-bordered w-full"
              placeholder=""
            />
          </div>
          
          <div className="pl-4">
            <label htmlFor="middleInitial" className="text-sm font-medium">Middle Initial</label>
            <input
              id="middleInitial"
              type="text"
              name="middleInitial"
              required
              className="input input-bordered w-full"
              placeholder=""
            />
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            required
            className="input input-bordered w-full"
            placeholder=""
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            className={`input input-bordered w-full ${isValidEmail === null ? '' : (isValidEmail === false ? 'input-error' : 'input-success')}`}
            placeholder="Enter your email"
          />
        </div>

        {isValidEmail === false && (
          <div className="text-sm text-red-500 mt-2">
            Invalid email address.
          </div>
        )}

        <div className="flex flex-col items-start">
          <label htmlFor="dob" className="text-sm font-medium">Date of Birth</label>
          <input 
            type="date" 
            id="dob" 
            name="dob"
            required 
            className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-full">Submit</button>
        </div>
      </form>
    </div>
  )
} 

export default Home;