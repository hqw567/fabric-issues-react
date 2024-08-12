import * as fabric from 'fabric'
import { useEffect, useRef } from 'react'
import dataJson from './data.json'
const App = () => {
  const canvasRef = useRef()

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = new fabric.Canvas(canvasRef.current)
    dataJson.objects.forEach((item) => {
      // issues 1: When I have a custom attribute with "type" in it, I get an error `Error: TypeError: Cannot read properties of undefined (reading 'split') at _Io._splitTextIntoLines `
      //
      // Comment the following code to see the error
      // delete item.myData.type
    })
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

export function loadFont(fontName, fontUrl) {
  return new Promise((resolve, reject) => {
    const font = new FontFace(fontName, `url(${fontUrl})`)
    font
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont)
        resolve(loadedFont)
      })
      .catch((error) => {
        reject(new Error(`Font loading failure ${error}`))
      })
  })
}
