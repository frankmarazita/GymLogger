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

exports.Status = {
    T: 'status',
    C: {
        200: 'OK',
        400: 'Bad Request',
        401: 'Authorization Request',
        403: 'Resource Forbidden',
        404: 'Page Not Found',
        408: 'Request Timeout',
        410: 'Gone or Deleted',
        422: 'Unprocessable Entity',
    }
}