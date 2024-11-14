import { Request, Response } from "express";
import { EntityMetadata, QueryResult, getManager } from "typeorm";
import { CustomRequest } from "./types";
import { User } from "../entity/User";
import { QueryHistory } from "../entity/QueryHistory";

export async function getMetadata(request: CustomRequest, response: Response) {
  const user = await getManager()
    .getRepository(User)
    .findOne({ where: { id: request.user.id } });

  const filterColumn = ({ isPrimary, comment, isUpdateDate }: any) =>
    !isPrimary && !isUpdateDate && comment !== "password";

  const getEntityMedata = ({
    entity: { tableName, comment, columns },
    parentTable,
    table,
  }: {
    entity: EntityMetadata;
    parentTable?: string;
    table?: string;
  }) => {
    const { label, scope } = JSON.parse(comment);
    const isAuthorized = scope.includes(user.role);
    return (
      isAuthorized && {
        tableName: `${parentTable ? `${parentTable}.` : ""}${
          table || tableName
        }`,
        label,
        columns: columns
          .filter(filterColumn)
          .map((data) => {
            return !data.relationMetadata
              ? {
                  name: `${table || tableName}.${data.propertyName}`,
                  type: data.type,
                  enum: data.enum,
                  alias: data.comment,
                }
              : getEntityMedata({
                  entity: data.relationMetadata?.inverseEntityMetadata,
                  table: data.propertyName,
                  parentTable: table || tableName,
                });
          })
          .filter((elem) => elem),
      }
    );
  };

  const data = getManager()
    .connection.entityMetadatas.map((data) => getEntityMedata({ entity: data }))
    .filter((elem) => elem);

  return response.json(data);
}
