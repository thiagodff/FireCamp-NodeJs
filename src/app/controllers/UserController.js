import * as Yup from 'yup';
import User from '../models/User';

// store, index, show, update, delete
class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, age, instructor, enrollment } = await User.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      instructor,
      enrollment,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, age, plan, instructor, enrollment } = await user.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      plan,
      instructor,
      enrollment,
    });
  }

  async index(req, res) {
    const campers = await User.findAll({
      attributes: ['id', 'name', 'email', 'age', 'enrollment', 'plan'],
      where: {
        instructor: false,
      },
    });

    return res.json(campers);
  }

  async delete(req, res) {
    const { id } = req.params;

    const isAdmin = await User.findByPk(req.userId);

    if (isAdmin.email !== 'admin@firecamp.com') {
      return res.status(401).json({ error: 'Only admin can delete camper' });
    }

    const camper = await User.findOne({
      where: {
        id,
        instructor: false,
      },
    });

    if (!camper) {
      return res.status(401).json({ error: 'Only campers can be deleted' });
    }

    await camper.destroy();

    return res.json(camper);
  }
}

export default new UserController();
