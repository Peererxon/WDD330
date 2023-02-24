import { getParams, setLocalStorage, getLocalStorage } from "./utils.mjs";

const form = document.querySelector("#comment-form");

class CommentsService {
  constructor(localStoragaKey, productId) {
    this.localStoragaKey = localStoragaKey;
    this.productId = productId;
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

  printComments() {
    const commentsContainer = document.querySelector(".comments");

    const comments = this.getComments();

    const productComments = comments.find(
      (comment) => comment.productId === this.productId
    );

    productComments.comments.forEach((comment) => {
      const template = `
      <div class="comment">
        <img src="https://ui-avatars.com/api/?name=John+Doe" alt="user profile image" />
          <textarea disabled>${comment}</textarea>
      </div>`;

      commentsContainer.insertAdjacentHTML("beforeend", template);
    });
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const productId = getParams("product");

  const commentService = new CommentsService("comments", productId);

  // commentService.saveComment();

  commentService.printComments("asdasdasd");
});
