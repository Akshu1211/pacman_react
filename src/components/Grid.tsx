import React, { FC, useState, Fragment } from "react";

const ROWS = 31;
const COLUMNS = 28;

export const GridWithHoverCoordinates: FC<{
  x: number;
  y: number;
}> = ({ x, y }) => {
  const [coordinates, setCoordinates] = useState<number[] | null>(null);
  return (
    <Fragment>
      <Grid x={x} y={y} onHover={setCoordinates} />
      <div
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y + ROWS * 24 + 8}px`,
          height: "20px"
        }}
      >
        {coordinates && `${coordinates[0]} / ${coordinates[1]}`} &nbsp;
      </div>
    </Fragment>
  );
};

export const Grid: FC<{
  x: number;
  y: number;
  onHover: (coordinates: number[] | null) => void;
}> = ({ x, y, onHover }) => {
  return (
    <div
      className={"Grid"}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        gridTemplateColumns: `repeat(${COLUMNS}, 24px)`,
        gridTemplateRows: `repeat(${ROWS}, 24PX)`
      }}
    >
      {Array(ROWS)
        .fill(null)
        .map((_, rowIndex) =>
          Array(COLUMNS)
            .fill(null)
            .map((_, columnIndex) => (
              <div
                className="GridCell"
                key={`${columnIndex}/${rowIndex}`}
                onMouseEnter={() => onHover([columnIndex, rowIndex])}
                onMouseLeave={() => onHover(null)}
              />
            ))
        )}
    </div>
  );
};