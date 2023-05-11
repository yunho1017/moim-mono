import { schema } from "normalizr";
import { userEntity } from "../user";
import { arrayFileBlockKitEntity } from "../file";
import { statEntity } from "../stat";

export const threadDefinition = {
  user: userEntity,
  stat: statEntity,
  blockit: arrayFileBlockKitEntity,
};

export const threadEntity = new schema.Entity<Moim.Forum.IThread>(
  "threads",
  threadDefinition,
  {
    processStrategy(value) {
      const blockit = value.content || [];
      if (value.preview?.thumbnail) {
        const { id: fileId, title } = value.preview.thumbnail;

        blockit.push({
          type: "preview",
          files: [{ title, id: fileId }],
        });
      }

      return {
        ...value,
        blockit,
        user: value.author,
      };
    },
  },
);

export const threadSingleItemEntity = new schema.Object<Moim.Forum.IThread>({
  data: threadEntity,
});

export const threadListEntity = new schema.Object<Moim.Forum.IThread>({
  data: new schema.Array(threadEntity),
});
