exports.DBConfig = {
    T: 'dbconfig',
    C: {
        ID: '_id',
        DateCreated: 'datecreated',
        Name: 'name',
        Version: 'version',
        Environment: 'environment',
    }
}

exports.Exercise = {
    T: 'exercise',
    C: {
        ID: '_id',
        DateCreated: 'datecreated',
        User: 'user',
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

exports.ExerciseGroup = {
    T: 'exercisegroup',
    C: {
        ID: '_id',
        DateCreated: 'datecreated',
        User: 'user',
        Name: 'name',
        Note: 'note',
        Exercises: 'exercises',
    }
}

exports.User = {
    T: 'user',
    C: {
        ID: '_id',
        DateCreated: 'datecreated',
        Email: 'email',
        Name: 'name',
        PasswordHash: 'passwordhash',
        Weight: {
            T: 'weight',
            C: {
                Date: 'date',
                Value: 'value',
            }
        },
        ExerciseGroups: 'exercisegroups',
    }
}
