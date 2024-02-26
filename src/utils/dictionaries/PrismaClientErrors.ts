/* If a prisma invocation fails with a known error code, it'll be thrown in the response object like this: response_object.code
I'm gonna list some of the know errors in a dictionary so I can easily use them in the client to show a notification or something.
PrismaClientErros[object_response.code] */

export interface PrismaClientErrorType {

    [key: string]: string;
}

export const PrismaClientErrors: PrismaClientErrorType = {
    "P2002": "Ya existe un registro con el mismo valor en la base de datos"
}