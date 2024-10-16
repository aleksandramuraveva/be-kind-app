export interface Friend {
  id: number;
  username: string;
  uniqueTag: string;
  userId: number;
}

export interface FriendDeed {
  friendId: number;
  deeds: Deed[]; 
}

export type Deed = {
  id: number;
  description: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};


export interface GoodDeed {
  id: number;
  content: string;
  createdAt?: string; 
  updatedAt?: string; 
}

