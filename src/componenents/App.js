import React, {useState, useEffect} from 'react'
import Matter from "matter-js";
import randomColor from 'randomcolor'; // import the script
import NavBar from './NavBar';
// const color = randomColor(); // a hex code for an attractive color

export default function App() {
  const [bool, setBool] = useState(false)
  const [wallColor, setWallColor] = useState(randomColor())
  const [backGroundColor, setBackgrundColor] = useState(randomColor())

  const [cells, setCells] = useState({horizontal:14, vertical:10})
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const [grid, setGrid] = useState(Array(cells.vertical).fill(null).map(() => Array(cells.horizontal).fill(false)))
  const [unitLengthX, setUnitXLength] = useState(width / cells.horizontal)
  const [unitLengthY, setUnitLengthY] = useState(height / cells.vertical)

  const verticals = Array(cells.vertical)
                          .fill(null)
                          .map(() => Array(cells.horizontal - 1).fill(false));

  const horizontals = Array(cells.vertical - 1)
                            .fill(null)
                            .map(() => Array(cells.horizontal).fill(false));

    const startRow = Math.floor(Math.random() * cells.vertical);
    const startColumn = Math.floor(Math.random() * cells.horizontal);

  useEffect(() => {

    const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

    const engine = Engine.create();
    engine.world.gravity.y = 0;
    const { world } = engine;
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        wireframes: false,
        width,
        height,
        background: backGroundColor
      }
    });
    Render.run(render);
    Runner.run(Runner.create(), engine);

    // Walls
    const walls = [
      Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
      Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
      Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
      Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
    ];
    World.add(world, walls);

    // Maze generation

    const shuffle = arr => {
      let counter = arr.length;

      while (counter > 0) {
        const index = Math.floor(Math.random() * counter);

        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
      }
      return arr;
    };

    const stepThroughCell = (row, column) => {
      // If i have visted the cell at [row, column], then return
      if (grid[row][column]) {
        return; 
      }

      // Mark this cell as being visited
      grid[row][column] = true;

      // Assemble randomly-ordered list of neighbors
      const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left']
      ]);
      // For each neighbor....
      for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;

        // See if that neighbor is out of bounds
        if (
          nextRow < 0 ||
          nextRow >= cells.vertical ||
          nextColumn < 0 ||
          nextColumn >= cells.horizontal
        ) {
          continue;
        }

        // If we have visited that neighbor, continue to next neighbor
        if (grid[nextRow][nextColumn]) {
          continue;
        }

        // Remove a wall from either horizontals or verticals
        if (direction === 'left') {
          verticals[row][column - 1] = true;
        } else if (direction === 'right') {
          verticals[row][column] = true;
        } else if (direction === 'up') {
          horizontals[row - 1][column] = true;
        } else if (direction === 'down') {
          horizontals[row][column] = true;
        }

        stepThroughCell(nextRow, nextColumn);
      }
    };

    stepThroughCell(startRow, startColumn);

    horizontals.forEach((row, rowIndex) => {
      row.forEach((open, columnIndex) => {
        if (open) {
          return;
        }

        const wall = Bodies.rectangle(
          columnIndex * unitLengthX + unitLengthX / 2,
          rowIndex * unitLengthY + unitLengthY,
          unitLengthX,
          5,
          {
            label: 'wall',
            isStatic: true,
            render: {
              fillStyle: wallColor,
              visible: true
              
            }
          }
        );
        World.add(world, wall);
      });
    });

    verticals.forEach((row, rowIndex) => {
      row.forEach((open, columnIndex) => {
        if (open) {
          return;
        }

        const wall = Bodies.rectangle(
          columnIndex * unitLengthX + unitLengthX,
          rowIndex * unitLengthY + unitLengthY / 2,
          5,
          unitLengthY,
          {
            label: 'wall',
            isStatic: true,
            render: {
              fillStyle: wallColor
            }
          }
        );
        World.add(world, wall);
      });
    });
    
    // Goal
  const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7,
    unitLengthY * 0.7,
    {
      label: 'goal',
      isStatic: true,
      render: {
        fillStyle: 'green'
      }
    }
  );
  World.add(world, goal);

  }, [])

  return (
    <div on>
      {/* <NavBar/> */}

    </div>
  )
}


