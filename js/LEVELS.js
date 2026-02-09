export const LEVELS = {
    1: {
        "player":{
            // "startPosition":{"x":112,"y":3},
            "startPosition":{"x":3,"y":3},
        },
        "texts" : [
            { text: "Run away from the smoke!", x: 5, y: 5},
            { text: "Press Space to jump", x: 14, y: 6},
            { text: "Press S to swap between masks", x: 40, y: 6},
            { text: "The bird mask lets you jump again while in the air", x: 46, y: 8},
            { text: "The wrestler mask lets you destroy walls", x: 66, y: 17 },
            { text: "Use A/Q against the wall to destroy it", x: 80, y: 13 },
            { text: "Switch between masks!", x: 96, y: 15 },
            { text: "Ninja masks lets you dash behind some obstacles", x: 109, y: 16 },
            { text: "Use A/Q to dash!", x: 111, y: 4 },
            { text: "Touch the portal to exit the level", x: 129, y: 7 },
        ],
        "camera":{
            // "startPosition":{"x":112 ,"y":5},
            "startPosition":{"x":4 ,"y":5},
            "path":[
                {
                    "x":38,
                    "y":5,
                    "speed":0.5
                },
                {
                    "x":59,
                    "y":5,
                    "speed":0.3
                },
                {
                    "x":59,
                    "y":15,
                    "speed":0.3
                },
                {
                    "x":70,
                    "y":15,
                    "speed":0.8
                },
                {
                    "x":85,
                    "y":12,
                    "speed":0.8
                },
                {
                    "x":110,
                    "y":12,
                    "speed":0.5
                },
                {
                    "x":110,
                    "y":5,
                    "speed":0.8
                },
                {
                    "x":130,
                    "y":5,
                    "speed":0.5
                }
            ]
        },
        "stuff":[
            {
                "kind":"Permanent",
                "x":0,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 25,
                "height":2
            },
            {
                "kind":"Permanent",
                "x":12,
                "y":2,
                "startLiving":0,
                "stopLiving":undefined,
                "width":2,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":16,
                "y":2,
                "startLiving":0,
                "stopLiving":undefined,
                "width":2,
                "height":2
            },
            {
                "kind":"Permanent",
                "x":20,
                "y":2,
                "startLiving":0,
                "stopLiving":undefined,
                "width":5,
                "height":3
            },
            {
                "kind":"Permanent",
                "x":28,
                "y":3,
                "startLiving":0,
                "stopLiving":undefined,
                "width":3,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":34,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":16,
                "height":3
            },
            {
                "kind":"Mask",
                "type":"bird",
                "blur": "rgba(0, 255, 255, 0.9)",
                "x":38,
                "y":3,
                "startLiving":0
            },
            {
                "kind":"Permanent",
                "x":45,
                "y":3,
                "startLiving":0,
                "stopLiving":undefined,
                "width":5,
                "height":3
            },
            {
                "kind":"Permanent",
                "x":52,
                "y":5,
                "startLiving":0,
                "stopLiving":undefined,
                "width":1,
                "height":15
            },
            {
                "kind":"Permanent",
                "x":54,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":5,
                "height":2
            },
            {
                "kind":"Permanent",
                "x":62,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":2,
                "height":5
            },
            {
                "kind":"Permanent",
                "x":57,
                "y":8,
                "startLiving":0,
                "stopLiving":undefined,
                "width":3,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":53,
                "y":12,
                "startLiving":0,
                "stopLiving":undefined,
                "width":1,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":59,
                "y":13,
                "startLiving":0,
                "stopLiving":undefined,
                "width":5,
                "height":2
            },
            {
                "kind":"Permanent",
                "x":64,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":4,
                "height":15
            },
            {
                "kind":"Mask",
                "type":"wrestler",
                "blur": "rgba(255, 255, 0, 0.9)",
                "x":66,
                "y":15,
                "startLiving":0
            },
            {
                "kind":"Permanent",
                "x":69,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":1,
                "height":14
            },
            {
                "kind":"Permanent",
                "x":71,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":1,
                "height":13
            },
            {
                "kind":"Permanent",
                "x":73,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":1,
                "height":12
            },
            {
                "kind":"Permanent",
                "x":75,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":1,
                "height":11
            },
            {
                "kind":"Permanent",
                "x":77,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":1,
                "height":10
            },
            {
                "kind":"Permanent",
                "x":79,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":26,
                "height":9
            },
            {
                "kind":"Breakable",
                "x":85,
                "y":9,
                "startLiving":0,
                "stopLiving": "punched",
                "width": 2,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x":90,
                "y":11,
                "startLiving":0,
                "stopLiving":undefined,
                "width":3,
                "height":10
            },
            {
                "kind":"Breakable",
                "x":91,
                "y":9,
                "startLiving":0,
                "stopLiving": "punched",
                "width":1,
                "height":2
            },
            {
                "kind":"Permanent",
                "x":98,
                "y":9,
                "startLiving":0,
                "stopLiving": undefined,
                "width":7,
                "height":4
            },
            {
                "kind":"Breakable",
                "x":101,
                "y":13,
                "startLiving":0,
                "stopLiving": "punched",
                "width":1,
                "height":4
            },
            {
                "kind":"Mask",
                "type":"ninja",
                "blur": "rgba(0, 0, 0, 0.9)",
                "x":109,
                "y":12,
                "startLiving":0
            },
            {
                "kind":"Permanent",
                "x":108,
                "y":11,
                "startLiving":0,
                "stopLiving": undefined,
                "width":3,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":112,
                "y":8,
                "startLiving":0,
                "stopLiving": undefined,
                "width":3,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":107,
                "y":6,
                "startLiving":0,
                "stopLiving": undefined,
                "width":3,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":105,
                "y":1,
                "startLiving":0,
                "stopLiving": undefined,
                "width":3,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":112,
                "y":1,
                "startLiving":0,
                "stopLiving": undefined,
                "width":5,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":115,
                "y":4,
                "startLiving":0,
                "stopLiving": undefined,
                "width":8,
                "height":15
            },
            {
                "kind":"Permanent",
                "x":117,
                "y":1,
                "startLiving":0,
                "stopLiving": undefined,
                "width":4,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":122,
                "y":1,
                "startLiving":0,
                "stopLiving": undefined,
                "width":4,
                "height":1
            },
            {
                "kind":"Breakable",
                "x":126,
                "y":2,
                "startLiving":0,
                "stopLiving": "punched",
                "width": 1,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x":126,
                "y":5,
                "startLiving":0,
                "stopLiving": undefined,
                "width":5,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":126,
                "y":0,
                "startLiving":0,
                "stopLiving": undefined,
                "width":9,
                "height":2
            },
            {
                "kind":"Permanent",
                "x":133,
                "y":0,
                "startLiving":0,
                "stopLiving": undefined,
                "width":2,
                "height":4
            },
            {
                "kind":"Permanent",
                "x":135,
                "y":0,
                "startLiving":0,
                "stopLiving": undefined,
                "width":5,
                "height":10
            },
            {
                "kind": "Enemy",
                "x": 116,
                "y": 2,
                "width": 1,
                "height": 2
            },
            {
                kind: "Enemy",
                x: 120,
                y: 2, 
                width: 1, 
                height: 2
            }
        ],
        "endings":[
            {
                "area":{
                    "x": 128,
                    "y": 8,
                    "width":2,
                    "height":1
                },
                "nextLevel": 1
            }
        ]
    },
    1:{
        "player":{
            "startPosition":{"x":6,"y":1},
        },
        "camera":{
            "startPosition":{"x":5,"y":5},
            "path":[
                {
                    "x": 13,
                    "y": 5,
                    "speed": 0.5
                },
                {
                    "x": 20,
                    "y": 10,
                    "speed": 0.3
                },
            ]
        },
        "stuff":[
            {
                "kind":"Permanent", //starting ground
                "x":0,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 15,
                "height":1
            },
            {
                "kind":"Mask",
                "type":"ninja",
                "x":4,
                "y":3,
                "startLiving":0,
            },
            {
                "kind":"Permanent", // first wall
                "x":5,
                "y":2,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 1,
                "height": 16
            },
            {
                "kind":"Permanent", // Second wall / Big block
                "x":15,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 10,
                "height": 7 
            },
            {
                "kind":"Permanent", // first platform
                "x":4,
                "y":2,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 10,
                "height": 1
            },
            {
                "kind":"Permanent", // Second platform
                "x":7,
                "y":4,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 8,
                "height": 1
            },
            {
                "kind":"Permanent", // Third platform / 2nd Big block on the top
                "x":6,
                "y":6,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 8,
                "height": 20
            }
        ],
        "endings":[
            {
                "area":{
                    "x": 23,
                    "y":9,
                    "width":2,
                    "height":2
                },
                "nextLevel": 1
            }
        ]
    },
    2: {
        player: {
            startPosition: { x: 3, y: 3 }
        },
        camera: {
            startPosition : { x: 4, y: 5 },
            path: [
                { x: 17, y: 5, speed: 0.4 },
                { x: 17, y: 13, speed: 0.3 },
                { x: 28, y: 13, speed: 0.4 },
                { x: 29, y: 13, speed: 0.2 },
                { x: 29, y: 32, speed: 0.3 },
                { x: 35, y: 32, speed: 0.5 },
                { x: 47, y: 26, speed: 0.5 },
                { x: 47, y: 14, speed: 0.3 },
                { x: 5, y: 14, speed: 0.9 },
                { x: 5, y: 27, speed: 0.3 },
                { x: 8, y: 27, speed: 0.6 },
                { x: 8, y: 24, speed: 0.6 },
                { x: 18, y: 24, speed: 0.6 },
                { x: 18, y: 4, speed: 0.6 },
                { x: 30, y: 4, speed: 0.6 },
            ]
        },
        stuff: [
            { kind: "Permanent", x: 0, y: 1, width: 5, height: 1 },
            { kind: "Permanent", x: 7, y: 3, width: 4, height: 1 },
            { kind: "Permanent", x: 11, y: 0, width: 3, height: 6 },
            { kind: "Permanent", x: 8, y: 7, width: 1, height: 1 },
            { kind: "Permanent", x: 16, y: 5, width: 4, height: 1 },
            { kind: "Permanent", x: 19, y: 8, width: 1, height: 1 },
            { kind: "Permanent", x: 20, y: 3, width: 2, height: 9 },
            { kind: "Permanent", x: 21, y: 0, width: 13, height: 1 },
            { kind: "Permanent", x: 29, y: 3, width: 2, height: 3 },
            { kind: "Permanent", x: 6, y: 11, width: 10, height: 2 },
            { kind: "Permanent", x: 6, y: 15, width: 10, height: 3 },
            { kind: "Permanent", x: 14, y: 10, width: 3, height: 1 },
            //{ kind: "Permanent", x: 16, y: 12, width: 1, height: 1 },
            { kind: "Permanent", x: 21, y: 11, width: 13, height: 1 },
            { kind: "Permanent", x: 21, y: 3, width: 8, height: 1 },

            { kind: "Permanent", x: 1, y: 13, width: 2, height: 1 },

            // zigzag
            { kind: "Permanent", x: 23, y: 17, width: 9, height: 1 },
            { kind: "Permanent", x: 26, y: 20, width: 8, height: 1 },
            { kind: "Permanent", x: 24, y: 23, width: 8, height: 1 },
            { kind: "Permanent", x: 26, y: 26, width: 8, height: 1 },
            { kind: "Permanent", x: 24, y: 29, width: 8, height: 1 },

            // horns
            { kind: "Permanent", x: 6, y: 18, width: 3, height: 6 },
            { kind: "Permanent", x: 13, y: 18, width: 3, height: 6 },

            { kind: "Permanent", x: 22, y: 7, width: 3, height: 1 },
            { kind: "Permanent", x: 34, y: 0, width: 2, height: 30 },
            { kind: "Permanent", x: 36, y: 0, width: 22, height: 12 },
            { kind: "Permanent", x: 16, y: 15, width: 3, height: 1 },
            { kind: "Permanent", x: 18, y: 18, width: 2, height: 6 },
            { kind: "Permanent", x: 20, y: 18, width: 4, height: 17 },
            { kind: "Permanent", x: 17, y: 18, width: 1, height: 2 },


            // downstairs 
            { kind: "Permanent", x: 38, y: 16, width: 2, height: 13 },
            { kind: "Permanent", x: 36, y: 14, width: 2, height: 8 },
            { kind: "Permanent", x: 40, y: 21, width: 2, height: 1 },
            { kind: "Permanent", x: 42, y: 21, width: 2, height: 7 },
            { kind: "Permanent", x: 44, y: 21, width: 1, height: 1 },
            { kind: "Permanent", x: 46, y: 14, width: 2, height: 2 },
            { kind: "Permanent", x: 46, y: 18, width: 2, height: 9 },
            { kind: "Permanent", x: 50, y: 14, width: 2, height: 12 },
            { kind: "Permanent", x: 54, y: 14, width: 2, height: 11 },
            { kind: "Permanent", x: 38, y: 14, width: 10, height: 2 },
            { kind: "Permanent", x: 49, y: 14, width: 7, height: 2 },
            { kind: "Permanent", x: 41, y: 18, width: 9, height: 1 },
            // far left 
            { kind: "Permanent", x: 0, y: 16, width: 1, height: 1 },
            { kind: "Permanent", x: 5, y: 18, width: 2, height: 1 },
            { kind: "Permanent", x: 1, y: 21, width: 1, height: 1 },

            // final
            { kind: "Permanent", x: 14, y: 0, width: 2, height: 1 },

            //
            { kind: "Mask", blur: "rgba(0, 255, 255, 0.9)", type:"bird", x: 8, y: 8 },
            { kind: "Mask", blur: "rgba(0, 255, 255, 0.9)", type:"ninja", x: 14, y: 13 },
            { kind: "Mask", blur: "rgba(0, 255, 255, 0.9)", type:"wrestler", x: 21, y: 12 },
            // Breakable 
            //{ kind: "Breakable", x: 15, y: 13, width: 1, height: 2 },
            { kind: "Breakable", x: 16, y: 16, width: 2, height: 2 },
            { kind: "Breakable", x: 29, y: 24, width: 1, height: 2 },
            { kind: "Breakable", x: 33, y: 12, width: 3, height: 2 },   // shouldn
            // Enemies
           // { kind: "Enemy", x: 12, y: 13, width: 1, height: 2 },
           // { kind: "Enemy", x: 26, y: 21, width: 1, height: 2 },
           // { kind: "Enemy", x: 27, y: 24, width: 1, height: 2 },
            { kind: "Enemy", x: 9, y: 18, width: 4, height: 2 },
        ],

        endings: [
            { area: { x: 23, y: 5, width: 2, height: 1 }, nextLevel: "1" }
        ]
    }
}