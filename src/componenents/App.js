import React, {useState, useEffect} from 'react'
import Matter from "matter-js";

export default function App() {
  const [state, setstate] = useState({})


  const cells = 3
// const cells = Math.floor(Math.random() * (10 - 5 + 1) + 5)
  const grid = Array(cells)
                .fill(null)
                .map(()=> Array(cells).fill(false));

  const verticals = Array(cells)
                    .fill(null)
                    .map(()=>Array(cells - 1 ).fill(false))

  const horizontals = Array(cells-1).fill(null)
                                    .map(()=>Array(cells).fill(false))




  const startValGen = ()=>  Math.floor(Math.random() * cells)
  const startRow = startValGen()
  const startColumn = startValGen()

  const shuffle=(arr)=>{
    let counter = arr.length

    while(counter > 0){
      const index = Math.floor(Math.random() * counter)
      // counter--
      counter--
      const temp = arr[counter]
      arr[counter] = arr[index]
      arr[index] = temp
    }
    return arr
  }
  useEffect(() => {

    const {Engine, Render, Runner, World, Bodies} = Matter

    const width = 800
    const height = 800

    const engine = Engine.create();
    const {world} = engine;
    const render = Render.create({
      element: document.body,
      engine: engine,
      options:{
        width: width,
        height:height,
        wireframes: false
      }
    })

    // walls --> top, bottom, left, right
    const walls =[
      Bodies.rectangle((width/2), 0, width, 40, {isStatic:true}),
      Bodies.rectangle((width/2), height, 800, 40, {isStatic:true}),
      Bodies.rectangle(0, (height/2), 40, height, {isStatic:true}),
      Bodies.rectangle(width, (height/2), 40, height, {isStatic:true}),
    ]

    Render.run(render);
    Runner.run(Runner.create(), engine)
    World.add(world, walls)

    const stepThroughCell = (row, column) =>{
      // If you have visited [row, column] return
      if(grid[row][column]){
        return
      }

      // // Mark cell as visited
      grid[row][column] = true
      //  Assemble randomly-ordered list of neighbors
      const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left']
      ]);

      //  For Each neighbor
      for(let neighbor of neighbors){
        const [nextRow, nextColumn, direction] = neighbor

      // See if neighbor is out of bounds
        if((nextRow < 0) ||
         (nextRow >= cells) ||
         (nextColumn < 0) || 
         (nextColumn >= cells)){
          continue;
        }
      // if you have visited that neighbor, continue to next neighbor
        if(grid[nextRow][nextColumn]){
          continue;
        }

   // Remove a wall from either horizontals or verticals
        if (direction === 'left'){
          verticals[row][column - 1] = true;
        } else if (direction === 'right'){
          verticals[row][column] = true;
        } else if (direction === 'up'){
          horizontals[row - 1][column] = true;
        } else if (direction === 'down'){
          horizontals[row][column] = true;
        }
      }
    }
    stepThroughCell(startRow, startColumn)
    verticals.map((something)=>console.log(something))
    horizontals.map((something)=>console.log(something))
    // console.log("verticals", verticals)
    // console.log("horizontals", horizontals)
  }, [])

  return (
    <div>
    </div>
  )
}
