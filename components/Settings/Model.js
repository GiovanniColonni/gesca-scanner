import z from "zod";

export const confSchema = z.object({
    serverIP: z.string().default(""),
    port: z.preprocess((port)=>(Number(port)),z.number()).default(5000),
    username: z.string().default(""),
    password: z.string().default(""),
    databaseName: z.string().default(""),
});

const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;


export const confSchemaValidate = confSchema.superRefine((data, ctx) => {
    if (data.serverIP === "") {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "IP non valido",
            path: ["serverIP"],
        });
    }
    if(!ipRegex.test(data.serverIP)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "IP deve essere nel formato xxx.xxx.xxx.xxx",
            path: ["serverIP"],
        });
    }
    if (data.port <= 0 || data.port > 65535) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Porta non valida",
            path: ["port"],
        });
    }
    if (data.username === "") {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Username non valido",
            path: ["username"],
        });
    }
    if (data.password === "") {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password non valida",
            path: ["password"],
        });
    }
    if (data.databaseName === "") {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Nome database non valido",
            path: ["databaseName"],
        });
    }

    return data;
})
