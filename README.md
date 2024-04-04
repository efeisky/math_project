**Requests**

*GET {{main_url}}/getAnalitics*

    Request
    -- "device-id" : "..."

    Response
    -- "status" : boolean
    -- "user_analytics" : {
        -- "questions" : [
            {
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
                --"id": int,
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

*GET {{main_url}}/setDeviceId*

    Response
    -- "status" : boolean
    -- "created_id" : "..."
    
*GET {{main_url}}/createQuestion*

    Request
    -- "device-id" : "..."
    -- "question-content" : "...",
    -- "question-level" : int
    
    Response
    -- "status" : boolean
***HENÜZ YAPILMADI***   

**Errors**

    Response
    -- "error" : '...',
    -- "errorMessage" : "..."