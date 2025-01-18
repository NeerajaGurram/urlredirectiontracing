'use client';
import "./globals.css";
import { useState } from 'react';
import axios from 'axios';
import ResultCard from './components/resultcard';

export default function Page() {
  const [displayUrl, setDisplayUrl] = useState(""); 
  const [url, setUrl] = useState(""); 
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    setLoading(true);
    setResults(null);
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/trace`, { url });
      console.log(response.data);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const input = e.target.value.trim();
    setDisplayUrl(input); // Show the raw input in the field
  
    // Process the URL internally
    if (input.startsWith("http://")) {
      setUrl(input.replace(/^http:\/\//i, "https://"));
    } else if (!input.startsWith("https://") && input.length > 0) {
      setUrl(`https://${input}`);
    } else {
      setUrl(input); // If already valid, store as-is
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-white to-90% flex items-center justify-center p-4 py-20">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          URL Redirection Tracing & Analysis
        </h1>
        <form on onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter a URL to analyze"
          value={displayUrl} // Show the raw user input
          onChange={handleChange} // Process URL internally
          className="border border-gray-300 w-full p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
          <button
            type="submit"
            className="bg-cyan-500 text-white font-semibold p-3 rounded-md w-full hover:bg-cyan-600 hover:text-white transition"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Trace URL'}
          </button>
        </form>

        {error && (
          <div className="mt-4 bg-red-100 text-red-800 p-3 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {results && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Analysis Results
            </h2>
            <ResultCard result={results} />
          </div>
        )}
      </div>
    </div>
  );
}

// 'use client';
// import { useState } from 'react';
// import axios from 'axios';
// import ResultCard from '../components/ResultCard';

// export default function Home() {
//   const [url, setUrl] = useState('');
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/trace', { url });
//       setResults(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || 'An unexpected error occurred.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
//         <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
//           URL Redirection Tracing & Analysis
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Enter a URL to analyze"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="border border-gray-300 w-full p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white font-semibold p-3 rounded-md w-full hover:bg-blue-700 transition"
//             disabled={loading}
//           >
//             {loading ? 'Processing...' : 'Trace URL'}
//           </button>
//         </form>

//         {error && (
//           <div className="mt-4 bg-red-100 text-red-800 p-3 rounded-md">
//             <strong>Error:</strong> {error}
//           </div>
//         )}

//         {results && (
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">
//               Analysis Results
//             </h2>
//             <ResultCard result={results} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // import { useState } from 'react';
// // import axios from 'axios';
// // import ResultCard from '../components/ResultCard';

// // export default function Home() {
// //   const [url, setUrl] = useState('');
// //   const [results, setResults] = useState(null);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://localhost:5000/trace', { url });
// //       console.log(response.data);
// //       setResults(response.data);
// //     } catch (error) {
// //       console.error("Error fetching data", error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
// //         <h1 className="text-2xl font-bold text-center mb-4">URL Redirection Tracing</h1>
// //         <form onSubmit={handleSubmit} className="mb-4">
// //           <input
// //             type="text"
// //             placeholder="Enter URL"
// //             value={url}
// //             onChange={(e) => setUrl(e.target.value)}
// //             className="border w-full p-2 rounded-md"
// //             required
// //           />
// //           <button
// //             type="submit"
// //             className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full"
// //           >
// //             Trace URL
// //           </button>
// //         </form>

// //         {results && <ResultCard result={results} />}
// //       </div>
// //     </div>
// //   );
// // }
