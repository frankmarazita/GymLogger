exports.Session = {
    User: {
        T: 'user',
        C: {
            ID: '_id',
            Email: 'email',
            Name: 'name',
        }
    }
}

exports.DB = {
    Users: {
        T: 'users',
        C: {
            ID: '_id',
            Email: 'email',
            Name: 'name',
            PasswordHash: 'passwordhash',
            Weight: {
                T: 'weight',
                C: {
                    Date: 'date',
                    Value: 'value',
                }
            }
        }
    },
    ExerciseGroups: {
        T: 'exercisegroups',
        C: {
            ID: '_id',
            User: 'user',
            Name: 'name',
            Note: 'note',
        }
    },
    Exercises: {
        T: 'exercises',
        C: {
            ID: '_id',
            ExerciseGroup: 'exercisegroup',
            Name: 'name',
            Note: 'note',
            ExerciseType: 'exercisetype',
            Goal: {
                T: 'goal',
                C: {
                    Date: 'date',
                    Value: 'value',
                }
            },
            DailyMax: {
                T: 'dailymax',
                C: {
                    Date: 'date',
                    Value: 'value',
                }
            }
        }
    }
}

exports.ExerciseType = {
    T: 'exercisetype',
    C: {
        // 0: 'None',
        1: 'Weight',
        2: 'Machine (Weight)',
        3: 'Machine (Level)',
        4: 'Bodyweight',
        5: 'Cardio',
    }
}

exports.Response = {
    T: 'response',
    C: {
        400: 'Bad Request',
        401: 'Authorization Request',
        403: 'Resource Forbidden',
        404: 'Page Not Found',
        408: 'Request Timeout',
        410: 'Gone or Deleted',
        422: 'Unprocessable Entity',
    }
}