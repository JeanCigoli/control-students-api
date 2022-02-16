import { GenerateUuid } from '@/data/protocols/utils';
import { v4 } from 'uuid';

export const generateUuid: GenerateUuid = () => v4();
