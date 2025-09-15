'use client';

import { useEffect, useState } from 'react';

export default function SimpleTest() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const test = async () => {
      try {
        const response = await fetch(
          'https://jrifwswnwbextznqaclm.supabase.co/rest/v1/projects?select=*&limit=1',
          {
            headers: {
              apikey:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyaWZ3c3dud2JleHR6bnFhY2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNjQ3NDYsImV4cCI6MjA3MjY0MDc0Nn0.w4co7exaHzwvlZca2-nJQ2FhQ4LEr-vQ2G9UtcitTu4',
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStatus(`Success! Found ${data.length} projects`);
        } else {
          setStatus(`Error: ${response.status}`);
        }
      } catch (err) {
        setStatus(`Error: ${err}`);
      }
    };

    test();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Simple Test</h2>
      <div>Status: {status}</div>
    </div>
  );
}
