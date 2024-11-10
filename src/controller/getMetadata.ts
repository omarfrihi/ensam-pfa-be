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
            propertyName: data.propertyName,
            type: data.type,
            enum: data.enum,
            table: data?.relationMetadata?.inverseEntityMetadata?.tableName,
            relation: data?.relationMetadata?.inverseEntityMetadata?.columns
              ?.filter(
                ({ isPrimary, relationMetadata }) =>
                  !isPrimary && !relationMetadata
              )
              ?.map((data) => ({
                propertyName: data.propertyName,
                type: data.type,
                enum: data.enum,
              })),
          };
        }),
    }))
  );
}
