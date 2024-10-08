import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity'; // Correct import
import { GoodDeed } from '../good-deeds/entities/good-deed.entity'; // Correct import

@Injectable()
export class FriendsService {
  constructor(private usersService: UsersService) {}

  async addFriend(userId: number, friendUniqueTag: string): Promise<void> {
    const user = await this.usersService.findUserById(userId);
    const friend = await this.usersService.findUserByUniqueTag(friendUniqueTag);

    if (!user || !friend) {
      throw new Error('User or Friend not found');
    }

    user.friends = user.friends || [];
    friend.friends = friend.friends || [];

    user.friends.push(friend);
    friend.friends.push(user); // Ensure bidirectional friendship
  }

  async getFriendsWithDeeds(userId: number): Promise<
    {
      userId: number;
      username: string;
      uniqueTag: string;
      goodDeeds: GoodDeed[];
    }[]
  > {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.friends = user.friends || [];

    return user.friends.map((friend) => ({
      userId: friend.userId,
      username: friend.username,
      uniqueTag: friend.uniqueTag,
      goodDeeds: friend.goodDeeds || [],
    }));
  }
}
