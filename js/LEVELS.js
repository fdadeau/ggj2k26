export const LEVELS = {
    0: {
        "player":{
            "startPosition":{"x":3,"y":3},
            "mask1": "NONE",
            "mask2": "NONE",
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
                    "speed":0.7
                },
                {
                    "x":110,
                    "y":12,
                    "speed":0.5
                },
                {
                    "x":110,
                    "y":5,
                    "speed":0.6
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
                "kind":"Permanent",
                "x":123,
                "y":5,
                "startLiving":0,
                "stopLiving": undefined,
                "width":8,
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
            "startPosition":{"x":4,"y":3},
            "mask1": "NINJA",
            "mask2": "BIRD",
        },
        "camera":{
            "startPosition":{"x":4,"y":3},
            "path":[
                {
                    "x": 11,
                    "y": 3,
                    "speed": 0.3
                },
                {
                    "x": 11,
                    "y": 21,
                    "speed": 0.25
                },
                {
                    "x": 15,
                    "y": 21,
                    "speed": 0.25
                },
                {
                    "x": 20,
                    "y": 9,
                    "speed": 0.25
                },
            ]
        },
        "stuff":[
            {
                "kind":"Permanent",
                "x":0,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 15,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":5,
                "y":3,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 1,
                "height": 20
            },
            {
                "kind":"Permanent",
                "x":15,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 10,
                "height": 7 
            },
            {
                "kind":"Permanent",
                "x":4,
                "y":3,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 10,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x":7,
                "y":6,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 8,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x":6,
                "y":9,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 8,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x":7,
                "y":12,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 8,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x":6,
                "y":15,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 8,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x":7,
                "y":18,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 8,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x":15,
                "y":7,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 1,
                "height": 12
            },
            {
                "kind":"Permanent",
                "x":16,
                "y": 13,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 3,
                "height": 1
            },
        ],
        "endings":[
            {
                "area":{
                    "x": 23,
                    "y": 10,
                    "width":2,
                    "height":1
                },
                "nextLevel": 1
            }
        ]
    },
    2: {
        "player":{
            "startPosition": {
                "x": 12,
                "y": 2
            },
            "mask1": "NONE",
            "mask2": "NONE",
        },
        "texts" : [
            { text: "Hehe :3", x: 2, y: 3},
            { text: "Ready?", x: 12, y: 5},
            { text: "GO!", x: 22, y: 5},
            { text: "bonk", x: 52, y: 4},
            { text: "bonk bonk", x: 103, y: 33},
            { text: "Here?", x: 123, y: 39},
            { text: "Oupsi", x: 136, y: 39},
            { text: "Or here", x: 123, y: 36},
            { text: "Go down, but chill", x: 147, y: 36},
            { text: "twin bonks?", x: 188, y: 13},
            { text: "ouch :(", x: 199.5, y: 13},
            { text: "NINJAAAAA", x: 180, y: 45},
            { text: "NINJAAAAAAA", x: 150, y: 48},
            { text: "Weeeeeee", x: 119, y: 44},
            { text: "It was all planed :o", x: 62, y: 25},
            { text: "Weeeeeee again", x: 45, y: 19},
        ],
        "camera":{
            "startPosition": {
                "x": 12,
                "y": 5
            },
            "path":[
                {
                    "x": 25,
                    "y": 5,
                    "speed": 0.6
                },
                {
                    "x": 37,
                    "y": 7,
                    "speed": 0.6
                },
                {
                    "x": 52,
                    "y": 7,
                    "speed": 0.6
                },
                {
                    "x": 55,
                    "y": 9,
                    "speed": 0.3
                },
                {
                    "x": 55,
                    "y": 3,
                    "speed": 0.3
                },
                {
                    "x": 73,
                    "y": 3,
                    "speed": 0.5
                },
                {
                    "x": 73,
                    "y": 21,
                    "speed": 0.2
                },
                {
                    "x": 116,
                    "y": 36,
                    "speed": 0.45
                },
                {
                    "x": 144,
                    "y": 36,
                    "speed": 0.5
                },
                {
                    "x": 148,
                    "y": 36,
                    "speed": 0.25
                },
                {
                    "x": 148,
                    "y": 20,
                    "speed": 0.4
                },
                {
                    "x": 155,
                    "y": 20,
                    "speed": 0.5
                },
                {
                    "x": 169,
                    "y": 13,
                    "speed": 0.8
                },
                {
                    "x": 196,
                    "y": 13,
                    "speed": 0.4
                },
                {
                    "x": 200,
                    "y": 18,
                    "speed": 0.4
                },
                {
                    "x": 213.5,
                    "y": 18,
                    "speed": 0.5
                },
                {
                    "x": 213.5,
                    "y": 43,
                    "speed": 0.25
                },
                {
                    "x": 195,
                    "y": 43,
                    "speed": 0.4
                },
                {
                    "x": 189,
                    "y": 43,
                    "speed": 0.15
                },
                {
                    "x": 189,
                    "y": 46,
                    "speed": 0.15
                },
                {
                    "x": 154.5,
                    "y": 46,
                    "speed": 0.6
                },
                {
                    "x": 152,
                    "y": 48,
                    "speed": 0.4
                },
                {
                    "x": 125,
                    "y": 48,
                    "speed": 0.6
                },
                {
                    "x": 123,
                    "y": 48,
                    "speed": 0.2
                },
                {
                    "x": 119,
                    "y": 36,
                    "speed": 0.7
                },
                {
                    "x": 116,
                    "y": 36,
                    "speed": 0.6
                },
                {
                    "x": 73,
                    "y": 21,
                    "speed": 0.6
                },
                {
                    "x": 63,
                    "y": 23,
                    "speed": 0.4
                },
                {
                    "x": 50,
                    "y": 23,
                    "speed": 0.5
                },
                {
                    "x": 40,
                    "y": 7,
                    "speed": 0.7
                },
                {
                    "x": 37,
                    "y": 7,
                    "speed": 0.5
                },
                {
                    "x": 25,
                    "y": 5,
                    "speed": 0.5
                },
                {
                    "x": 6,
                    "y": 5,
                    "speed": 0.5
                },
            ]
        },
        "stuff":[
            {
                "kind":"Permanent",
                "x": 0,
                "y": 1,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 4,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 10,
                "y": 1,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 11,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 21,
                "y": 1,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 26,
                "y": 3,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 31,
                "y": 4,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 35,
                "y": 0,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 6
            },
            {
                "kind":"Permanent",
                "x": 41,
                "y": 0,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 6
            },
            {
                "kind":"Permanent",
                "x": 47,
                "y": 0,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 6
            },
            {
                "kind":"Permanent",
                "x": 52,
                "y": 7,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 6,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 56,
                "y": 9,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind": "Mask",
                "type": "wrestler",
                "blur": "rgba(255, 255, 0, 0.9)",
                "x": 57,
                "y": 10,
                "startLiving": 0
            },
            {
                "kind":"Permanent",
                "x": 51,
                "y": 1,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 7,
                "height": 1
            },
            {
                "kind":"Breakable",
                "x": 54,
                "y": 2,
                "startLiving": 0,
                "stopLiving": "punched",
                "width": 2,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x": 62,
                "y": 1,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 68,
                "y": 1,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 73,
                "y": 3,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 69,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 73,
                "y": 7,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 69,
                "y": 9,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 73,
                "y": 11,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 77,
                "y": 12,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 1,
                "height": 1
            },
            {
                "kind": "Mask",
                "type": "bird",
                "blur": "rgba(0, 255, 255, 0.9)",
                "x": 77,
                "y": 13,
                "startLiving": 0
            },
            {
                "kind":"Permanent",
                "x": 69,
                "y": 13,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 73,
                "y": 17,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 78,
                "y": -1,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 8,
                "height": 22
            },
            {
                "kind":"Permanent",
                "x": 86,
                "y": -1,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 6,
                "height": 26
            },
            {
                "kind":"Permanent",
                "x": 58,
                "y": 7,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 8,
                "height": 14
            },
            {
                "kind":"Permanent",
                "x": 54,
                "y": 12,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 4,
                "height": 9
            },
            {
                "kind":"Permanent",
                "x": 52,
                "y": 10,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 11
            },
            {
                "kind":"Permanent",
                "x": 96,
                "y": 27,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 4,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 104,
                "y": 30,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 6,
                "height": 1
            },
            {
                "kind":"Breakable",
                "x": 106,
                "y": 31,
                "startLiving": 0,
                "stopLiving": "punched",
                "width": 1,
                "height": 7
            },
            {
                "kind":"Breakable",
                "x": 107,
                "y": 31,
                "startLiving": 0,
                "stopLiving": "punched",
                "width": 1,
                "height": 7
            },
            {
                "kind":"Permanent",
                "x": 114,
                "y": 33,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 11,
                "height": 2
            },
            {
                "kind":"Permanent",
                "x": 118,
                "y": 34,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 4
            },
            {
                "kind":"Permanent",
                "x": 129,
                "y": 33,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 2
            },
            {
                "kind":"Permanent",
                "x": 136,
                "y": 33,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 2
            },
            {
                "kind":"Permanent",
                "x": 143,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 30
            },
            {
                "kind":"Permanent",
                "x": 146,
                "y": 32,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 1,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 149,
                "y": 28,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 1,
                "height": 1
            },
                {
                "kind":"Permanent",
                "x": 146,
                "y": 24,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 1,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 123,
                "y": 37,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 22,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 140,
                "y": 37,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 13,
                "height": 5
            },
            {
                "kind":"Permanent",
                "x": 123,
                "y": 41,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 30,
                "height": 5
            },
            {
                "kind":"Breakable",
                "x": 130,
                "y": 38,
                "startLiving": 0,
                "stopLiving": "punched",
                "width": 2,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x": 150,
                "y": 22,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 15
            },
            {
                "kind":"Permanent",
                "x": 146,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 10,
                "height": 13
            },
            {
                "kind":"Permanent",
                "x": 157,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 1,
                "height": 12
            },
            {
                "kind":"Permanent",
                "x": 159,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 1,
                "height": 11
            },
           {
                "kind":"Permanent",
                "x": 161,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 1,
                "height": 10
            },
            {
                "kind":"Permanent",
                "x": 163,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 1,
                "height": 9
            },
            {
                "kind":"Permanent",
                "x": 165,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 1,
                "height": 8
            },
            {
                "kind":"Permanent",
                "x": 167,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 1,
                "height": 7
            },
            {
                "kind":"Permanent",
                "x": 169,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 6
            },
            {
                "kind":"Permanent",
                "x": 176,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 25,
                "height": 6
            },
            {
                "kind":"Breakable",
                "x": 184,
                "y": 11,
                "startLiving": 0,
                "stopLiving": "punched",
                "width": 2,
                "height": 8
            },
            {
                "kind":"Breakable",
                "x": 190,
                "y": 11,
                "startLiving": 0,
                "stopLiving": "punched",
                "width": 2,
                "height": 8
            },
            {
                "kind":"Breakable",
                "x": 196,
                "y": 11,
                "startLiving": 0,
                "stopLiving": "punched",
                "width": 2,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x": 201,
                "y": 5,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 25,
                "height": 11
            },
            {
                "kind":"Permanent",
                "x": 212,
                "y": 19,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 218,
                "y": 22,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 206,
                "y": 22,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 212,
                "y": 25,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 218,
                "y": 28,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 206,
                "y": 28,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 212,
                "y": 31,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 218,
                "y": 34,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 206,
                "y": 34,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 212,
                "y": 37,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 218,
                "y": 40,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 206,
                "y": 40,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 198,
                "y": 20,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 21
            },
            {
                "kind":"Permanent",
                "x": 185,
                "y": 36,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 13,
                "height": 5
            },
            {
                "kind":"Permanent",
                "x": 180,
                "y": 36,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 5,
                "height": 8
            },
            {
                "kind":"Permanent",
                "x": 185,
                "y": 43,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 1
            },
            {
                "kind":"Breakable",
                "x": 187,
                "y": 41,
                "startLiving": 0,
                "stopLiving": "punched",
                "width": 1,
                "height": 2
            },
            {
                "kind": "Mask",
                "type": "ninja",
                "blur": "rgba(0, 0, 0, 0.9)",
                "x": 185,
                "y": 41,
                "startLiving": 0
            },
            {
                "kind":"Permanent",
                "x": 174,
                "y": 41,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 6,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x": 169,
                "y": 41,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x": 164,
                "y": 41,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x": 159,
                "y": 41,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x": 153,
                "y": 41,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 3,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x": 155,
                "y": 46,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 25,
                "height": 6
            },
            {
                "kind": "Enemy",
                "x": 146,
                "y": 46,
                "width": 1,
                "height": 2
            },
            {
                "kind": "Enemy",
                "x": 140,
                "y": 46,
                "width": 1,
                "height": 2
            },
            {
                "kind": "Enemy",
                "x": 134,
                "y": 46,
                "width": 1,
                "height": 2
            },
            {
                "kind": "Enemy",
                "x": 128,
                "y": 46,
                "width": 1,
                "height": 2
            },
            {
                "kind":"Permanent",
                "x": 68,
                "y": 19,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 61,
                "y": 21,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 2
            },
            {
                "kind":"Permanent",
                "x": 57,
                "y": 21,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 4
            },
            {
                "kind":"Permanent",
                "x": 53,
                "y": 21,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 2
            },
            {
                "kind":"Permanent",
                "x": 50,
                "y": 20,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 47,
                "y": 16,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x": 44,
                "y": 12,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 2,
                "height": 1
            },
        ],
        "endings":[
            {
                "area":{
                    "x": 1,
                    "y": 4,
                    "width": 2,
                    "height": 1
                },
                "nextLevel": 0
            }
        ]
    }
}