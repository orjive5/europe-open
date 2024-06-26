import page from './pages';
import awards from './awards';
import participants from './participants';
import disciplines from './disciplines';
import categories from './categories';
import jury from './jury';
import faq from './faq';
import rules_soloists from './rules_soloists';
import rules_collectives from './rules_collectives';
import results from './results';
import { youtube } from './youtube';
import _break from './break';
import news from './news';
import timetable_soloists from './timetable_soloists';
import timetable_collectives from './timetable_collectives';

const schemas = [
    awards,
    news,
    page,
    participants,
    disciplines,
    categories,
    jury,
    faq,
    rules_soloists,
    timetable_soloists,
    rules_collectives,
    timetable_collectives,
    results,
    youtube,
    _break,
];

export default schemas;