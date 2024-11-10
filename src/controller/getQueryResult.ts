import { Request, Response } from "express";
import { QueryBuilder, getManager } from "typeorm";
import { QueryHistory } from "../entity/QueryHistory";
import { User, EROLE } from "../entity/User";
interface RequestQueryResult extends Request {
  user: {
    id: number;
    username: string;
    role: EROLE;
  };
}
export async function getQueryResult(
  request: RequestQueryResult,
  response: Response
) {
  const { table, where, select, ...params } = request.query;
  const query = getManager()
    .createQueryBuilder()
    .select(select as string)
    .from(table as string, null)
    .andWhere(where, params as object);

  const result = await query.getRawMany();
  const user = await getManager()
    .getRepository(User)
    .findOne({ where: { id: request.user.id } });
  const queryhistory = new QueryHistory();
  queryhistory.query = query.getQuery();

  queryhistory.user = user;
  await getManager().getRepository(QueryHistory).save(queryhistory);

  return response.json(result);
}
