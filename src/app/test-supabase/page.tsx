'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function TestSupabase() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .limit(1);

        if (error) {
          setError(error.message);
        } else {
          setIsConnected(true);
        }
      } catch (err) {
        setError('Connection failed');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      {isConnected ? (
        <div className="text-green-600 font-medium">
          ✅ Supabase connected successfully!
        </div>
      ) : (
        <div className="text-red-600 font-medium">
          ❌ Connection failed: {error}
        </div>
      )}
    </div>
  );
}
