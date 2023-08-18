import { injectable } from 'tsyringe';
import * as admin from 'firebase-admin';
import { CreateUserDto, UpdateUserDto } from 'src/types';

@injectable()
export class AuthService {
  // eslint-disable-next-line class-methods-use-this
  async create(data: CreateUserDto) {
    const {
      displayName, password, email, roles,
    } = data;

    const { uid } = await admin.auth().createUser({
      displayName,
      password,
      email,
    });
    await admin.auth().setCustomUserClaims(uid, { roles });
    return uid;
  }

  // eslint-disable-next-line class-methods-use-this
  async updateUser(data: UpdateUserDto) {
    const {
      uid, displayName, email, password, roles,
    } = data;
    await admin.auth().updateUser(uid, {
      displayName,
      email,
      password,
    });

    if (roles) {
      await admin.auth().setCustomUserClaims(uid, { roles });
    }

    return admin.auth().getUser(uid);
  }

  // eslint-disable-next-line class-methods-use-this
  deleteUser(uid: string) {
    return admin.auth().updateUser(uid, { disabled: true });
  }
}
