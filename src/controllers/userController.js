import { generateAuthToken } from "../middlewares/auth";
import User from "../models/userModel";

const inscription = async (req, res) => {
  try {
    const newUser = await new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.userName = req.body.userName;
    newUser.email = req.body.email;
    newUser.password = await newUser.encrypt(req.body.password);
    newUser.save();

    const token = generateAuthToken(newUser);

    res.send({ newUser, token, message: "Vous êtes maintenant inscrit" });
  } catch (error) {
    res.send(error);
  }
};

const connexion = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    const verify = await user.verifPass(password, user.password);
    if (!verify) {
      const error = new Error("Votre mot de passe est invalide");
      throw error;
    }

    const token = generateAuthToken(user);

    res.json({ user, message: "Vous êtes connecté", token });
  } catch (error) {
    res.send(error.message);
  }
};

export { inscription, connexion };
