import { Injectable } from '@nestjs/common';
import { User } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface UserLogin extends User {
  password: string;
  isAdmin: boolean;
  sessionToken: boolean;
}

const adapter = new FileSync<UserLogin>('./db/user.json');
const db = low(adapter);

db.defaults({ requests: [] }).write();

@Injectable()
export class AuthDao {
  private get collection(): any {
    return db.get('users');
  }

  constructor() {
    //
  }

  async getUserLogin(email: string): Promise<UserLogin> {
    return await this.collection.find({ email }).value();
  }

  async validateUserSessionToken(sessionToken: string): Promise<boolean> {
    // TODO: check if the token matches the current user too
    return await this.collection.has({ sessionToken });
  }
}
