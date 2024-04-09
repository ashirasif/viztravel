import './App.css'
import "maplibre-gl/dist/maplibre-gl.css"
import Map from "react-map-gl/maplibre"
import { Canvas } from 'react-three-map/maplibre'
import { Environment } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { Character } from './CharacterAnimation'
import { Model } from './walk'
import { Home } from './home'
import { Hotel } from './hotel'


const App = () => {
  const [startAnimation, setStartAnimation] = useState(false)

  return (
    <Map
      initialViewState={{ latitude: 51, longitude: 0, zoom: 18 }} 
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" 
      style={{ width: "100vw", height: "100vh" }} >
      <div className='absolute p-4 top-0 left-0 z-10'>
        <button className='p-4 text-lg font-bold bg-black text-white rounded-xl' onClick={() => setStartAnimation(!startAnimation)}>Walk</button>
      </div>
      <Canvas latitude={51} longitude={0}>
        <Character walk={startAnimation}/>
        <Hotel scale={100} position={[500, 0, 0]}/>
        <Home appear={true} />
        <Environment preset="sunset" />
      </Canvas>
    </Map>
  )
}

export default App
