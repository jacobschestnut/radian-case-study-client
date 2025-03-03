'use client';

import { BlockList } from "net";
import { useState, useEffect } from "react";

const Home = () => {
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);

  const [address, setAddress] = useState<string>('');
  const [autofillData, setAutofillData] = useState<any[]>([]);
  const [addressFocused, setAddressFocused] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValidEmail(null);
  };

  const verifyEmail = async (email: string) => {
    if (emailFocused) return;

    try {
      const res = await fetch('/api/email-validation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsValidEmail(data?.data?.status === 'valid');
      } else {
        console.log(data.error || 'Email validation failed');
        setIsValidEmail(false);
      }
    } catch (error) {
      console.log('Error occurred while validating the email:', error);
    }
  };

  useEffect(() => {
    if (email && !emailFocused) {
      verifyEmail(email);
    }
  }, [email, emailFocused]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const fetchAutofillAddress = async (address: string) => {
    if (!addressFocused) return;

    try {
      const res = await fetch('/api/address-autofill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      const data = await res.json();

      if (res.ok && data?.features) {
        setAutofillData(data.features);
      } else {
        setAutofillData([]);
      }
    } catch (error) {
      console.log('Error occurred while fetching address autofill:', error);
      setAutofillData([]);
    }
  };

  useEffect(() => {
    if (address.trim() && addressFocused) {
      fetchAutofillAddress(address);
    }
  }, [address, addressFocused]);

  const handleAutofillSelection = (selectedAddress: any) => {
    if (selectedAddress?.properties.formatted) {
      setAddress(selectedAddress.properties.formatted);
    }
    setAutofillData([]);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form className="space-y-4">
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
              maxLength={1}
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
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
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
            className="mt-2 p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div>
          <label htmlFor="address" className="text-sm font-medium">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={address}
            onChange={handleAddressChange}
            onFocus={() => setAddressFocused(true)}
            onBlur={() => setAddressFocused(false)}
            required
            className="input input-bordered w-full"
            placeholder="Enter your address"
          />
          <div className="mt-2">
            {autofillData.length > 0 && (
              <ul className="list bg-base-200 rounded-box shadow-md">
                {autofillData.map((addressItem, index) => (
                  <li
                    key={index}
                    onClick={() => handleAutofillSelection(addressItem)}
                    className="list-row text-xs cursor-pointer hover:bg-blue-700"
                  >
                    {addressItem.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
