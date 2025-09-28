import { useState } from "react";
import { ShapeResponse } from "../types/api";
import "./Shape.css";

interface ShapeData {
    message: 'Shape';
    data: [[number, number, number], [number, number, number], [number, number, number], [number, number, number]] | null;
}

export const Shape = () => {
    const [shapeData, setShapeData] = useState<ShapeData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUnloading, setUnloading] = useState<boolean>(false);

    const totalVisibleCells = shapeData?.data?.flat().filter(cell => cell === 1).length;
    const [queue, setQueue] = useState<[number, number][]>([]);

    console.log('queue ::: ', JSON.stringify(queue));
    console.log('totalVisibleCells ::: ', totalVisibleCells);
  
    const handleButtonClick = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/shape');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData: ShapeResponse = await response.json();
        setShapeData(responseData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        const errorMessage = error instanceof Error 
          ? `Error: ${error.message}` 
          : 'Error: Could not connect to server';
        setShapeData({ message: 'Shape', data: null });
      } finally {
        setIsLoading(false);
      }
    };

    const deselect = (queue: [number, number][]) => {
      setUnloading(true);
      const processNext = (index: number) => {
          if (index >= queue.length) {
            setUnloading(false);
            return;
          };
          
          const [row, col] = queue[index];
          console.log('Processing cell:', row, col);
          
          if (row !== undefined && col !== undefined) {
              const newShapeData = { ...shapeData } as ShapeData;
              if (newShapeData.data && newShapeData.data[row] && newShapeData.data[row][col]) {
                  newShapeData.data[row][col] = 1;
                  setShapeData(newShapeData);
              }
          }
          
          // Update queue to remove processed item
          setQueue(prevQueue => prevQueue.slice(1));
          
          // Process next item after 500ms delay
          setTimeout(() => processNext(index + 1), 500);
      };
      
      processNext(0);
    }

    const handleCellClick = (row: number, col: number) => {
        // need to know if the cell is visible or hidden 
        // need to know the index of the cell too. 
        // once it's clicked, we need to change the color to green for visible cells
        // and also log the row and column of the valid cell that was clicked
        // if the cell is hidden, we do nothing
        if (shapeData && shapeData.data && totalVisibleCells && totalVisibleCells > 1) {
            const cell = shapeData.data[row][col];
            if (cell === 0) {
                return;
            }
            if (cell === 1) {
                console.log(`Cell clicked: ${row}, ${col}`);
                // change the cell to green color and add to queue
                shapeData.data[row][col] = 2;
                setShapeData({ ...shapeData });
                setQueue([...queue, [row, col]]);
            }
        } else {
            if (totalVisibleCells === 1) {
                // we need to render the box color back to the original color
                // in the order of the queue in FIFO orders
                console.log('!!!! came here !!!!');
                deselect(queue);
            }
        }

    };
  
    return (
      <div className="shape-page">
        <div className="container">
          <h1>Shape Page</h1>
          <button 
            className="shape-button" 
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load Shape'}
          </button>
          {shapeData && shapeData.data && (
            <>
                <div className="message">
                {shapeData.message}
                </div>
                <div className="shape-table">
                {shapeData.data.map((row, rowIndex) => (
                    <div key={rowIndex} className="shape-row">
                    {row.map((cell, cellIndex) => (
                        <div 
                          key={cellIndex} 
                          className={`shape-cell ${cell === 1 ? 'visible' : cell === 2 ? 'clicked' : 'hidden'}`}
                          onClick={() => {
                            if(!isUnloading) {
                              handleCellClick(rowIndex, cellIndex)
                            }
                          }}
                        >
                        </div>
                    ))}
                    </div>
                ))}
                </div>
            </>
          )}
        </div>
      </div>
    );
};