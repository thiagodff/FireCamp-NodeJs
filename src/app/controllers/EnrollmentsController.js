import * as Yup from 'yup';
import { Op } from 'sequelize';

import Plans from '../models/Plans';
import User from '../models/User';

import Mail from '../../lib/Mail';

class EnrolmentsController {
  async index(req, res) {
    const users = await User.findAll({
      where: {
        enrollment: {
          [Op.ne]: null,
        },
      },
      attributes: ['id', 'name', 'email', 'age', 'plan', 'enrollment'],
      include: [
        {
          model: Plans,
          as: 'activity_plan',
          attributes: ['title', 'max_activities', 'price'],
        },
      ],
    });

    return res.json(users);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      enrollment: Yup.date().required(),
      plan: Yup.number().required(),
      camper_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email: adminEmail } = await User.findByPk(req.userId);

    if (adminEmail !== 'admin@firecamp.com') {
      return res
        .status(401)
        .json({ error: 'Only the admin can enroll campers' });
    }

    const { camper_id, plan, enrollment } = req.body;

    const camper = await User.findByPk(camper_id);

    const { id, name, email, age } = await camper.update({
      plan,
      enrollment,
    });

    const camperPlan = await Plans.findByPk(plan);

    await Mail.sendMail({
      to: `${camper.name} <${camper.email}>`,
      subject: `Matricula realizada com sucesso`,
      text: `Matriculado no plano ${camperPlan.title} com direito à ${camperPlan.max_activities} atividades`,
    });

    return res.json({ id, name, email, age, plan });
  }

  async delete(req, res) {
    const { id } = req.params;

    const isAdmin = await User.findByPk(req.userId);

    if (isAdmin.email !== 'admin@firecamp.com') {
      return res.status(401).json({ error: 'Only admin can unenroll camper' });
    }

    const camper = await User.findOne({
      where: {
        id,
        instructor: false,
      },
    });

    if (!camper) {
      return res.status(401).json({ error: 'Only campers can be unenrolled' });
    }

    const camperUnroll = await camper.update({
      enrollment: null,
      plan: null,
    });

    return res.json(camperUnroll);
  }
}

export default new EnrolmentsController();
