export const LEVELS = {
    1: {
        "player":{
            // "startPosition":{"x":112,"y":3},
            "startPosition":{"x":8,"y":3},
        },
        "camera":{
            // "startPosition":{"x":112 ,"y":5},
            "startPosition":{"x":8 ,"y":5},
            "path":[
                {
                    "x":38,
                    "y":5,
                    "speed":0.5
                },
                {
                    "x":60,
                    "y":5,
                    "speed":0.3
                },
                {
                    "x":60,
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
                "y":5,
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
                "x":111,
                "y":1,
                "startLiving":0,
                "stopLiving": undefined,
                "width":3,
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
                "width":3,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":123,
                "y":1,
                "startLiving":0,
                "stopLiving": undefined,
                "width":3,
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
        ],
        "endings":[
            {
                "area":{
                    "x": 128,
                    "y": 6,
                    "width":1,
                    "height":2
                },
                "nextLevel": 2
            }
        ]
    },
    2:{
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
    }
}