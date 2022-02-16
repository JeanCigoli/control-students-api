import { format } from 'date-fns';

export const formatDate = (date: Date, design: string) => {
  return format(date, design);
};
