import * as Knex from 'knex';
import { enRoles, IUser } from 'modules/database/interfaces/user';

export async function seed(knex: Knex): Promise<void> {
  const adminUser: IUser = {
    firstName: 'WaProject',
    lastName: 'Admin',
    email: 'admin@waproject.com.br',
    password: 'senha@123',
    // eslint-disable-next-line prettier/prettier
    roles: enRoles.sysAdmin as any,
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  const users = await knex
    .count()
    .from('User')
    .where({ email: adminUser.email })
    .first();

  if (Number(users.count) > 0) return;

  await knex.insert(adminUser).into('User');
}
