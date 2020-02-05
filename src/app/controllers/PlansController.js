import * as Yup from 'yup';

import Plans from '../models/Plans';
import User from '../models/User';

class PlansController {
  async index(req, res) {
    const plans = await Plans.findAll({
      attributes: ['id', 'title', 'max_activities', 'price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      max_activities: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = await User.findByPk(req.userId);

    if (email !== 'admin@firecamp.com') {
      return res
        .status(401)
        .json({ error: 'Only the admin can create new plans' });
    }

    const { title, max_activities, price } = req.body;

    const { id } = await Plans.create({ title, max_activities, price });

    return res.json({ id, title, max_activities, price });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      max_activities: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = await User.findByPk(req.userId);

    if (email !== 'admin@firecamp.com') {
      return res.status(401).json({ error: 'Only the admin can modify plans' });
    }

    const { id: planId } = req.params;

    const plan = await Plans.findByPk(planId);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    const { id, title, max_activities, price } = await plan.update(req.body);

    return res.json({ id, title, max_activities, price });
  }

  async delete(req, res) {
    const { id: planId } = req.params;

    const users = await User.findAll({
      where: {
        plan: planId,
      },
    });

    users.map(user => user.update({ enrollment: null }));

    const plan = await Plans.findByPk(planId);

    plan.destroy();

    return res.json(plan);
  }
}

export default new PlansController();
