'use client';

import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 max-w-screen h-screen p-6 flex flex-col justify-between items-center">
        <div className="flex flex-col justify-center items-center flex-grow">
          <button
            className="btn btn-outline m-10 py-10 w-100"
            onClick={() => router.push('/form')}
          >
            <h3 className="text-xl text-white">New User Form</h3>
          </button>
          <button
            className="btn btn-outline m-10 py-10 w-100"
            onClick={() => router.push('/users')}
          >
            <h3 className="text-xl text-white">Users List</h3>
          </button>
        </div>
      </div>

  );
}

export default Home;
