import React, {useState, useEffect} from "react"; 
import axiosWithAuth from "./auth.js"
import { Graph } from "react-d3-graph"
import Player from "./Player.js"
import '../css/map.css'

// This compoenent get's the room data from the backend and displays the rooms
function Map() {
    const [room, setRoom] = useState([])

    useEffect(() => {
        axiosWithAuth()
       .get("https://binary-assassins.herokuapp.com/api/adv/rooms", room)
        .then(res => {
           console.log("logging res.data within useEffect", res.data) // seeing if we are getting data
           setRoom(res.data) // set state to data comeing through api call 
        })
        .catch(error => {
            console.log("Getting catch from .get() request", error)
        })
    }, [])


    let place = []
    if(room.data && room.data.length > 0) {
        // console.log("I'm here")
        let newRoom = room.data.map(item => {
            return {id: item.id, x: item.x, y: item.y}
        })
        place = newRoom
    }
    
      let placeTwo = []  
      if(room.data && room.data.length > 0) {
        let newRoomTwo = room.data.map(items => {
                return {source: items.id, target: items.targets[0]}
        })

        placeTwo = newRoomTwo
    }

    const data = {
        nodes: place,
        links: placeTwo
    };


    const myConfig = {
        "automaticRearrangeAfterDropNode": false,
        "collapsible": false,
        "directed": false,
        "focusAnimationDuration": 0.75,
        "focusZoom": 1,
        "height": 500,
        "highlightDegree": 1,
        "highlightOpacity": 1,
        "linkHighlightBehavior": false,
        "maxZoom": 8,
        "minZoom": 0.1,
        "nodeHighlightBehavior": false,
        "panAndZoom": false,
        "staticGraph": false,
        "staticGraphWithDragAndDrop": false,
        "width": 900,
        "d3": {
          "alphaTarget": 0.05,
          "gravity": -100,
          "linkLength": 100,
          "linkStrength": 1
        },
        "node": {
          "color": "#d3d3d3",
          "fontColor": "black",
          "fontSize": 12,
          "fontWeight": "bold",
          "highlightColor": "SAME",
          "highlightFontSize": 8,
          "highlightFontWeight": "normal",
          "highlightStrokeColor": "SAME",
          "highlightStrokeWidth": "SAME",
          "labelProperty": "id",
          "mouseCursor": "pointer",
          "opacity": 1,
          "renderLabel": true,
          "size": 200,
          "strokeColor": "none",
          "strokeWidth": 1.5,
          "svg": "",
          "symbolType": "circle"
        },
        "link": {
          "color": "#d3d3d3",
          "fontColor": "black",
          "fontSize": 8,
          "fontWeight": "normal",
          "highlightColor": "#d3d3d3",
          "highlightFontSize": 8,
          "highlightFontWeight": "normal",
          "labelProperty": "label",
          "mouseCursor": "pointer",
          "opacity": 1,
          "renderLabel": false,
          "semanticStrokeWidth": false,
          "strokeWidth": 1.5,
          "markerHeight": 6,
          "markerWidth": 6
        }
    }

// console.log("This is room from Map",room)
if(!room.data) {
    return(
        <>
        <p> Loading... </p> 
        </>
    )
} else {
    return(
        <div>
            <div className="TheWorldMap">
                <Graph
                    id="graph-id"
                    data={data}
                    config={myConfig}
                /> 
            </div>
            <Player />
        </div>
    )
}

}

export default Map