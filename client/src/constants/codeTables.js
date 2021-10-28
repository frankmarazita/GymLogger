exports.ExerciseType = {
    T: 'exercisetype',
    C: {
        Key: {
            T: 'key',
            C: {
                Weight: 1,
                MachineWeight: 2,
                MachineLevel: 3,
                Bodyweight: 4,
                Cardio: 5,
            }
        },
        Value: {
            T: 'value',
            C: {
                1: 'Weight',
                2: 'Machine (Weight)',
                3: 'Machine (Level)',
                4: 'Bodyweight',
                5: 'Cardio',
            }
        }
    }
}

exports.IconExerciseType = {
    T: 'iconExerciseType',
    C: {
        Dumbbell: 'DUMBBELL',
        Cog: 'COG',
        HandRock: 'HANDROCK',
        Running: 'RUNNING',
        WeightHanging: 'WEIGHTHANGING',
        Weight: 'WEIGHT',
    }
}

exports.Form = {
    T: 'form',
    C: {
        Action: {
            T: 'action',
            C: {
                Add: 'ADD',
                Edit: 'EDIT',
            }
        }
    }
}

exports.Status = {
    T: 'status',
    C: {
        100: 'Continue',
        101: 'Switching Protocol',
        102: 'Processing',
        200: 'OK',
        201: 'Created',
        202: 'Accepted',
        203: 'Non-Authoritative InformationAccepted',
        204: 'No Content',
        205: 'Reset Content',
        206: 'Partial Content',
        207: 'Multi-Status',
        208: 'Already Reported',
        226: 'IM Used',
        300: 'Multiple Choices',
        301: 'Moved Permanently',
        302: 'Found',
        303: 'See Other',
        304: 'Not Modified',
        305: 'Use Proxy',
        308: 'Permanent Redirect',
        307: 'Temporary Redirect',
        400: 'Bad Request',
        401: 'Unauthorized',
        402: 'Payment Required',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',
        406: 'Not Acceptable',
        407: 'Proxy Authentication Required',
        408: 'Request Timeout',
        409: 'Conflict',
        410: 'Gone or Deleted',
        411: 'Length Required',
        412: 'Precondition Failed',
        413: 'Payload Too Large',
        414: 'Request-URI Too Long',
        415: 'Unsupported Media Type',
        416: 'Requested Range Not Satisfiable',
        417: 'Expectation Failed',
        418: 'I’m a Teapot',
        421: 'Misdirected Request',
        422: 'Unprocessable Entity',
        423: 'Locked',
        424: 'Failed Dependency',
        426: 'Upgrade Required',
        428: 'Precondition Required',
        429: 'Too Many Requests',
        431: 'Request Header Fields Too Large',
        444: 'Connection Closed Without Response',
        451: 'Unavailable For Legal Reasons',
        499: 'Client Closed Request',
        500: 'Internal Server Error',
        501: 'Not Implemented',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout',
        505: 'HTTP Version Not Supported',
        506: 'Variant Also Negotiates',
        507: 'Insufficient Storage',
        508: 'Loop Detected',
        510: 'Not Extended',
        511: 'Network Authentication Required',
        599: 'Network Connect Timeout Error'
    }
}