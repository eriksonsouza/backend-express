import User from "../schemas/User";
import { hash } from "bcrypt";

class UserController {
  async create(request, response) {
    const { name, email, username, password, phone } = request.body;

    const passwordCrypt = await hash(password, 8);

    //console.log({ name, email, username, password, phone });
    const user = await User.create({
      name,
      email,
      username,
      password: passwordCrypt,
      phone,
    });

    return response.json(user);
  }
}

export default new UserController();
