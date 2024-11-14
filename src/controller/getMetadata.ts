import { Request, Response } from "express";
import { getManager } from "typeorm";
import { CustomRequest } from "./types";
import { User } from "../entity/User";

export async function getMetadata(request: CustomRequest, response: Response) {
  const user = await getManager()
    .getRepository(User)
    .findOne({ where: { id: request.user.id } });

  const isAuthorized = ({ comment }: any) => {
    const { scope } = JSON.parse(comment);
    return scope.includes(user.role);
  };
  return response.json(
    getManager()
      .connection.entityMetadatas.filter(isAuthorized)
      .map(({ columns, tableName }) => ({
        tableName,
        columns: columns
          .filter(
            ({ isPrimary, relationMetadata }) =>
              !isPrimary &&
              (!relationMetadata ||
                isAuthorized({
                  comment: relationMetadata?.inverseEntityMetadata?.comment,
                }))
          )
          .map((data) => {
            return {
              propertyName: `${data?.relationMetadata ? `${tableName}.` : ""}${
                data.propertyName
              }`,
              type: data.type,
              enum: data.enum,
              alias: data.comment,
              columns: data?.relationMetadata?.inverseEntityMetadata?.columns
                ?.filter(
                  ({ isPrimary, relationMetadata }) =>
                    !isPrimary && !relationMetadata
                )
                ?.map((column) => ({
                  propertyName: `${data.propertyName}.${column.propertyName}`,
                  type: column.type,
                  enum: column.enum,
                  alias: column.comment,
                })),
            };
          }),
      }))
  );
}
