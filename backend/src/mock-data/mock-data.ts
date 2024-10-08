import { User } from '../users/entities/user.entity';
import { GoodDeed } from '../good-deeds/entities/good-deed.entity';

export const goodDeeds: GoodDeed[] = [
  {
    id: 1,
    userId: 1,
    content: 'Helped an old lady cross the street',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 1,
    content: 'Donated clothes to charity',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    userId: 2,
    content: 'Cleaned the park',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const users: User[] = [
  {
    userId: 1,
    username: 'Maria',
    email: 'maria@example.com',
    password: 'passwordtest1@',
    uniqueTag: 'Maria123abc',
    friends: [],
    goodDeeds: goodDeeds.filter((deed) => deed.userId === 1),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 2,
    username: 'John',
    email: 'john@example.com',
    password: 'passwordtest2@',
    uniqueTag: 'John456def',
    friends: [],
    goodDeeds: goodDeeds.filter((deed) => deed.userId === 2),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Function to populate good deeds
export const populateGoodDeeds = (user: User, goodDeeds: GoodDeed[]): void => {
  user.goodDeeds = goodDeeds.filter((deed) => deed.userId === user.userId);
};
