declare namespace Moim {
  namespace TagSet {
    interface ITagItem {
      id: Id;
      set: string;
      value: string;
      userId: Id;
      groupId: Id;
      sortKey: string;
      parentId: Id; // Ref. ITagSet id
      createdAt: number;
      updatedAt: number;
    }

    interface ITagSet {
      id: Id;
      set: string;
      userId: Id;
      groupId: Id;
      sortKey: string;
      createdAt: number;
      updatedAt: number;
      items?: Id[];
    }

    type INormalizedTagItem = INormalizedEntities<ITagItem>;
    type INormalizedTagSet = INormalizedEntities<ITagSet>;
  }
}
