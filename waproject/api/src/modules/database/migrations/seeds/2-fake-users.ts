/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IUser } from 'modules/database/interfaces/user';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const users = await knex
    .count()
    .from("User")
    .first();

  if (Number(users.count) !== 1) return;

  for (let x = 0; x < 100; x++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const user: IUser = {
      firstName,
      lastName,
      email: faker.internet.email(`${lastName}_${x}`, firstName).toLowerCase(),
      password: "senha@123",
      // eslint-disable-next-line prettier/prettier
      roles: "user" as any,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(user).into("User");
  }
}
