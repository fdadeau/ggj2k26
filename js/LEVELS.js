export const LEVELS = {
    1: {
        "player":{
            "startPosition":{"x":6,"y":1},
        },
        "camera":{
            "startPosition":{"x":5,"y":5},
            "path":[
                {
                    "x":80,
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
                "width": 10,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":10,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 5,
                "height": 3
            },
            {
                "kind":"Permanent",
                "x":17,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":6,
                "height":3
            },
            {
                "kind":"Permanent",
                "x":22,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 6,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":29,
                "y":2,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 4,
                "height": 1
            },
            {
                "kind":"Permanent",
                "x":36,
                "y":2,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 6,
                "height":1
            },
            {
                "kind":"Mask",
                "type":"bird",
                "x":7,
                "y":1,
                "startLiving":0
            },
            {
                "kind":"Permanent",
                "x":45,
                "y":3,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 2,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":50,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 10,
                "height":7
            },
            {
                "kind":"Permanent",
                "x":63,
                "y":3,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 14,
                "height":18
            },
            {
                "kind":"Permanent",
                "x":64,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 16,
                "height": 1
            },
            {
                "kind":"Mask",
                "type":"wrestler",
                "x":68,
                "y":1,
                "startLiving":0,
            },
            {
                "kind":"Breakable",
                "x":70,
                "y":1,
                "startLiving":0,
                "stopLiving": "punched",
                "width": 1,
                "height": 2
            }
        ],
        "endings":[
            {
                "area":{
                    "x": 75,
                    "y":1,
                    "width":2,
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
                    "x":15,
                    "y":6,
                    "speed":0.02
                }
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
}