//standardizing error in a format 

class ApiError extends Error{
    constructor(
        satusCode,
        message="Something went wrong",
        error=[],
        statck=""
    ){
        super(message)
        this.statusCode=this.statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}