'use client';

import TierCard from "@/components/TierCard";
import { useState, useEffect } from "react";

const Form = () => {
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);

  const [address, setAddress] = useState<string>('');
  const [autofillData, setAutofillData] = useState<any[]>([]);
  const [addressFocused, setAddressFocused] = useState<boolean>(false);

  const tierOptions = ['Low', 'Medium', 'High'];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [subscriptionType, setSubscriptionType] = useState<string>("monthly");

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

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubscriptionType(e.target.value);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form className="space-y-4 bg-base-200 p-6 rounded-md">
        <h2 className="text-3xl font-bold">Basic Info</h2>
        <div className="divider"></div>

        <div className="flex flex-row">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              required
              className="input input-bordered w-full"
              placeholder="Enter your first name"
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
              placeholder="Enter your middle initial"
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
            placeholder="Enter your last name"
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
            className="mt-1 p-2 input w-32 rounded-md shadow-sm focus:ring-2 focus:input-bordered" 
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
                    className="list-row text-xs cursor-pointer hover:bg-blue-600"
                  >
                    {addressItem.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-6">Select Tier</h2>
        <div className="divider"></div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tierOptions.map((option) => (
            <TierCard
              key={option}
              value={option}
              selected={selectedOption === option}
              onClick={handleSelect}
            />
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-6">Billing Options</h2>
        <div className="divider"></div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="monthly"
              name="subscription"
              value="monthly"
              checked={subscriptionType === "monthly"}
              onChange={handleChange}
              className="radio"
            />
            <label htmlFor="monthly" className="text-xl font-semibold">
              Monthly
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="annual"
              name="subscription"
              value="annual"
              checked={subscriptionType === "annual"}
              onChange={handleChange}
              className="radio"
            />
            <label htmlFor="annual" className="text-xl font-semibold">
              Annual
            </label>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center">
          <button type="submit" className="btn btn-success w-full">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
