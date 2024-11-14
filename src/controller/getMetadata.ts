import { Request, Response } from "express";
import { getManager } from "typeorm";

export async function getMetadata(request: Request, response: Response) {
  return response.json(
    getManager().connection.entityMetadatas.map(({ columns, tableName }) => ({
      tableName,
      columns: columns
        .filter(({ isPrimary }) => !isPrimary)
        .map((data) => {
          return {
            propertyName: `${data?.relationMetadata ? `${tableName}.` : ""}${
              data.propertyName
            }`,
            type: data.type,
            enum: data.enum,
            columns: data?.relationMetadata?.inverseEntityMetadata?.columns
              ?.filter(
                ({ isPrimary, relationMetadata }) =>
                  !isPrimary && !relationMetadata
              )
              ?.map((column) => ({
                propertyName: `${data.propertyName}.${column.propertyName}`,
                type: column.type,
                enum: column.enum,
              })),
          };
        }),
    }))
  );
}
