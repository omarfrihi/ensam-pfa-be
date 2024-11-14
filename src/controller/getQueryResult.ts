import { Response } from "express";
import { getManager } from "typeorm";
import { QueryHistory } from "../entity/QueryHistory";
import { User } from "../entity/User";
import { CustomRequest } from "./types";

export async function getQueryResult(
  request: CustomRequest,
  response: Response
) {
  const { tables, where, select, params } = request.query;
  const [table, ...rest] = tables as string[];
  let query = getManager()
    .createQueryBuilder()
    .select(select as string[])
    .from(table as string, table);

  rest.forEach((table) => {
    const [, alias] = table.split(".");
    query.innerJoin(table, alias);
  });
  if (where) {
    query.andWhere(where, params as object);
  }

  const result = await query.getRawMany();
  const user = await getManager()
    .getRepository(User)
    .findOne({ where: { id: request.user.id } });
  const queryhistory = new QueryHistory();
  queryhistory.query = query.getQuery();
  queryhistory.user = user;
  queryhistory.queryResult = JSON.stringify(result);

  await getManager().getRepository(QueryHistory).save(queryhistory);
  return response.send(result);
}
