export enum Status
{
    NONE    = "None",
    SUCCESS = "success",
    FAILURE = "failure",
};

export type T_Props =
(
    {
        status       : Status.FAILURE;
        errorMessage : string;
    } |
    {
        status : Status.SUCCESS | Status.NONE;
    }
) & 
{
    onSubmit : (email : string, object : string, content : string) => void
};
