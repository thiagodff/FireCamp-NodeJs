import Activities from '../models/Activities';
import File from '../models/File';

class ActivitiesController {
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
      ],
      include: [
        { model: File, as: 'banner', attributes: ['name', 'path', 'url'] },
      ],
    });

    return res.json(activities);
  }
}

export default new ActivitiesController();
