import { getParams, setLocalStorage, getLocalStorage } from "./utils.mjs";

const form = document.querySelector("#comment-form");

class CommentsService {
  constructor(localStoragaKey) {
    this.localStoragaKey = localStoragaKey;
  }

  getComments() {
    return getLocalStorage(this.localStoragaKey);
  }

  saveComment() {
    const textAreaValue = document.querySelector("#comment-textarea").value;

    const comments = this.getComments();

    const productId = getParams("product");

    if (comments) {
      const productComments = comments.find(
        (comment) => comment.productId === productId
      );

      const newComment = {
        ...productComments,
        comments: [...productComments.comments, textAreaValue],
      };

      const index = comments.findIndex((entry) => entry.id === productId);

      const updatedComments = (comments[index] = newComment);

      setLocalStorage(this.localStoragaKey, [updatedComments]);

      return;
    }

    setLocalStorage(this.localStoragaKey, [
      {
        productId: productId,
        comments: [textAreaValue],
      },
    ]);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const commentService = new CommentsService("comments");

  commentService.saveComment();
});
