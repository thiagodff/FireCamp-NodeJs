import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Activities from '../models/Activities';
import User from '../models/User';
import Subscriptions from '../models/Subscriptions';
import File from '../models/File';

class ActivitiesController {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const activities = await Activities.findAll({
      attributes: [
        'id',
        'banner_id',
        'user_id',
        'title',
        'description',
        'location',
        'date',
      ],
      where: {
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        { model: User, as: 'instructor', attributes: ['name', 'email'] },
        { model: File, as: 'banner', attributes: ['name', 'path', 'url'] },
      ],
    });

    const subscribedActivities = await Subscriptions.findAll({
      where: {
        subscriber_id: req.userId,
        canceled_at: null,
      },
      attributes: ['id', 'activity_id'],
    });

    /**
     * Remove already subscribed activities
     */
    const showActivities = activities.filter(activity => {
      for (let i = 0; i < subscribedActivities.length; i += 1) {
        if (activity.id === subscribedActivities[i].activity_id) {
          return false;
        }
      }
      return true;
    });

    return res.json(showActivities);
  }
}

export default new ActivitiesController();
