import React, { useEffect, useState } from 'react'

const SchulteTable = () => {

  const[boardSize , setBoardSize] = useState(5);

  const fetchNewPuzzle = async (forcedSize) => {
    try {
      const cleanSize = (forcedSize && typeof forcedSize === 'number') ? forcedSize : boardSize;
      
      const response = await fetch('http://localhost:8080/api/games', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetNewGame {
              newSchulteTable(size: ${cleanSize}) {
                schulteBoard
                message
              }
            }
          `
        })
      });

      const result = await response.json(); 

      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message);
      }
      
      if(!result.data || !result.data.newSchulteTable){
        throw new Error("Empty response or missing puzzle fields from server payload.");
      }
      const graphQlPayload = result.data;

      const apiGrid = graphQlPayload.newSchulteTable.schulteBoard;

    } catch (error) {
      console.error("Failed to fetch puzzle:", error);
      alert("Whoops! Couldn't get a new puzzle. Try again.");
    }
  }

  useEffect(() => {
    fetchNewPuzzle(5);
  },[]);

  return (
    <div className="h-screen w-screen max-w-full overflow-hidden flex items-center justify-center p-4 sm:p-8 bg-base-100 text-base-content select-none font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-6 sm:gap-12 w-full max-w-[340px] sm:max-w-none sm:w-auto">
          hello
        </div>
    </div>
  )
}

export default SchulteTable