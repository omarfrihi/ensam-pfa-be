import { Response } from "express";
import { getManager } from "typeorm";
import { QueryHistory } from "../entity/QueryHistory";
import { CustomRequest } from "./types";

export async function getQueryHistory(
  request: CustomRequest,
  response: Response
) {
  const result = await getManager()
    .getRepository(QueryHistory)
    .find({ where: { user: { id: request.user.id } } });

  response.send(
    result.map((data) => ({
      ...data,
      queryResult: JSON.parse(data.queryResult),
    }))
  );
}
