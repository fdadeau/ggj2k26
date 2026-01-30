export const LEVELS = {
    1: {
        "player":{
            "startPosition":{"x":2,"y":2},
        },
        "camera":{
            "startPosition":{"x":5,"y":5},
            "path":[
                {
                    "position":{"x":20,"y":5},
                    "speed":0.5,
                },
                {
                    "position":{"x":30,"y":15},
                    "speed":0.3,
                },
                {
                    "position":{"x":42,"y":15},
                    "speed":0.5,
                }
            ]
        },
        "stuff":[
            {
                "kind":"Permanent",
                "position":{"x":0,"y":0},
                "startLiving":0,
                "stopLiving":undefined,
                "length": 30,
                "thickness":0.5,
                "angle":0
            },
            {
                "kind":"Permanent",
                "position":{"x":20,"y":4},
                "startLiving":0,
                "stopLiving":undefined,
                "length": 5,
                "thickness":0.5,
                "angle":0
            },
            {
                "kind":"Permanent",
                "position":{"x":25,"y":8},
                "startLiving":0,
                "stopLiving":undefined,
                "length": 5,
                "thickness":0.5,
                "angle":0
            },
            {
                "kind":"Permanent",
                "position":{"x":30,"y":0},
                "startLiving":0,
                "stopLiving":undefined,
                "length": 10,
                "thickness":0.5,
                "angle":90
            },
            {
                "kind":"Permanent",
                "position":{"x":30,"y":10},
                "startLiving":0,
                "stopLiving":undefined,
                "length": 5,
                "thickness":0.5,
                "angle":0
            }
        ],
        "endings":[
            {
                "condition":"y<0",
                "nextLevel": 1
            }
        ]
    }
}

