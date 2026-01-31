export const LEVELS = {
    1: {
        "player":{
            "startPosition":{"x":2,"y":2},
        },
        "camera":{
            "startPosition":{"x":5,"y":5},
            "path":[
                {
                    "x":20,
                    "y":5,
                    "speed":0.5,
                },
                {
                    "x":30,
                    "y":15,
                    "speed":0.3,
                },
                {
                    "x":42,
                    "y":15,
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
                "width": 30,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":20,
                "y":4,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 5,
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
                "x":30,
                "y":10,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 1,
                "height":10,
            },
            {
                "kind":"Permanent",
                "x":30,
                "y":10,
                "startLiving":0,
                "stopLiving":undefined,
                "width": 5,
                "height":1
            }
        ],
        "endings":[
            {
                "area":{
                    "x": 33,
                    "y":15,
                    "width":2,
                    "height":5
                },
                "nextLevel": 1
            }
        ]
    }
}

