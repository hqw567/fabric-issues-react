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

    const controller = new AbortController()
    canvas
      .loadFromJSON(dataJson, undefined, { signal: controller.signal })
      .then(() => {
        canvas.requestRenderAll()
      })
      .catch((e) => {
        console.error(e.message ?? 'aborted')
      })
    return () => {
      controller.abort()
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
