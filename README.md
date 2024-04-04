# Matematik Projesi

### POST {{main_url}}/getAnalitics

    Request
    -- "device-id" : "..."

    Response
    -- "status" : boolean
    -- "user_analytics" : {
        -- "questions" : [
            {
                --"question-id": "...",
                --"question-content": "...",
                --"question-level": int,
                --"question-subject": "...",
                --"question-date": "...",
                --"A": "...",
                --"B": "...",
                --"C": "...",
                --"D": "...",
                --"true-answer": int,
                --"user-choice": int,
                --"is-did-true": boolean
            }
        ]
        -- "subjects": {
            -- "...": {
                -- "total": int,
                -- "correct": int,
                -- "percentage": int
            }
        }
    }

**Errors**

    Response
    -- "status" : false,
    -- "error" : '...',
    -- "errorMessage" : "..."


### POST {{main_url}}/setDeviceId

    Response
    -- "status" : boolean
    -- "created_id" : "..."

**Errors**

    Response
    -- "status" : false,
    -- "error" : '...',
    -- "errorMessage" : "..."
    
### POST {{main_url}}/createQuestion

    Request
    -- "device-id" : "..."
    -- "question-content" : "...",
    -- "question-level" : int
    
    Response
    -- "status" : boolean
    -- "questions" : [
            {
                --"question-id": "...",
                --"question-content": "...",
                --"question-level": int,
                --"question-subject": "...",
                --"question-date": "...",
                --"A": "...",
                --"B": "...",
                --"C": "...",
                --"D": "...",
                --"true-answer": int,
                --"user-choice": int,
                --"is-did-true": boolean
            }
        ]
    -- "ids" : [..., ..., ..., ..., ...]

**Errors**

    Response
    -- "status" : false,
    -- "error" : '...',
    -- "errorMessage" : "..."

### PUT {{main_url}}/setAfterLesson

    Request
    -- "device-id" : "..."
    -- "results": [{
            -- "question-id": "...",
            -- "user-choice": int,
            -- "result": boolean
        }]
    
    Response
    -- "status" : boolean

**Errors**

    Response
    -- "status" : false,
    -- "error" : '...',
    -- "errorMessage" : "..."
    