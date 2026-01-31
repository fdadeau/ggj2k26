export const LEVELS = {
    1: {
        "player":{
            "startPosition":{"x":2,"y":2},
        },
        "camera":{
            "startPosition":{"x":5,"y":5},
            "path":[
                {
                    "x":80,
                    "y":5,
                    "speed":0.5,
                }
            ]
        },
        "stuff":[
            {
                "kind":"Permanent",
                "x":0,
                "y":1,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 10,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":20,
                "y":4,
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
                "x":25,
                "y":8,
                "startLiving": 0,
                "stopLiving": undefined,
                "width": 5,
                "height": 1,
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
                "type":"Wrestler",
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
                    "x": 33,
                    "y":15,
                    "width":2,
                    "height":2
                },
                "nextLevel": 1
            }
        ]
    }
}

