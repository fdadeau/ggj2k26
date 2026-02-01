export const LEVELS = {
    1: {
        "player":{
            "startPosition":{"x":73,"y":3},
            // "startPosition":{"x":8,"y":3},
        },
        "camera":{
            "startPosition":{"x":75 ,"y":5},
            // "startPosition":{"x":8 ,"y":5},
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
            // {
            //     "kind":"Breakable",
            //     "x":22,
            //     "y":5,
            //     "startLiving":0,
            //     "stopLiving": "punched",
            //     "width": 1,
            //     "height": 2
            // },
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
                "x":36,
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
                "height":10
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
                "height":3
            },
            {
                "kind":"Permanent",
                "x":57,
                "y":6,
                "startLiving":0,
                "stopLiving":undefined,
                "width":3,
                "height":1
            },
            {
                "kind":"Permanent",
                "x":64,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":3,
                "height":8
            },
            {
                "kind":"Permanent",
                "x":67,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":2,
                "height":6
            },
            {
                "kind":"Permanent",
                "x":69,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":2,
                "height":4
            },
            {
                "kind":"Permanent",
                "x":71,
                "y":0,
                "startLiving":0,
                "stopLiving":undefined,
                "width":10,
                "height":2
            },
            {
                "kind":"Mask",
                "type":"wrestler",
                "blur": "rgba(255, 255, 0, 0.9)",
                "x":75,
                "y":2,
                "startLiving":0
            },
            // {
            //     "kind":"Mask",
            //     "type":"ninja",
            //     "blur": "rgba(0, 0, 0, 0.9)",
            //     "x":75,
            //     "y":2,
            //     "startLiving":0
            // },
        ],
        "endings":[
            {
                "area":{
                    "x": 100,
                    "y": 3,
                    "width":2,
                    "height":1
                },
                "nextLevel": 2
            }
        ]
    }
}