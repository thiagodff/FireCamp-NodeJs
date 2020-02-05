import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';

import Subscriptions from '../models/Subscriptions';
import Activities from '../models/Activities';
import User from '../models/User';
import File from '../models/File';

class SubscriptionController {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const subscribedActivities = await Subscriptions.findAll({
      where: {
        subscriber_id: req.userId,
        canceled_at: null,
      },
      attributes: ['id'],
      include: [
        {
          model: Activities,
          as: 'activity',
          where: {
            date: {
              [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
            },
          },
          attributes: ['title', 'description', 'location', 'date'],
          order: ['date'],
          include: [
            {
              model: User,
              as: 'instructor',
              attributes: ['name', 'email'],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(subscribedActivities);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      activity_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { activity_id } = req.body;

    /*
     * Check if subscriber is not an instructor
     */
    const checkIsInstructor = await User.findOne({
      where: { id: req.userId, instructor: true },
    });

    if (checkIsInstructor) {
      return res.status(401).json({
        error: 'Instructors cannot subscribe in activities',
      });
    }

    /*
     * Check if camper is enrollment
     */
    const isEnrollment = await User.findOne({
      where: { id: req.userId, enrollment: null },
    });

    if (isEnrollment) {
      return res.status(401).json({
        error: 'Only registered campers can create subscriptions',
      });
    }

    /*
     * Make sure the camper is signed up for repeat activity
     */
    const isSubscribed = await Subscriptions.findOne({
      where: { subscriber_id: req.userId, activity_id, canceled_at: null },
    });

    if (isSubscribed) {
      return res.status(401).json({
        error: 'You can only subscribe once time in activity',
      });
    }

    const subscribe = await Subscriptions.create({
      subscriber_id: req.userId,
      activity_id,
    });

    return res.json(subscribe);
  }

  async delete(req, res) {
    const { id } = req.params;

    const subscription = await Subscriptions.findByPk(id);

    await subscription.update({
      canceled_at: new Date(),
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
