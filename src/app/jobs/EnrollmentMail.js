import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { camper, camperPlan, date } = data;

    await Mail.senddMail({
      to: `${camper.name} <${camper.email}>`,
      subject: `Matricula realizada com sucesso`,
      template: 'cancellation',
      context: {
        camper: camper.name,
        plan: camperPlan.title,
        max_activities: camperPlan.max_activities,
        date: format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new EnrollmentMail();
