import React, {useState, useEffect} from 'react'
import Matter from "matter-js";
import {Random} from "random-js";

export default function App() {
  const [state, setstate] = useState({})

  useEffect(() => {
    
    // const cells = 3
    const cells = Math.floor(Math.random() * (10 - 5 + 1) + 5)
    
    const startRow = Math.floor(Math.random() * cells)
    const startColumn = Math.floor(Math.random() * cells)

    const stepThroughCell = (row, column) =>{
      // If you have visited [row, column] return

      // Mark cell as visited

      //  Assemble randomly-ordered list of neighbors

      //  For Each neighbor

      // See if neighbor is out of bounds

      // if you have visited that neighbor, continue to next neighbor

      // Visit next Cell
    }

    const grid = Array(3).fill(null)
                         .map(()=> Array(cells).fill(false));

    const verticals = Array(cells).fill(null)
                            .map(()=>Array(cells - 1 ).fill(false))

    const horizonatals = Array(cells-1).fill(null)
                            .map(()=>Array(cells).fill(false))

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


    console.log( Bodies)
    console.log(grid)
    console.log(horizonatals)
    console.log(verticals)
    console.log(startColumn)
    console.log(startRow)
  }, [])

  return (
    <div>
      
    </div>
  )
}
