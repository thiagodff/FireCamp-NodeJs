import * as Yup from 'yup';

import Activities from '../models/Activities';
import User from '../models/User';
import File from '../models/File';

class InstructorActivitiesController {
  async index(req, res) {
    const activities = await Activities.findAll({
      attributes: [
        'id',
        'banner_id',
        'user_id',
        'title',
        'description',
        'location',
        'date',
        'past',
        'cancelable',
      ],
      where: {
        user_id: req.userId,
      },
      include: [
        { model: File, as: 'banner', attributes: ['name', 'path', 'url'] },
      ],
    });

    return res.json(activities);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    /*
     * Check if user is an instructor
     */
    const checkIsInstructor = await User.findOne({
      where: { id: req.userId, instructor: true },
    });

    if (!checkIsInstructor) {
      return res.status(401).json({
        error: 'Camper cannot create activity',
      });
    }

    const { title, description, location, date, banner_id } = req.body;

    const { id, user_id } = await Activities.create({
      user_id: req.userId,
      title,
      description,
      location,
      date,
      banner_id,
    });

    return res.json({
      id,
      user_id,
      title,
      description,
      location,
      date,
      banner_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const activity = await Activities.findByPk(id);

    const {
      title,
      description,
      location,
      date,
      banner_id,
    } = await activity.update(req.body);

    return res.json({ id, title, description, location, date, banner_id });
  }
}

export default new InstructorActivitiesController();
