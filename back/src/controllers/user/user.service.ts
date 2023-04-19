import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser, User } from 'src/mongodb/schemas/user';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
    private jwtService: JwtService,
  ) {}

  /**
   * Login user
   * @param user
   * @returns
   */
  async login(email: string, password: string) {
    const result = await this.userModel.findOne({ email: email });

    if (!result) {
      throw new BadRequestException('Usuario o contraseña incorrectos');
    }

    const isPasswordCorrect = await bcrypt.compare(password, result.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Usuario o contraseña incorrectos');
    }

    const token = await this.createToken(result);
    return { user: result, token };
  }

  /**
   * Create user
   * @param user
   * @returns
   */
  async create(user: any) {
    const admins = await this.userModel.find({ email: user.email });

    if (admins.length === 0) {
      if (user.password) {
        // Se encripta la contraseña
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;

        const reg = await this.userModel.create(user);
        return { data: reg };
      } else {
        throw new BadRequestException('Debe especificar una contraseña');
      }
    } else {
      throw new BadRequestException('El correo ya existe');
    }
  }

  findAll(): IUser[] {
    return new Array<IUser>();
  }

  findOne(id: number): IUser {
    return Object.assign({});
  }

  update(id: number, user: any): IUser {
    return Object.assign({});
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async createToken(user: User) {
    const payload = {
      sub: user._id,
      nombre: user.nombres,
      apellido: user.apellidos,
      email: user.email,
      created_date: moment().unix(),
      expiration_date: moment().add(7, 'days').unix(), // 7 dias de duracion
      rol: user.rol,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
