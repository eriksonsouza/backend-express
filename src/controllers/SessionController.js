import { sign } from "jsonwebtoken";
import User from "../schemas/User";
import { compare } from "bcrypt";

class SessionController {
  async create(request, response) {
    const { username, password } = request.body;

    //Verificar se o usuário existe no sistema
    const user = await User.findOne({
      username,
    });
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    //Verificar se a senha está correta
    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      return response.status(404).json({ error: "Incorrect password" });
    }

    const token = sign({}, "6a42dd6e7ca9a813693714b0d9aa1ad8", {
      subject: new String(user._id),
      expiresIn: "1d",
    });

    return response.json({
      token,
      user,
    });
  }
}

export default new SessionController();
