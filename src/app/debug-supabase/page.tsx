'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function DebugSupabase() {
  const [status, setStatus] = useState('Loading...');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const testSupabase = async () => {
      try {
        console.log('Testing Supabase connection...');
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log(
          'Supabase Key:',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing'
        );

        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .limit(1);

        if (error) {
          console.error('Supabase Error:', error);
          setStatus(`Error: ${error.message}`);
        } else {
          console.log('Supabase Success:', data);
          setStatus('Success!');
          setData(data);
        }
      } catch (err) {
        console.error('Connection Error:', err);
        setStatus(`Connection Error: ${err}`);
      }
    };

    testSupabase();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Supabase Debug</h2>
      <div className="mb-4">
        <strong>Status:</strong> {status}
      </div>
      <div className="mb-4">
        <strong>Environment Variables:</strong>
        <div>
          URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Present' : 'Missing'}
        </div>
        <div>
          Key:{' '}
          {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing'}
        </div>
      </div>
      {data && (
        <div>
          <strong>Data:</strong>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
