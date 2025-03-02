// pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'http://localhost:8000/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user with ID ${id}`);
      }
      const user = await response.json();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch user with ID ${id}` });
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete user with ID ${id}`);
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: `Failed to delete user with ID ${id}` });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
