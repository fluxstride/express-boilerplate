import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "../../../../shared/query-bus";
import { UsersQuery } from "../queries/users.query";

export interface UsersActionProps {
  queryBus: QueryBus;
}

export const usersActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

/**
 * @swagger
 *
 * /api/users/users:
 *   get:
 *     description: desc
 *     responses:
 *       201:
 *         description: desc
 *       400:
 *         description: Validation Error
 *       500:
 *         description: Internal Server Error
 */
export const usersAction = ({ queryBus }: UsersActionProps) => (req: Request, res: Response, next: NextFunction) => {
  queryBus
    .execute(
      new UsersQuery({
        // command props
      }),
    )
    .then(queryResult => {
      res.json(queryResult.result);
    })
    .catch(next);
};
