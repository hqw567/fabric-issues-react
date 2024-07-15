import * as fabric from 'fabric'
import { useEffect, useRef } from 'react'
import dataJson from './data.json'
const App = () => {
  const canvasRef = useRef()

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = new fabric.Canvas(canvasRef.current)

    dataJson.objects.forEach((item) => {
      // issues 1: When I have a custom attribute with "type" in it, I get an error `Error: fabric: No class registered for any`
      //
      // Comment the following code to see the error
      delete item.myData.type
    })

    // issues 2: When using it in react, there will still be an error message `TypeError: Cannot read properties of undefined (reading 'clearRect')`
    canvas.loadFromJSON(dataJson).then(() => {
      canvas.requestRenderAll()
    })
    return () => {
      canvas.dispose()
    }
  }, [])

  return (
    <canvas
      width={document.body.clientWidth}
      height={document.body.clientHeight}
      ref={canvasRef}
    />
  )
}

export default App
