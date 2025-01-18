export default function ResultCard({ result }) {
  if (!result) {
    return <div>Error: No result data available.</div>;
  }

  if (result.status_code !== 200) {
    console.log(result.status_code);
    return (
      <div className="p-6 rounded-lg shadow-lg bg-gray-200">
        <h3 className="text-lg font-bold text-gray-800">Error</h3>
        <p className="text-gray-700">Unable to retrieve details.</p>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg shadow-lg ${result.is_piracy ? 'bg-red-200' : 'bg-green-200'}`}>
      <h3 className="text-lg font-bold text-gray-800">Final URL</h3>
      <a href={result.final_url} className="text-blue-600 break-words">{result.final_url}</a>

      <h3 className="text-lg font-bold text-gray-800 mt-4">Status Code</h3>
      <p className="text-gray-700">{result.status_code}</p>

      <h3 className="text-lg font-bold text-gray-800 mt-4">Title</h3>
      <p className="text-gray-700">{result.title || 'N/A'}</p>

      <h3 className="text-lg font-bold text-gray-800 mt-4">Description</h3>
      <p className="text-gray-700">{result.description || 'N/A'}</p>

      <h3 className="text-lg font-bold text-gray-800 mt-4">Is Piracy</h3>
      <p
        className={`text-lg font-bold ${
          result.is_piracy ? 'text-red-600' : 'text-green-600'
        }`}
      >
        {result.is_piracy ? 'Yes' : 'No'}
      </p>

      <h3 className="text-lg font-bold text-gray-800 mt-4">Probability</h3>
      <p className="text-gray-700">{(result.probability * 100).toFixed(2)}%</p>

      {/* {result.copyright_info && (
        <>
          <h3 className="text-lg font-bold text-gray-800 mt-4">Copyright Info</h3>
          <p className="text-gray-700">{result.copyright_info}</p>
        </>
      )} */}

      {result.outbound_links && result.outbound_links.length > 0 && (
        <>
          <h3 className="text-lg font-bold text-gray-800 mt-4">Outbound Links</h3>
          <div className="text-wrap w-xl">
            <ul className="list-disc ml-5 text-blue-600">
              {result.outbound_links.map((link, index) => (
                <li key={index} className="break-words">
                  <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline text-wrap">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

// export default function ResultCard({ result }) {
//     return (
//       <div className={`p-6 rounded-lg shadow-lg ${result.is_piracy ? 'bg-red-200' : 'bg-green-200'}`}>
//         <h3 className="text-lg font-bold text-gray-800">Final URL</h3>
//         <a href={result.final_url} className="text-blue-600 break-words">{result.final_url}</a>
  
//         <h3 className="text-lg font-bold text-gray-800 mt-4">Status Code</h3>
//         <p className="text-gray-700">{result.status_code}</p>
  
//         <h3 className="text-lg font-bold text-gray-800 mt-4">Title</h3>
//         <p className="text-gray-700">{result.title || 'N/A'}</p>
  
//         <h3 className="text-lg font-bold text-gray-800 mt-4">Description</h3>
//         <p className="text-gray-700">{result.description || 'N/A'}</p>
  
//         <h3 className="text-lg font-bold text-gray-800 mt-4">Is Piracy</h3>
//         <p
//           className={`text-lg font-bold ${
//             result.is_piracy ? 'text-red-600' : 'text-green-600'
//           }`}
//         >
//           {result.is_piracy ? 'Yes' : 'No'}
//         </p>
  
//         <h3 className="text-lg font-bold text-gray-800 mt-4">Probability</h3>
//         <p className="text-gray-700">{(result.probability * 100).toFixed(2)}%</p>
  
//         {result.copyright_info && (
//           <>
//             <h3 className="text-lg font-bold text-gray-800 mt-4">Copyright Info</h3>
//             <p className="text-gray-700">{result.copyright_info}</p>
//           </>
//         )}
  
//         {result.outbound_links && result.outbound_links.length > 0 && (
//         <>
//           <h3 className="text-lg font-bold text-gray-800 mt-4">Outbound Links</h3>
//           <div className="text-wrap w-xl">
//             <ul className="list-disc ml-5 text-blue-600">
//               {result.outbound_links.map((link, index) => (
//                 <li key={index} className="break-words">
//                   <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline text-wrap">
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}

//       </div>
//     );
//   }
  
