import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'http://localhost:8000/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch users from server');
      }
      const users = await response.json();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users from server' });
    }
  } else if (req.method === 'POST') {
        try {
        const newUser = req.body;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        const createdUser = await response.json();
        res.status(201).json(createdUser); // Return the created user
        } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
