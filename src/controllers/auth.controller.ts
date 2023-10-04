// Types
import { Response } from "express";
import { RequestLogin } from "../interfaces/request.interface";
import { ResponseLogin } from "../interfaces/response.interface";
import { FormLogin } from "../interfaces/forms.interface";

// Utils
import { handleError } from "../utils/error.handle";

// Services
import { loginService } from "../services/user.service";

export const loginController = async (req: RequestLogin, res: Response) => {
  try {
    const loginData: FormLogin = {
      username: req.body.username,
      password: req.body.password,
      rememberMe: req.body.rememberMe,
    };

    const response: ResponseLogin = await loginService(loginData);

    return res.send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};
